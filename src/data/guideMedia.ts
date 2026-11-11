/** Guide screenshots: official Revenue manual extracts (primary) + redacted user captures (secondary). */

export type GuideShot = {
  src: string;
  caption: string;
  source: "official" | "user";
  /** Optional: only show on these relief guides; omit = shared / general */
  reliefIds?: string[];
};

/**
 * Primary = Revenue Tax and Duty Manual figures (illustrative sample UI).
 * Secondary = contributor screenshots with personal details redacted.
 */
export const GUIDE_SHOTS: GuideShot[] = [
  {
    src: "/guide-shots/official/official-paye-card.png",
    caption:
      "Official: PAYE Services card — open Receipts Tracker (Remote Working, Health, Nursing Home).",
    source: "official",
  },
  {
    src: "/guide-shots/official/official-receipts-tracker.png",
    caption: "Official: Receipts Tracker — Add new receipt.",
    source: "official",
    reliefIds: ["health_expenses", "nursing_home", "remote_working"],
  },
  {
    src: "/guide-shots/official/official-receipts-from-2020.png",
    caption:
      "Official: Receipts Tracker also appears under Manage My Record (as well as PAYE Services).",
    source: "official",
    reliefIds: ["health_expenses", "nursing_home", "remote_working"],
  },
  {
    src: "/guide-shots/official/official-current-credits.png",
    caption:
      "Official sample: Your current credits — use Add new credits (amounts shown are Revenue’s sample data).",
    source: "official",
  },
  {
    src: "/guide-shots/official/official-credit-categories.png",
    caption:
      "Official: Tax credits you may also be eligible for — categories such as Health, Your job, You and your family.",
    source: "official",
  },
  {
    src: "/guide-shots/user/tax-services-grid.png",
    caption: "Secondary: myAccount Tax services grid — start at PAYE Services.",
    source: "user",
  },
  {
    src: "/guide-shots/user/paye-services-card.png",
    caption:
      "Secondary: PAYE Services links — Manage your tax, Review previous years, Receipts Tracker.",
    source: "user",
  },
  {
    src: "/guide-shots/user/review-prior-years.png",
    caption:
      "Secondary: Review your tax (prior years) — pick the year, then Request Statement of Liability.",
    source: "user",
  },
  {
    src: "/guide-shots/user/manage-tax-overview.png",
    caption:
      "Secondary: Manage your tax overview — Add new credits / Manage receipts (personal figures redacted).",
    source: "user",
  },
  {
    src: "/guide-shots/user/receipts-tracker-home.png",
    caption: "Secondary: Receipts Tracker home — expenses from 2022 onwards on this screen.",
    source: "user",
    reliefIds: ["health_expenses", "nursing_home", "remote_working"],
  },
  {
    src: "/guide-shots/user/add-receipt-expense.png",
    caption: "Secondary: Add receipt expense — date paid, category, sub-category.",
    source: "user",
    reliefIds: ["health_expenses", "nursing_home", "remote_working"],
  },
  {
    src: "/guide-shots/user/jobs-pensions.png",
    caption:
      "Secondary: Jobs and pensions list (personal employment details hidden).",
    source: "user",
  },
];

export function shotsForRelief(reliefId: string | undefined): GuideShot[] {
  const shared = GUIDE_SHOTS.filter((s) => !s.reliefIds);
  if (!reliefId) return shared;
  const specific = GUIDE_SHOTS.filter(
    (s) => s.reliefIds && s.reliefIds.includes(reliefId),
  );
  // Official first, then user — already ordered that way in GUIDE_SHOTS
  const official = [...specific, ...shared].filter((s) => s.source === "official");
  const user = [...specific, ...shared].filter((s) => s.source === "user");
  // Dedupe by src while preserving order
  const seen = new Set<string>();
  const out: GuideShot[] = [];
  for (const s of [...official, ...user]) {
    if (seen.has(s.src)) continue;
    seen.add(s.src);
    out.push(s);
  }
  return out;
}
