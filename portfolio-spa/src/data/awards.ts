export type Award = {
  /**
   * The official name of the programme or prize, in the language the awarding body uses
   * it in — a Japanese programme is named in Japanese, the way the publication list keeps
   * Japanese papers under their Japanese titles.
   */
  title: string;
  /**
   * Set when the title is Japanese, so it renders in the sans face rather than mono.
   * It covers `track` too, which is written in the same language as the title.
   */
  ja?: boolean;
  /**
   * The domain or course selected within the programme, where it names one. It is a
   * qualifier on the title, not part of it: carried in the programme's own name it takes
   * the title to two lines and strands the closing bracket alone on the second.
   */
  track?: string;
  /** Set only when the awarding body is not already named by the title. */
  organization?: string;
  /**
   * Required, and deliberately not optional with a default: a funded selection and a
   * prize are not the same claim, and a new entry has to state which it is. It is also
   * what the list splits on if `Awards` and `Grants` ever become two groups.
   */
  kind: "grant" | "award" | "fellowship";
  /** Written as awarded, in the awarding currency. Omitted for awards with no funding. */
  amount?: string;
  /**
   * Japanese programmes are counted in 年度 (fiscal year, April–March), so "2026" here
   * means FY2026 rather than the calendar year the decision landed in.
   */
  date: string;
};

/**
 * Reverse chronological, like the publication list. An entry names the programme, the
 * body, the amount and the year, and stops there: no project description, and no link.
 */
export const awards: Award[] = [
  {
    title: "未踏ターゲット事業",
    ja: true,
    track: "リザバーコンピューティング技術を活用したソフトウェア開発分野",
    organization: "IPA",
    kind: "grant",
    amount: "3,960,000 JPY",
    date: "2026",
  },
  {
    title: "福岡未踏的人材発掘・育成コンソーシアム(Solve)",
    ja: true,
    kind: "grant",
    amount: "500,000 JPY",
    date: "2025",
  },
];
