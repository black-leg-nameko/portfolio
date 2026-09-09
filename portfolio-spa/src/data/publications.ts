export type Publication = {
  title: string;
  authors: string[];
  affiliation?: string;
  venue: string;
  /**
   * Required, and deliberately not optional with a default: the list is split into a
   * peer-reviewed group and a non-peer-reviewed one, and a new entry has to state which
   * it is rather than inherit the flattering answer.
   */
  peerReviewed: boolean;
  /** Session or paper number, where the venue assigns one. */
  number?: string;
  /** Set when title / authors / venue are Japanese, so they render in the sans face. */
  ja?: boolean;
  /** Set once the venue schedules the work; omitted while it is only accepted. */
  date?: string;
  /** Publication state, shown only while it is not simply "published". */
  status?: string;
  href?: string;
  doi?: string;
};

/** Reverse chronological; accepted-but-unscheduled work sits at the top. */
export const publications: Publication[] = [
  {
    title:
      "Source-Validated Selective LLM Invocation for Direct Prompt-Injection Attempt Detection under False-Bypass Constraints",
    authors: [
      "Ryuto Kitajima",
      "Souya Yoshizuka",
      "Kohei Miyamoto",
      "Takeshi Takahashi",
      "Kouichi Sakurai",
    ],
    affiliation: "Kyushu University / NICT",
    venue: "IWSEC 2026 — International Workshop on Security",
    peerReviewed: true,
    status: "Accepted",
  },
  {
    title: "TIE: A Temporal Inconsistency Exploitation Threat Class for Cross-Chain Bridges",
    authors: ["Ryuto Kitajima", "Kouichi Sakurai"],
    affiliation: "Kyushu University",
    venue: "ICICS 2026 — International Conference on Information and Communications Security",
    peerReviewed: true,
    status: "Accepted",
  },
  {
    title: "A Formal Semantics of Ownership for Multi-Chain NFT Systems",
    authors: ["Ryuto Kitajima", "Kouichi Sakurai"],
    affiliation: "Kyushu University",
    venue: "ICICS 2026 — International Conference on Information and Communications Security",
    peerReviewed: true,
    status: "Accepted",
  },
  {
    title:
      "Random Forest＋LLMによるプロンプトインジェクション検出手法の再考：分類器トリアージと選択的LLM呼び出しによる追試評価",
    authors: ["北島 琉斗", "吉塚 創也", "宮本 耕平", "高橋 健志", "櫻井 幸一"],
    affiliation: "九州大学 / NICT",
    venue: "コンピュータセキュリティシンポジウム 2026 (CSS2026)",
    peerReviewed: false,
    number: "4E3-5",
    ja: true,
    date: "2026-10",
    // Scheduled, not yet given: the programme fixes the slot, the talk is still ahead.
    status: "Scheduled",
    href: "https://www.iwsec.org/css/2026/program.html",
  },
  {
    title:
      "Web3 AIエージェントにおける証拠多重性攻撃面の分析 ― ERC-8004 エコシステムを対象として ―",
    // Four institutions on one entry, so the line names them all rather than the first:
    // the Korean co-authors are not covered by the Kyushu / NICT pair.
    authors: [
      "北島 琉斗",
      "Park Minjung",
      "Chai Sangmi",
      "宮本 耕平",
      "高橋 健志",
      "櫻井 幸一",
    ],
    affiliation: "九州大学 / NICT / 金烏工科大学校 / 梨花女子大学",
    venue: "コンピュータセキュリティシンポジウム 2026 (CSS2026)",
    peerReviewed: false,
    number: "3G2-2",
    ja: true,
    date: "2026-10",
    status: "Scheduled",
    href: "https://www.iwsec.org/css/2026/program.html",
  },
  {
    title: "クロスチェーン NFT における所有権未確定性の状態管理型防御",
    authors: ["北島 琉斗", "櫻井 幸一"],
    affiliation: "九州大学",
    venue: "FIT 2026 第26回情報科学技術フォーラム",
    peerReviewed: false,
    number: "L-015",
    ja: true,
    date: "2026-09",
    href: "https://www.gakkai-web.net/fit/program_web/data/html/program/l.html",
  },
  {
    title: "クロスチェーンブリッジ遅延の予測に基づく時間的不整合脆弱性の機械学習的評価",
    authors: ["北島 琉斗", "櫻井 幸一"],
    affiliation: "九州大学",
    venue: "情報処理学会 第112回コンピュータセキュリティ研究会 (CSEC)",
    peerReviewed: false,
    ja: true,
    date: "2026-03",
    href: "https://www.ipsj.or.jp/kenkyukai/event/dps206csec112.html",
  },
];
