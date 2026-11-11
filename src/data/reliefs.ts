import type { ReliefId, ReliefMeta } from "../lib/types";

export const RELIEFS: ReliefMeta[] = [
  {
    id: "health_expenses",
    title: "Health expenses",
    oneLiner: "Unreimbursed medical / non-routine dental costs at 20% relief.",
    claimOrder: 1,
    estimateSupported: true,
  },
  {
    id: "nursing_home",
    title: "Nursing home fees",
    oneLiner: "Approved nursing home costs — relief at your highest tax rate.",
    claimOrder: 2,
    estimateSupported: true,
  },
  {
    id: "rent_tax_credit",
    title: "Rent tax credit",
    oneLiner: "Private rent credit — up to €1,000 (or €2,000 jointly assessed).",
    claimOrder: 3,
    estimateSupported: true,
  },
  {
    id: "remote_working",
    title: "Remote working relief",
    oneLiner: "Share of electricity, heating and broadband for home workdays.",
    claimOrder: 4,
    estimateSupported: true,
  },
  {
    id: "flat_rate_expense",
    title: "Flat-rate expenses",
    oneLiner: "Fixed Revenue amounts for some jobs (uniforms, tools, etc.).",
    claimOrder: 5,
    estimateSupported: true,
  },
  {
    id: "mortgage_interest_credit",
    title: "Mortgage interest tax credit",
    oneLiner: "May apply if you paid qualifying mortgage interest (condition-heavy).",
    claimOrder: 6,
    estimateSupported: true,
  },
  {
    id: "tuition_fees",
    title: "Tuition fees relief",
    oneLiner: "Qualifying fees for approved courses — guide first in this version.",
    claimOrder: 7,
    estimateSupported: false,
  },
  {
    id: "home_carer_credit",
    title: "Home carer tax credit",
    oneLiner: "For couples where one partner cares at home with limited income.",
    claimOrder: 8,
    estimateSupported: true,
  },
  {
    id: "age_credit",
    title: "Age tax credit",
    oneLiner: "Extra credit if you (or your partner) were 65+ in the year.",
    claimOrder: 9,
    estimateSupported: true,
  },
  {
    id: "incapacitated_child_credit",
    title: "Incapacitated child credit",
    oneLiner: "Credit where you care for a qualifying incapacitated child.",
    claimOrder: 10,
    estimateSupported: true,
  },
  {
    id: "dependent_relative_credit",
    title: "Dependent relative credit",
    oneLiner: "If you maintained a dependent relative under the income limit.",
    claimOrder: 11,
    estimateSupported: true,
  },
];

export const RELIEF_BY_ID: Record<ReliefId, ReliefMeta> = Object.fromEntries(
  RELIEFS.map((r) => [r.id, r]),
) as Record<ReliefId, ReliefMeta>;

export { CLAIM_GUIDES as CLAIM_STEPS } from "./claimGuides";

