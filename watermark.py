"""
Watermark script for Jekyll site images.
Adds diagonal text watermark "thethaibinh.github.io" from top-left to bottom-right.
Processes all *-sim* images in assets/img/posts/uav/.
"""

import glob
import math
import os

from PIL import Image, ImageDraw, ImageFont


def add_diagonal_watermark(
    image_path: str,
    text: str = "thethaibinh.github.io",
    opacity: int = 60,
    output_path: str | None = None,
):
    """Add a repeated diagonal text watermark across an image."""
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size

    # Create a transparent overlay for the watermark
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Determine font size relative to image (roughly 3% of diagonal)
    diagonal = math.sqrt(width**2 + height**2)
    font_size = max(int(diagonal * 0.025), 16)

    # Try to use a nice font, fall back to default
    font = None
    for font_name in [
        "arial.ttf",
        "Arial.ttf",
        "DejaVuSans.ttf",
        "Helvetica.ttf",
        "calibri.ttf",
    ]:
        try:
            font = ImageFont.truetype(font_name, font_size)
            break
        except (OSError, IOError):
            continue
    if font is None:
        font = ImageFont.load_default()

    # Measure text size
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Create a single text tile on a larger transparent image, then rotate
    # We'll tile the watermark diagonally across the image
    angle = -35  # degrees, top-left to bottom-right diagonal

    # Spacing between repeated watermarks
    spacing_x = text_width + int(text_width * 0.8)
    spacing_y = text_height + int(text_height * 4)

    # Create a large canvas to hold repeated text (bigger than image to allow rotation)
    tile_size = int(diagonal * 2)
    txt_layer = Image.new("RGBA", (tile_size, tile_size), (0, 0, 0, 0))
    txt_draw = ImageDraw.Draw(txt_layer)

    # Fill the large canvas with repeated watermark text
    y = 0
    while y < tile_size:
        x = 0
        while x < tile_size:
            txt_draw.text(
                (x, y),
                text,
                font=font,
                fill=(255, 255, 255, opacity),
            )
            x += spacing_x
        y += spacing_y

    # Rotate the text layer
    txt_layer = txt_layer.rotate(angle, resample=Image.BICUBIC, expand=False)

    # Crop the rotated layer to match the original image size, centered
    cx, cy = tile_size // 2, tile_size // 2
    left = cx - width // 2
    top = cy - height // 2
    txt_cropped = txt_layer.crop((left, top, left + width, top + height))

    # Composite the watermark onto the original
    watermarked = Image.alpha_composite(img, txt_cropped)

    # Save
    if output_path is None:
        output_path = image_path

    # Save as PNG (preserve format)
    if output_path.lower().endswith(".png"):
        watermarked.save(output_path, "PNG")
    else:
        # Convert back to RGB for non-PNG formats
        watermarked = watermarked.convert("RGB")
        watermarked.save(output_path)

    print(f"  Watermarked: {os.path.basename(image_path)}")


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    uav_dir = os.path.join(script_dir, "assets", "img", "posts", "uav")

    # Find all -sim images
    patterns = [os.path.join(uav_dir, "*-missile-sim.*")]
    files = []
    for pattern in patterns:
        files.extend(glob.glob(pattern))

    if not files:
        print("No *-sim* images found in assets/img/posts/uav/")
        return

    print(f"Found {len(files)} image(s) to watermark:\n")
    for f in sorted(files):
        print(f"  - {os.path.basename(f)}")

    print()
    for f in sorted(files):
        try:
            add_diagonal_watermark(f, text="thethaibinh.github.io", opacity=60)
        except Exception as e:
            print(f"  ERROR processing {os.path.basename(f)}: {e}")

    print("\nDone!")


if __name__ == "__main__":
    main()
