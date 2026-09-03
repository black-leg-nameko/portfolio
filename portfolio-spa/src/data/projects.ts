export type ProjectMedia = {
  /** Still image shown in the grid and as the animation's poster. */
  src: string;
  /** Animated WebP loaded only when the visitor asks to play it. */
  animated?: string;
  /** Weight of that animation, shown on the play button so the click is informed. */
  animatedSize?: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  titleJa?: string;
  field: string;
  summary: string;
  description: string;
  stack: string[];
  media: ProjectMedia[];
  link?: { label: string; href: string };
};

const media = (file: string) => `/assets/media/${file}`;

export const projects: Project[] = [
  {
    slug: "nnast",
    title: "NNAST",
    titleJa: "GNN + LLM 型脆弱性診断ツール",
    field: "AI Security",
    summary:
      "Analyses web application source code with a graph neural network, localises vulnerable code, and drafts a fix with an LLM.",
    description:
      "NNAST parses application code into a graph representation, learns vulnerable patterns with a GNN, and hands the located sink to an LLM that proposes a concrete patch. It was selected for the AKATSUKI project of Fukuoka Mitou 2025.",
    stack: ["PyTorch", "Graph neural networks", "LLM"],
    media: [
      { src: media("NNAST1.webp"), alt: "NNAST analysis pipeline overview" },
      { src: media("NNAST2.webp"), alt: "NNAST detection results view" },
    ],
    link: { label: "Fukuoka Mitou project page", href: "https://mitou-fukuoka.org/works/nnast/" },
  },
  {
    slug: "aegis-id",
    title: "AegisID Protocol",
    titleJa: "分散型ID認証プロトコル",
    field: "Identity & Cryptography",
    summary:
      "A decentralised identity and verifiable-credential design combining SD-JWT, DID, WebAuthn, and OIDC.",
    description:
      "AegisID issues selectively-disclosable credentials as SD-JWT bound to a DID, authenticates the holder with WebAuthn, and presents the result to relying parties over an OIDC-compatible flow — so an existing OIDC client can consume verifiable credentials without changing its integration.",
    stack: ["SD-JWT", "DID", "WebAuthn", "OIDC"],
    media: [{ src: media("aegis-id-oidc.svg"), alt: "AegisID OIDC credential flow diagram" }],
  },
  {
    slug: "ouroboros",
    title: "ouroboros",
    titleJa: "評価器が見える Scheme 処理系",
    field: "Languages & Runtimes",
    summary:
      "A Scheme interpreter with a terminal visualiser that shows the abstract machine, the continuation stack, and the garbage collector while the program runs.",
    description:
      "An explicit CEK machine, so control, environment, and continuation are ordinary data on one heap — which is why proper tail calls and first-class continuations fall out of a single design. No dependencies: the mark & sweep collector, the terminal, and the GIF above are all in the repository.",
    stack: ["Rust", "Scheme", "CEK machine"],
    media: [
      {
        src: media("ouroboros-demo.webp"),
        animated: media("ouroboros-demo.anim.webp"),
        animatedSize: "1.1 MB",
        alt: "Terminal recording of the ouroboros visualiser stepping a Scheme program",
      },
    ],
  },
  {
    slug: "proc-scanner",
    title: "/proc Scanner",
    field: "Systems Security",
    summary:
      "A Rust scanner that walks the Linux /proc file system and scores processes for exposure using a custom heuristic.",
    description:
      "The scanner enumerates entries under /proc, extracts the attributes that tend to precede privilege-escalation findings, and ranks them with a custom scoring method so an operator can triage a host quickly instead of reading raw kernel state.",
    stack: ["Rust", "Linux"],
    media: [
      {
        src: media("proc-scanner-demo.webp"),
        animated: media("proc-scanner-demo.anim.webp"),
        animatedSize: "2.0 MB",
        alt: "Terminal recording of the /proc scanner ranking processes",
      },
    ],
  },
  {
    slug: "llmshell-agent",
    title: "LLM Shell Agent",
    titleJa: "自然言語で bash を操作する CLI",
    field: "LLM Tooling",
    summary:
      "A local-LLM CLI assistant that turns a sentence into the bash command it implies, then runs it under review.",
    description:
      "Runs entirely against a local model, so shell history and file paths never leave the machine. The agent infers the command, shows it, and executes only after confirmation — the interesting part is the prompt and guard design that keeps a language model from running something destructive.",
    stack: ["Llama", "Python"],
    media: [
      {
        src: media("llmshell-agent-demo.webp"),
        animated: media("llmshell-agent-demo.anim.webp"),
        animatedSize: "3.0 MB",
        alt: "Terminal recording of the natural-language shell agent",
      },
    ],
  },
  {
    slug: "leftar",
    title: "LeftaR",
    field: "AR & Rehabilitation",
    summary:
      "An AR rehabilitation tool for Unilateral Spatial Neglect, built to pull attention back to the ignored side.",
    description:
      "People with Unilateral Spatial Neglect (USN) systematically miss stimuli on one side — usually the left. LeftaR places AR targets in that neglected field and reinforces the patient's attention toward it during a training session.",
    stack: ["Swift", "ARKit"],
    media: [
      { src: media("LeftaR3DEMO1.webp"), alt: "LeftaR session overview" },
      { src: media("LeftaR4.webp"), alt: "LeftaR running on a device" },
      { src: media("LeftaR-demo2.webp"), alt: "LeftaR training target in AR" },
    ],
  },
  {
    slug: "eeg-analysis",
    title: "EEG Spectral Analysis",
    field: "Signal Processing",
    summary:
      "University project analysing measured brain-wave data with a DFT and rendering the result as a scalp topography.",
    description:
      "Measured EEG channels are transformed with a discrete Fourier transform, banded, and interpolated into a topographic map so band power can be read spatially rather than per channel.",
    stack: ["Octave", "DFT"],
    media: [
      {
        src: media("brain_waves_analysis-demo.webp"),
        animated: media("brain_waves_analysis-demo.anim.webp"),
        animatedSize: "1.2 MB",
        alt: "Animated EEG topography produced by the analysis",
      },
    ],
  },
  {
    slug: "rubik-solver",
    title: "Rubik's Cube Solver",
    field: "Graphics & Algorithms",
    summary: "A browser 3D cube simulator with an automated solver.",
    description:
      "Renders a manipulable cube in the browser and solves an arbitrary scramble step by step, animating each move so the algorithm is legible rather than instantaneous.",
    stack: ["Three.js", "HTML / CSS"],
    media: [
      {
        src: media("rubikdemo.webp"),
        animated: media("rubikdemo.anim.webp"),
        animatedSize: "0.3 MB",
        alt: "3D Rubik's cube solving itself in the browser",
      },
    ],
  },
];
