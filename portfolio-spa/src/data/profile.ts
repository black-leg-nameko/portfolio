export const profile = {
  name: "Ryuto Kitajima",
  nameJa: "北島 琉斗",
  handle: "black-leg",
  role: "Security & Machine Learning Research",
  /** The one line under the name. It is the whole self-description. */
  statement: "I work on AI and security.",
  /**
   * Never rendered — it is the <meta name="description"> and the text on a shared link
   * card, where a search result or a preview has to say what the page is about.
   */
  description:
    "Security and machine-learning research — cross-chain bridge timing, code-level vulnerability detection, and the failure modes that only appear when the two are combined.",
  email: "kitajima.ryuto.146@s.kyushu-u.ac.jp",
  interests: ["Blockchain Security", "LLM Security", "Applied Machine Learning"],
  focus: ["Cyber Security", "AI", "App Development", "CTF / HTB"],
  links: {
    github: "https://github.com/black-leg-nameko",
    linkedin: "https://www.linkedin.com/in/ryuto-kitajima-b93748378/",
    x: "https://x.com/kitanmk",
  },
} as const;

/* ---------------------------------------------------------------------------
   Not currently rendered. The Experience and Tools sections were removed from the
   home page — the content is kept here so putting either back is a matter of
   mapping over it again, not rewriting it. `profile.focus` and `profile.interests`
   are in the same state.
   --------------------------------------------------------------------------- */

export type ExperienceItem = {
  title: string;
  detail: string;
  link?: { label: string; href: string };
};

export const experience: ExperienceItem[] = [
  {
    title: "Software Engineer",
    detail:
      "Building production systems day to day, and carrying that engineering practice back into research prototypes.",
  },
  {
    title: "Automotive security internship",
    detail:
      "Implemented encryption-based security access for in-vehicle software as part of an automotive cybersecurity effort.",
  },
  {
    title: "AKATSUKI project — Fukuoka Mitou 2025",
    detail: "Selected for the programme with NNAST, a GNN + LLM vulnerability analysis system.",
    link: { label: "Project page", href: "https://mitou-fukuoka.org/works/nnast/" },
  },
  {
    title: "Security research PoCs",
    detail:
      "Regularly implementing proof-of-concept exploits and defences to validate research assumptions against real systems.",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["C / C++", "Rust", "Python", "Scala", "TypeScript"] },
  { label: "Machine learning", items: ["PyTorch", "Graph neural networks", "LLM tooling"] },
  { label: "Web", items: ["Next.js", "Laravel"] },
  { label: "Cloud", items: ["AWS (production)", "GCP (research)"] },
];
