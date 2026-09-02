// One-page A4 concept brief. Regenerate with: node build-docx.js
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, LevelFormat,
} = require('docx');
const fs = require('fs');

const INK = "1A1D1A";
const ACCENT = "44701B";
const GREY = "5A645A";
const RULE = "C9CFC2";
const BAND = "EDF2E3";

const BODY = "Cambria";
const HEAD = "Calibri";
const MONO = "Consolas";

const MARGIN = { top: 420, bottom: 340, left: 640, right: 640 };
const CONTENT = 11906 - MARGIN.left - MARGIN.right;

// ---------- helpers ----------

// justified body paragraph from [text, bold?] pairs
const p = (parts, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: opts.after ?? 44, line: opts.line ?? 196 },
  children: parts.map(([t, b]) => new TextRun({
    text: t, font: BODY, size: opts.size ?? 16, color: INK, bold: !!b,
  })),
});

const h2 = (num, text) => new Paragraph({
  spacing: { before: 56, after: 24 },
  keepNext: true,
  children: [
    new TextRun({ text: num + "  ", font: MONO, size: 13, bold: true, color: ACCENT }),
    new TextRun({ text, font: HEAD, size: 17, bold: true, color: INK }),
  ],
});

const bullet = (parts, opts = {}) => new Paragraph({
  numbering: { reference: "dot", level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: opts.after ?? 26, line: 192 },
  children: parts.map(([t, b]) => new TextRun({
    text: t, font: BODY, size: 16, color: INK, bold: !!b,
  })),
});

const cell = (children, width, shade) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 42, bottom: 42, left: 85, right: 85 },
  shading: shade ? { type: ShadingType.CLEAR, fill: shade, color: "auto" } : undefined,
  borders: {
    top: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    left: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    right: { style: BorderStyle.SINGLE, size: 4, color: RULE },
  },
  children,
});

// table paragraph from [text, bold?] pairs
const tp = (parts, opts = {}) => new Paragraph({
  alignment: opts.justify ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
  spacing: { after: 0, line: opts.line ?? 178 },
  children: parts.map(([t, b]) => new TextRun({
    text: t, font: opts.font || BODY, size: opts.size ?? 14,
    color: opts.color || INK, bold: b === undefined ? !!opts.bold : !!b,
  })),
});

// ---------- 02: the three axes of openness ----------

const TCOLS = [1860, CONTENT - 1860];

const axisRow = (name, gloss, parts) => new TableRow({
  cantSplit: true,
  children: [
    cell([
      tp([[name]], { font: HEAD, bold: true, size: 15 }),
      tp([[gloss]], { font: MONO, size: 10, color: GREY, line: 165 }),
    ], TCOLS[0]),
    cell([tp(parts, { justify: true })], TCOLS[1]),
  ],
});

const triad = new Table({
  columnWidths: TCOLS,
  width: { size: CONTENT, type: WidthType.DXA },
  rows: [
    axisRow("Open weights", "a checkpoint you can hold still", [
      ["Hash-pinnable parameters, token-level scores and internal activations: the precondition for an activation probe, a conformal quantile calibrated on real logits, and exact replay of a past decision. Behind a closed endpoint none of the three has a stable referent."],
    ]),
    axisRow("Open architecture", "a graph you can modify", [
      ["Modeling code, kernels and compilation path. "],
      ["Determinism lives on this axis, not in the weights:", true],
      [" batch-invariant inference means replacing the RMSNorm, matmul and attention kernels, which cannot be done inside a graph you cannot see. The same access decides which layer a probe reads, whether a TensorRT engine can be built, and whether the model can be audited for a backdoor at all. Weights without architecture are an inert blob."],
    ]),
    axisRow("Open data", "a distribution you can interrogate", [
      ["NVIDIA now publishes the corpora too: Nemotron-CC-v2 at 9.13T web tokens, 1.09T curated code and 133.3B math tokens, plus the Physical AI robotics sets, past ten million downloads and CC BY 4.0 in part. This buys a falsification suite you can "],
      ["prove", true],
      [" is not in the training set, an evidence-based answer to whether a deployment scenario is in distribution, which is exactly what conformal exchangeability demands, and a provenance record of what the robot learned from."],
    ]),
  ],
});

// ---------- 04: the four-layer stack ----------

const SCOLS = [1040, CONTENT - 1040 - 2980, 2980];

