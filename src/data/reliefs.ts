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

export const CLAIM_STEPS: Record<
  ReliefId,
  { title: string; need: string[]; stepsPrior: string[]; stepsInYear: string[] }
> = {
  health_expenses: {
    title: "Claim health expenses",
    need: [
      "Receipts (keep 6 years, or use Revenue Receipts Tracker)",
      "Any insurance / HSE reimbursements already deducted",
      "Med 2 form for non-routine dental",
    ],
    stepsPrior: [
      "Sign in to myAccount on revenue.ie",
      "Open PAYE Services → Review your tax for the previous 4 years",
      "Request a Statement of Liability for the chosen year",
      "Choose Complete Income Tax Return",
      "On Tax Credits & Reliefs, open Health → Health expenses",
      "Enter net qualifying amounts and submit",
    ],
    stepsInYear: [
      "Sign in to myAccount",
      "PAYE Services → Manage your tax for the current year",
      "Add new credits → Health → Health expenses",
      "Or use Receipts Tracker + Real Time Credits with a clear receipt image",
      "Submit — relief may adjust credits / give a partial refund in-year",
    ],
  },
  nursing_home: {
    title: "Claim nursing home fees",
    need: ["Approved nursing home invoices", "Net amount after any reimbursements"],
    stepsPrior: [
      "myAccount → Review your tax for the previous 4 years",
      "Complete the Income Tax Return for that year",
      "Add nursing home expenses under Health-related reliefs",
      "Submit and wait for your Statement of Liability",
    ],
    stepsInYear: [
      "myAccount → Manage your tax for the current year / Real Time Credits",
      "Add nursing home expenses with receipt images where required",
      "Submit and check updated credits",
    ],
  },
  rent_tax_credit: {
    title: "Claim the rent tax credit",
    need: [
      "Total rent paid (exclude utilities, board, laundry)",
      "Landlord / tenancy details as requested on the form",
    ],
    stepsPrior: [
      "myAccount → Review your tax for the previous 4 years",
      "Complete Income Tax Return",
      "Find Rent Tax Credit under credits / land & property style sections",
      "Enter qualifying rent and submit",
    ],
    stepsInYear: [
      "myAccount → Manage your tax for the current year",
      "Add new credits → Rent Tax Credit",
      "Enter details and submit",
    ],
  },
  remote_working: {
    title: "Claim remote working relief",
    need: [
      "Electricity + heating + broadband totals for the year",
      "Count of remote workdays (not weekends/leave you weren’t working)",
      "Any employer remote-working allowance",
    ],
    stepsPrior: [
      "myAccount → prior-year Income Tax Return",
      "Add remote working / e-working expenses",
      "Use Revenue’s formula: ((bills × days) ÷ 365 − employer pay) × 30%",
      "Submit with your return",
    ],
    stepsInYear: [
      "Prefer end-of-year return for a clean annual calculation",
      "Keep utility bills and a simple day log ready",
      "Claim via Income Tax Return when the year closes (or follow current-year credit path if offered)",
    ],
  },
  flat_rate_expense: {
    title: "Claim flat-rate expenses",
    need: ["Your occupation title", "Confirm amount on Revenue’s FRE list"],
    stepsPrior: [
      "Check Revenue’s Flat Rate Expenses PDF for your job",
      "myAccount → prior-year return → expenses / FRE",
      "Enter the published amount (no receipts usually needed for FRE)",
    ],
    stepsInYear: [
      "Ask your employer / payroll if FRE is already on your tax credit certificate",
      "If missing, add via myAccount credits / return paths",
    ],
  },
  mortgage_interest_credit: {
    title: "Mortgage interest tax credit",
    need: ["Interest statements", "Confirm you meet the qualifying conditions"],
    stepsPrior: [
      "Read Revenue’s mortgage interest tax credit conditions carefully",
      "Claim on the prior-year Income Tax Return if eligible",
    ],
    stepsInYear: [
      "Check current-year credit options in myAccount",
      "Only claim if you clearly meet the published conditions",
    ],
  },
  tuition_fees: {
    title: "Tuition fees relief",
    need: ["Course approval status", "Fees paid net of grants"],
    stepsPrior: [
      "Confirm the course qualifies",
      "Claim on the Income Tax Return for the year fees were paid",
    ],
    stepsInYear: ["Use Manage your tax / return paths when available for the year"],
  },
  home_carer_credit: {
    title: "Home carer tax credit",
    need: ["Carer’s income for the year", "Joint assessment usually required"],
    stepsPrior: [
      "myAccount → prior-year return → Home Carer Tax Credit",
      "Enter carer income — credit may taper",
    ],
    stepsInYear: ["Add via Manage your tax / credits if not already on your cert"],
  },
  age_credit: {
    title: "Age tax credit",
    need: ["Confirm age 65+ in the tax year"],
    stepsPrior: ["Usually on your record — verify on the return / tax credit cert"],
    stepsInYear: ["Check Manage your tax → tax credits include Age Credit"],
  },
  incapacitated_child_credit: {
    title: "Incapacitated child credit",
    need: ["Qualifying child details"],
    stepsPrior: ["Claim / confirm on the prior-year return"],
    stepsInYear: ["Confirm on current-year tax credits"],
  },
  dependent_relative_credit: {
    title: "Dependent relative credit",
    need: ["Relative’s income vs Revenue limit"],
    stepsPrior: ["Claim on prior-year return if the income limit is met"],
    stepsInYear: ["Add or confirm via myAccount credits"],
  },
};
