const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, LevelFormat, convertInchesToTwip
} = require('docx');
const fs = require('fs');

const INK = "1A1D1A";
const ACCENT = "44701B";
const GREY = "5A645A";
const WARN = "875A0E";
const RULE = "C9CFC2";
const BAND = "EDF2E3";

const BODY = "Cambria";
const HEAD = "Calibri";
const MONO = "Consolas";

const CONTENT_W = 11906 - 2 * 1000; // A4 width less margins, in DXA

// ---------- helpers ----------

const rule = (size = 12, color = INK, before = 60, after = 140) => new Paragraph({
  spacing: { before, after },
  border: { bottom: { style: BorderStyle.SINGLE, size, color, space: 1 } },
  children: [new TextRun({ text: "", size: 2 })],
});

const body = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: opts.after ?? 100, line: 232 },
  children: [new TextRun({ text, font: BODY, size: 18, color: INK })],
});

// rich justified paragraph from [text, bold?] pairs
const rich = (parts, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: opts.after ?? 100, line: 232 },
  children: parts.map(([t, b]) => new TextRun({
    text: t, font: BODY, size: 18, color: INK, bold: !!b,
  })),
});

const h2 = (num, text) => new Paragraph({
  spacing: { before: 140, after: 55 },
  keepNext: true,
  children: [
    new TextRun({ text: num + "  ", font: MONO, size: 15, bold: true, color: ACCENT }),
    new TextRun({ text, font: HEAD, size: 21, bold: true, color: INK }),
  ],
});

const bullet = (parts, opts = {}) => new Paragraph({
  numbering: { reference: "dot", level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: opts.after ?? 55, line: 224 },
  children: parts.map(([t, b]) => new TextRun({
    text: t, font: BODY, size: 18, color: INK, bold: !!b,
  })),
});

const cell = (children, width, shade) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  margins: { top: 70, bottom: 70, left: 110, right: 110 },
  shading: shade ? { type: ShadingType.CLEAR, fill: shade, color: "auto" } : undefined,
  borders: {
    top: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    left: { style: BorderStyle.SINGLE, size: 4, color: RULE },
    right: { style: BorderStyle.SINGLE, size: 4, color: RULE },
  },
  children,
});

const tcell = (text, size = 17, opts = {}) => new Paragraph({
  alignment: opts.justify ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
  spacing: { after: 0, line: 208 },
  children: [new TextRun({
    text, font: opts.font || BODY, size, color: opts.color || INK, bold: !!opts.bold,
  })],
});

// ---------- layer table ----------

const COLS = [1400, 5906, 2800];

const layerRow = (tag, role, title, desc, kit) => new TableRow({
  cantSplit: true,
  children: [
    cell([
      tcell(tag, 17, { font: MONO, bold: true, color: ACCENT }),
      tcell(role, 14, { font: MONO, color: GREY }),
    ], COLS[0]),
    cell([
      tcell(title, 18, { font: HEAD, bold: true }),
      tcell(desc, 17, { justify: true }),
    ], COLS[1]),
    cell([tcell(kit, 15, { font: MONO, color: GREY })], COLS[2]),
  ],
});

const headerRow = new TableRow({
  tableHeader: true,
  children: [
    cell([tcell("LAYER", 14, { font: MONO, bold: true, color: GREY })], COLS[0], BAND),
    cell([tcell("MECHANISM", 14, { font: MONO, bold: true, color: GREY })], COLS[1], BAND),
    cell([tcell("NVIDIA COMPONENTS", 14, { font: MONO, bold: true, color: GREY })], COLS[2], BAND),
  ],
});

