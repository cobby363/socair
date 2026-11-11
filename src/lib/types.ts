export type TaxYear = 2022 | 2023 | 2024 | 2025 | 2026;

export type ClaimMode = "priorYear" | "inYear";

export type PersonalStatus =
  | "single"
  | "married_joint"
  | "married_separate"
  | "lone_parent"
  | "widowed";

export type TriState = "yes" | "no" | "unsure";

export type ReliefId =
  | "rent_tax_credit"
  | "health_expenses"
  | "nursing_home"
  | "remote_working"
  | "flat_rate_expense"
  | "mortgage_interest_credit"
  | "home_carer_credit"
  | "age_credit"
  | "incapacitated_child_credit"
  | "dependent_relative_credit"
  | "tuition_fees";

export interface ChecklistAnswers {
  q_status?: PersonalStatus;
  q_age65?: TriState;
  q_paye?: TriState;
  q_job_change?: TriState;
  q_idle?: TriState;
  q_second_job?: TriState;
  q_wfh?: TriState;
  q_fre?: TriState;
  q_rent?: TriState;
  q_rent_landlord?: TriState;
  q_tuition?: TriState;
  q_mortgage_interest?: TriState;
  q_medical?: TriState;
  q_dental_nonroutine?: TriState;
  q_nursing?: TriState;
  q_home_carer?: TriState;
  q_incap_child?: TriState;
  q_dep_relative?: TriState;
}

export interface EstimateAmounts {
  grossPay?: number;
  taxPaid?: number;
  weeksIdle?: number;
  rentPaidYear?: number;
  healthNetPaid?: number;
  nursingHomeNetPaid?: number;
  utilityBillsYear?: number;
  remoteDays?: number;
  employerWfhPay?: number;
  freAmount?: number;
  freOccupation?: string;
  mortgageInterestPaid?: number;
  homeCarerIncome?: number;
  incapChildCount?: number;
  depRelativeCount?: number;
  rememberAmounts?: boolean;
}

export interface AppPersistedState {
  taxYear: TaxYear;
  answers: ChecklistAnswers;
  selectedReliefIds: ReliefId[];
  stepTicks: Record<string, boolean>;
  checklistComplete: boolean;
  amounts?: EstimateAmounts;
}

export interface ReliefMeta {
  id: ReliefId;
  title: string;
  oneLiner: string;
  claimOrder: number;
  estimateSupported: boolean;
}