const layerRow = (tag, role, title, desc, kit) => new TableRow({
  cantSplit: true,
  children: [
    cell([
      tp([[tag]], { font: MONO, bold: true, size: 14, color: ACCENT }),
      tp([[role]], { font: MONO, size: 11, color: GREY, line: 165 }),
    ], SCOLS[0]),
    cell([tp([[title + ". ", true], [desc]], { justify: true })], SCOLS[1]),
    cell([tp([[kit]], { font: MONO, size: 11, color: GREY, line: 168 })], SCOLS[2]),
  ],
});

const stack = new Table({
  columnWidths: SCOLS,
  width: { size: CONTENT, type: WidthType.DXA },
  rows: [
    layerRow("L0 PIN", "substrate", "Reproducible inference",
      "Checkpoint hash, kernel and quantisation recipe, calibration split and recorded sensor tape versioned as one unit, with a conformance test that fails loudly on any substrate change.",
      "Nemotron 3, Cosmos Reason, GR00T N1.7, NIM, TensorRT-LLM, Dynamo, Jetson Thor"),
    layerRow("L1 TYPE", "harness", "Constrained decoding",
      "Grammar-constrained decoding masks the next-token distribution so the model can only emit well-typed waypoints, goal handles or temporal-logic clauses. No free text ever reaches the control path. The alignment tax is measured, not assumed away.",
      "XGrammar in TensorRT-LLM; NeMo Guardrails, Colang extended to action rails"),
    layerRow("L2 VETO", "guardrail", "Symbolic spec and verified fallback",
      "Site rules grounded into temporal logic and resolved against the plan by control synthesis; RoboGuard reports unsafe execution falling from 92% to under 2.5% under worst-case jailbreak. A simplex switch then hands authority to a verified controller as the last line, and our RA-L planner is that executor.",
      "Isaac Sim and Isaac Lab for adversarial scenario generation; Isaac ROS"),
    layerRow("L3 ESC.", "orchestration", "Calibrated deferral and routing",
      "Conformal prediction over real token scores gives distribution-free coverage and a principled trigger to ask a human or escalate. This needs logits, which open weights give and most endpoints withhold. A small pinned model holds the edge loop; a large one is reachable for slow reasoning.",
      "NeMo Switchyard, Dynamo, A100 or DGX hours for calibration sweeps"),
  ],
});

// ---------- document ----------