const stack = new Table({
  columnWidths: COLS,
  width: { size: COLS.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  rows: [
    headerRow,
    layerRow("L0 PIN", "substrate", "Reproducible inference",
      "Checkpoint hash, quantisation recipe, batch-invariant kernels, fixed seeds and recorded sensor tape treated as one versioned unit. Deliverable: a conformance test that replays a tape and fails loudly on any substrate change, so a silent regression becomes a build failure rather than a field incident.",
      "Nemotron 3 Nano / Super, Cosmos Reason, Isaac GR00T N1.7, NIM, TensorRT-LLM, Dynamo, Jetson Thor"),
    layerRow("L1 TYPE", "harness", "Constrained decoding, so free text never reaches the control path",
      "Grammar and automaton constrained decoding masks the next-token distribution at every step, so the model can only emit well-typed artifacts: waypoints in the robot frame, semantic goal handles, or temporal-logic clauses. Type correctness holds by construction, with no parse errors and no retries. The known cost is an alignment tax on reasoning quality, which we measure rather than assume away.",
      "XGrammar in TensorRT-LLM; NeMo Guardrails, with Colang extended from dialog rails to action rails"),
    layerRow("L2 VETO", "guardrail", "Symbolic specification and a verified fallback",
      "Site rules are grounded into temporal-logic specifications and resolved against the proposed plan by control synthesis; RoboGuard reports unsafe plan execution falling from 92% to under 2.5% under worst-case jailbreaking, with no loss on safe plans. Beneath it, a simplex runtime-assurance switch hands authority to a verified controller, and a reachability or barrier-function filter is the last line. Our non-conservative, depth noise-aware planner is that verified executor, so continuity with the prior award is structural rather than rhetorical.",
      "Isaac Sim and Isaac Lab for adversarial scenario generation and falsification; Isaac ROS"),
    layerRow("L3 ESC.", "orchestration", "Calibrated deferral and edge-to-cloud routing",
      "Conformal prediction over the model's real token scores yields distribution-free coverage guarantees and a principled trigger to ask a human or escalate to a larger model, in the KnowNo tradition. This needs logits, which open weights give and most commercial endpoints withhold. A small pinned model holds the time-critical edge loop while a large one is reachable for slow reasoning.",
      "NeMo Switchyard routing, Dynamo, A100 or DGX hours for calibration sweeps"),
  ],
});

// ---------- document ----------

const doc = new Document({
  creator: "Binh Nguyen",
  title: "Interlock concept brief",
  description: "Version-pinned harnesses and guardrails for open-weight models in robotics",
  numbering: {
    config: [{
      reference: "dot",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 260, hanging: 190 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: { margin: { top: 820, bottom: 740, left: 900, right: 900 } },
    },
    children: [

      // masthead
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({
          text: "NVIDIA ACADEMIC GRANT PROGRAM   •   ROBOTICS AND EDGE AI   •   CONCEPT BRIEF v0.1   •   DRAFT FOR COMMENT",
          font: MONO, size: 13, color: GREY, characterSpacing: 12,
        })],
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: INK, space: 4 } },
      }),

      new Paragraph({
        spacing: { before: 130, after: 30 },
        children: [new TextRun({ text: "Interlock", font: HEAD, size: 48, bold: true, color: INK })],
      }),
      new Paragraph({
        spacing: { after: 110 },
        children: [new TextRun({
          text: "Version-pinned harnesses, guardrails and orchestration for open-weight models in robot perception, trajectory planning and control.",
          font: HEAD, size: 21, color: GREY,
        })],
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({
          text: "Circulated by Binh Nguyen   |   2 September 2026   |   Lineage: EywaGuard, NVIDIA Academic Grant (awarded)   |   Status: rough idea, tear it apart",
          font: MONO, size: 14, color: GREY,
        })],
      }),

      // thesis, indented band
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 50, after: 50, line: 232 },
        indent: { left: 180, right: 60 },
        border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 10 } },
        children: [new TextRun({
          text: "Open weights are the only substrate on which a robot safety case can be written down and stay true. Every guardrail is a contract with one specific model, and a model you do not control can void that contract overnight without telling you. The proposal is to build the stack that turns a pinned checkpoint into a certifiable autonomy component, and to measure what that assurance actually costs in throughput, latency and watts.",
          font: BODY, size: 19, color: INK,
        })],
      }),

      h2("01", "The open-weight push is a hardware demand strategy, and physical AI is where it stalls"),
      body("NVIDIA has spent 2026 making the case for open weights from every direction at once: the Nemotron 3 family with published weights and reproducible training recipes, the Nemotron Coalition of external labs, a joint engine with Palantir for training and serving Nemotron inside classified and air-gapped environments, and Isaac GR00T N1.7 with an open reference humanoid for academic research. The logic is direct. Every government, defence prime and industrial operator that vendors its own weights to achieve sovereignty buys its own accelerators to serve them."),
      body("That logic runs into a wall in physical AI. A sovereign operator can host a model easily enough, but it cannot certify a robot around it. What gates deployment in mining, agriculture, defence and orbital servicing is not model quality, which is already adequate; it is the absence of an assurance argument that a safety regulator, an insurer or a mission authority will accept. Nobody has built the stack that converts open weights into that argument."),

      h2("02", "Closed models rot your guardrails; pinned weights make them durable"),
      bullet([["Drift is measured, not suspected. ", true], ["Longitudinal tracking of commercial ML APIs (HAPI and follow-on studies) found substantial behaviour change over time in the majority of APIs observed, including within an unchanged version string."]]),
      bullet([["The best guardrails are the most fragile. ", true], ["Activation probes are the cheapest and lowest-latency runtime monitors available, and a 2026 benchmark finds that quantisation-style updates largely preserve frozen probes while fine-tuning-style updates frequently invalidate them. On a closed endpoint you cannot even tell which kind of update landed."]]),
      bullet([["Determinism is purchasable. ", true], ["Batch-invariant kernels buy bitwise-identical output across repeated runs at a measured cost of roughly 34% to 60% of throughput."]], { after: 130 }),
      rich([["Open weights invert this. Pin a checkpoint hash, a quantisation recipe and a kernel set, and every derived artifact, whether a linear probe, a conformal quantile, a decoding grammar or a falsification suite, acquires a stable referent and an explicit revalidation trigger: the pin changed, so revalidate. Add batch-invariant kernels and the inference itself becomes bitwise reproducible, which is the property a regression suite has always silently assumed and never had. Same sensor tape in, same trajectory out, every time, and a diff the moment that stops holding. "], ["Determinism stops being a hope about the vendor and becomes a line item you buy with compute.", true]], { after: 160 }),

      h2("03", "Architecture: four layers, command flowing down and veto flowing up"),
      stack,

      h2("04", "Four questions the literature has not answered"),
      bullet([["Q1. Validity domain. ", true], ["Given a guardrail certificate calibrated on one (weights, quantisation, kernels) triple, how does it degrade under post-training quantisation, LoRA adaptation and full fine-tuning? Staleness has now been benchmarked for text monitors; nothing equivalent exists for embodied action, where the failure lands in the physical world."]]),
      bullet([["Q2. Coverage under shift. ", true], ["Conformal prediction assumes exchangeability, and deployment breaks it on day one through weather, lighting, wear and novel clutter. What is a defensible coverage claim on a real robot, and how is the quantile re-estimated online without discarding the guarantee?"]]),
      bullet([["Q3. The safety-latency frontier. ", true], ["Closed-loop monitoring consumes exactly the milliseconds in which the collision it is preventing would occur, so a slow guardrail can cause the harm it was installed to stop. The trade-off is acknowledged in the VLA safety literature and rarely quantified. We would map it on Thor-class edge silicon."]]),
      bullet([["Q4. The cost of assurance. ", true], ["Total overhead in throughput, watts and dollars of deterministic inference plus four guardrail layers at the edge. Publishing that number honestly is the rigorous version of the claim that trustworthy physical AI needs more compute, not less."]], { after: 140 }),

      h2("05", "Shape of the ask"),
      body("Two Jetson Thor units, one deployed and one as a development twin; a DGX Spark or RTX PRO 6000 Blackwell workstation for pinned local inference with batch-invariant kernels; and A100 hours dominated by Q1, since the full guardrail set must be retrained and revalidated across every model variant rather than run once per model. Outputs: an open-source reference stack; a public benchmark for guardrail durability under model updates in embodied settings, which does not currently exist in any form; two conference submissions; and a written reference safety case in a form an operator could put in front of a regulator. That last artifact is what NVIDIA's sovereign-AI customers are missing, and it is cheap for us to produce alongside the code."),

      h2("06", "What I want argued about before this is written up"),
      bullet([["Embodiment: reuse the EywaGuard ground platform, go quadrotor where our planning and collision-checking work is strongest, or pivot to a manipulator to ride the GR00T narrative directly?"]]),
      bullet([["Depth versus breadth: build all four layers thinly as an integrated system, or go deep on L2 and L3 where the publishable claims and the unanswered questions actually sit?"]]),
      bullet([["Is the drift-and-staleness argument strong enough to carry the opening paragraph, or does a reviewer want a conventional capability claim first?"]]),
      bullet([["Who is PI, and from which institution, given the program requires a full-time faculty member? Continuity with the awarded EywaGuard proposal is worth something here."]]),
      bullet([["Should the safety case target a named standard or authority from the start, or stay deliberately generic in the first year?"]], { after: 80 }),

      rule(8, RULE, 70, 55),
      new Paragraph({
        spacing: { after: 20 },
        children: [new TextRun({ text: "SOURCES", font: MONO, size: 13, bold: true, color: GREY, characterSpacing: 14 })],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 0, line: 195 },
        children: [new TextRun({
          text: [
            "[1] B. Nguyen et al., Non-Conservative Efficient Collision Checking and Depth Noise-Awareness for Trajectory Planning, IEEE RA-L 10(8), 2025.",
            "[2] Safety Guardrails for LLM-Enabled Robots (RoboGuard), arXiv:2503.07885, IEEE RA-L.",
            "[3] A. Ren et al., Robots That Ask For Help (KnowNo), CoRL 2023, arXiv:2307.01928.",
            "[4] XGrammar / Outlines constrained decoding; alignment tax, arXiv:2604.06066, 2026.",
            "[5] Thinking Machines Lab, Defeating Nondeterminism in LLM Inference, September 2025.",
            "[6] Do Activation Monitors Survive Model Updates? arXiv:2606.15980, 2026.",
            "[7] HAPI longitudinal commercial-API dataset; drift analyses in arXiv:2407.12220.",
            "[8] P. Belcak et al., Small Language Models are the Future of Agentic AI, arXiv:2506.02153.",
            "[9] Vision-Language-Action Safety survey, arXiv:2604.23775, 2026.",
            "[10] W. Yang et al., Plug in the Safety Chip, ICRA 2024. Simplex runtime assurance after L. Sha, 2001.",
          ].join("   "),
          font: MONO, size: 12, color: GREY,
        })],
      }),
    ],
  }],
});
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Interlock-Brief.docx', buf);
  console.log('wrote Interlock-Brief.docx', buf.length, 'bytes');
});
