import type { ChecklistAnswers, ReliefId, TaxYear } from "../lib/types";

/** Inclusive calendar tax-year window when Socair should surface a relief. */
export type YearWindow = {
  from: number;
  to?: number;
};

/**
 * Remote Working Relief: older administrative e-working guidance existed, but the
 * current statutory 30% formula (s.114A TCA / Finance Act 2021) applies from
 * 1 January 2022. Socair only offers TY 2022–2026, so WFH is in scope for every
 * selectable year — still gated here so older years never leak in later.
 *
 * Rent Tax Credit: from TY 2022; extended through TY 2028 (Budget 2026).
 */
export const RELIEF_YEARS: Record<ReliefId, YearWindow> = {
  remote_working: { from: 2022 },
  rent_tax_credit: { from: 2022, to: 2028 },
  health_expenses: { from: 2022 },
  nursing_home: { from: 2022 },
  flat_rate_expense: { from: 2022 },
  mortgage_interest_credit: { from: 2022 },
  tuition_fees: { from: 2022 },
  home_carer_credit: { from: 2022 },
  age_credit: { from: 2022 },
  incapacitated_child_credit: { from: 2022 },
  dependent_relative_credit: { from: 2022 },
};

export function reliefAvailableInYear(id: ReliefId, year: TaxYear): boolean {
  const w = RELIEF_YEARS[id];
  if (!w) return true;
  if (year < w.from) return false;
  if (w.to != null && year > w.to) return false;
  return true;
}

/** Question ids that map to a year-gated relief. */
export const QUESTION_RELIEF: Partial<Record<keyof ChecklistAnswers, ReliefId>> = {
  q_wfh: "remote_working",
  q_rent: "rent_tax_credit",
  q_rent_landlord: "rent_tax_credit",
  q_medical: "health_expenses",
  q_dental_nonroutine: "health_expenses",
  q_nursing: "nursing_home",
  q_fre: "flat_rate_expense",
  q_tuition: "tuition_fees",
  q_mortgage_interest: "mortgage_interest_credit",
  q_home_carer: "home_carer_credit",
  q_incap_child: "incapacitated_child_credit",
  q_dep_relative: "dependent_relative_credit",
};
