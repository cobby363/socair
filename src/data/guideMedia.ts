/** Sparse step images — only where text alone is easy to get wrong. */

export type StepImage = {
  src: string;
  caption: string;
  source: "official" | "user";
};

/** Prior-year hub: year buttons + Request Statement of Liability. */
export const SHOT_REVIEW_PRIOR_YEARS: StepImage = {
  src: "/guide-shots/user/review-prior-years.png",
  caption:
    "Pick the tax year, then Request Statement of Liability (wording can vary slightly).",
  source: "user",
};

/** In-year: credit category list after Add new credits. */
export const SHOT_CREDIT_CATEGORIES: StepImage = {
  src: "/guide-shots/official/official-credit-categories.png",
  caption:
    "Official sample: after Add new credits, pick a category (Health, Your job, You and your family, etc.).",
  source: "official",
};

/** Receipts Tracker expense form — categories matter for health / nursing / remote. */
export const SHOT_ADD_RECEIPT: StepImage = {
  src: "/guide-shots/user/add-receipt-expense.png",
  caption:
    "Receipts Tracker → Add receipt: date paid, category, and sub-category (personal details redacted).",
  source: "user",
};