const doc = new Document({
  creator: "Binh Nguyen",
  title: "Interlock concept brief",
  description: "Version-pinned harnesses and guardrails for open models in robotics",
  numbering: {
    config: [{
      reference: "dot",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 230, hanging: 170 } } },
      }],
    }],
  },
  sections: [{
    properties: { page: { margin: MARGIN } },
    children: [

      new Paragraph({
        spacing: { after: 30 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: INK, space: 3 } },
        children: [new TextRun({
          text: "NVIDIA ACADEMIC GRANT PROGRAM   •   ROBOTICS AND EDGE AI   •   CONCEPT BRIEF v0.1   •   DRAFT FOR COMMENT",
          font: MONO, size: 12, color: GREY, characterSpacing: 10,
        })],
      }),

      new Paragraph({
        spacing: { before: 70, after: 16 },
        children: [new TextRun({ text: "Interlock", font: HEAD, size: 32, bold: true, color: INK })],
      }),
      new Paragraph({
        spacing: { after: 45 },
        children: [new TextRun({
          text: "Version-pinned harnesses, guardrails and orchestration for open models in robot perception, trajectory planning and control.",
          font: HEAD, size: 17, color: GREY,
        })],
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({
          text: "Binh Nguyen   |   2 September 2026   |   Lineage: EywaGuard, NVIDIA Academic Grant (awarded)   |   Status: rough idea, tear it apart",
          font: MONO, size: 12, color: GREY,
        })],
      }),

      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 34, after: 34, line: 198 },
        indent: { left: 150, right: 40 },
        border: { left: { style: BorderStyle.SINGLE, size: 16, color: ACCENT, space: 9 } },
        children: [new TextRun({
          text: "An open model is three separable things: open weights, open architecture and open data. Together they are the only substrate on which a robot safety case can be written down and stay true, because every guardrail is a contract with one specific model, and a model you do not control can void that contract overnight without telling you. Build the stack that turns all three into a certifiable autonomy component, and measure what that assurance costs in throughput, latency and watts.",
          font: BODY, size: 16, color: INK,
        })],
      }),

      h2("01", "The open push is a hardware demand strategy, and physical AI is where it stalls"),
      p([["NVIDIA has spent 2026 making the case from every direction: Nemotron 3 with published weights and reproducible recipes, the Nemotron Coalition, a joint engine with Palantir for air-gapped sovereign deployment, Isaac GR00T N1.7 with an open reference humanoid, and the training corpora themselves. Every operator that vendors its own weights buys its own accelerators. It stalls in physical AI: a sovereign operator can host a model but cannot certify a robot around it. Assurance, not model quality, gates deployment in mining, agriculture, defence and orbital servicing, and nobody has built the stack that converts openness into that argument."]]),

      h2("02", "Three kinds of openness, and the different guarantee each one buys"),
      triad,

      h2("03", "Why it has to be open: guardrails decay with the model they wrap"),
      p([["Longitudinal tracking of commercial APIs (HAPI) found substantial behaviour change over time in the majority observed, inside unchanged version strings. A 2026 benchmark finds that fine-tuning-style updates frequently invalidate frozen activation probes while quantisation-style updates largely do not, and on a closed endpoint you cannot tell which kind landed. Pin the three axes and every safety artifact gains a stable referent and an explicit revalidation trigger. Batch-invariant kernels then buy bitwise-reproducible inference for 34% to 60% of throughput. "], ["Determinism stops being a hope about the vendor and becomes a line item you buy with compute.", true]]),

      h2("04", "Architecture: four layers, command flowing down, veto flowing up"),
      stack,

      h2("05", "Four questions the literature has not answered"),
      bullet([["Q1  Validity domain. ", true], ["How far does a guardrail certificate calibrated on one (weights, quantisation, kernels) triple survive post-training quantisation, LoRA and full fine-tuning? Open recipes and corpora make the study causal rather than observational. Nothing equivalent exists for embodied action."]]),
      bullet([["Q2  Coverage under shift. ", true], ["Conformal prediction assumes exchangeability and deployment breaks it on day one. Open training data turns the shift from an assumption into a measurement."]]),
      bullet([["Q3  The safety-latency frontier. ", true], ["Closed-loop monitoring consumes exactly the milliseconds in which the collision occurs, so a slow guardrail causes the harm it was installed to stop. Map it on Thor-class silicon."]]),
      bullet([["Q4  The cost of assurance. ", true], ["Total overhead in throughput, watts and dollars. Publishing it honestly is the rigorous version of the claim that trustworthy physical AI needs more compute, not less."]], { after: 55 }),

      h2("06", "Shape of the ask"),
      p([["Two Jetson Thor, a DGX Spark or RTX PRO 6000 Blackwell for pinned local inference, and A100 hours dominated by Q1, since the guardrail set must be revalidated per model variant, not once per model. Outputs: an open-source stack; a public benchmark for guardrail durability under model updates, which does not exist today; two papers; and a reference safety case an operator could put in front of a regulator."]]),

      h2("07", "What I want argued about before this is written up"),
      bullet([["Embodiment: reuse the EywaGuard ground platform, go quadrotor where our planning and collision-checking work is strongest, or pivot to a manipulator to ride the GR00T narrative?"]]),
      bullet([["All four layers thinly as an integrated system, or deep on L2 and L3 where the publishable claims and the open questions actually sit?"]]),
      bullet([["Who is PI, and from which institution, given the program requires a full-time faculty member? Is the openness argument strong enough to lead, or does a reviewer want a capability claim first?"]], { after: 45 }),

      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 30, after: 0, line: 155 },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 4 } },
        children: [new TextRun({
          text: "SOURCES   [1] Nguyen, IEEE RA-L 10(8), 2025.   [2] RoboGuard, arXiv:2503.07885.   [3] KnowNo, CoRL 2023.   [4] XGrammar; alignment tax, arXiv:2604.06066.   [5] Thinking Machines, Defeating Nondeterminism, 2025.   [6] Activation-monitor staleness, arXiv:2606.15980.   [7] HAPI API-drift dataset.   [8] Safety Chip, ICRA 2024; simplex after Sha, 2001.   Data: nvidia/Nemotron-Pretraining-*, nvidia/PhysicalAI-Robotics-*.",
          font: MONO, size: 11, color: GREY,
        })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Interlock-Brief.docx', buf);
  console.log('wrote Interlock-Brief.docx', buf.length, 'bytes');
});
