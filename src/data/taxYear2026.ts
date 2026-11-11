/** Tax year 2026 constants — sourced from Revenue tax charts / Budget 2026.
 *  Keep as a single config so Budget updates are one-file changes.
 */
export const TY2026 = {
  label: "2026",
  standardRate: 0.2,
  higherRate: 0.4,
  bandSingle: 44000,
  bandLoneParent: 48000,
  bandMarriedOneIncome: 53000,
  bandMarriedTwoIncomeExtraMax: 35000,
  creditSinglePersonal: 2000,
  creditMarriedPersonal: 4000,
  creditEmployeePAYE: 2000,
  rentCreditMaxSingle: 1000,
  rentCreditMaxJoint: 2000,
  rentCreditRate: 0.2,
  healthReliefRate: 0.2,
  wfhAllowablePct: 0.3,
  mortgageInterestCreditMax: 1250,
  homeCarerCreditMax: 1950,
  ageCreditSingle: 245,
  ageCreditMarried: 490,
  incapChildCredit: 3800,
  depRelativeCredit: 305,
  depRelativeIncomeLimit: 18548,
  daysInYear: 365,
} as const;

export const PRIOR_YEARS = [2025, 2024, 2023, 2022] as const;

/** Common FRE examples — full Revenue PDF has many more occupations. */
export const FRE_PRESETS: { label: string; amount: number }[] = [
  { label: "Nurse / Midwife (general)", amount: 733 },
  { label: "Shop assistant", amount: 121 },
  { label: "Bar staff", amount: 93 },
  { label: "Chef / Cook", amount: 254 },
  { label: "Mechanic (motor)", amount: 221 },
  { label: "Carpenter / Joiner", amount: 220 },
  { label: "Electrician", amount: 247 },
  { label: "Teacher (primary/secondary) — check current FRE list", amount: 518 },
  { label: "Other / enter manually", amount: 0 },
];
