export type FieldHelp = {
  id: string;
  title: string;
  summary: string;
  includes?: string[];
  excludes?: string[];
  where: string[];
  tip?: string;
};

export type EstimateFieldId =
  | "grossPay"
  | "taxPaid"
  | "weeksIdle"
  | "rentPaidYear"
  | "healthNetPaid"
  | "nursingHomeNetPaid"
  | "utilityBillsYear"
  | "remoteDays"
  | "employerWfhPay"
  | "freOccupation"
  | "freAmount"
  | "mortgageInterestPaid"
  | "homeCarerIncome"
  | "incapChildCount"
  | "depRelativeCount"
  | "rememberAmounts";

export const ESTIMATE_FIELD_HELP: Record<EstimateFieldId, FieldHelp> = {
  grossPay: {
    id: "grossPay",
    title: "Gross pay / pension for the year",
    summary:
      "This is your total taxable employment or occupational pension income for the calendar tax year before income tax is taken off. Socair uses it to guess whether you’re a 20% or 40% taxpayer and to sketch a simplified year-end position.",
    includes: [
      "Gross pay from Employment Detail Summary / P60-style totals",
      "Taxable occupational pension paid through PAYE",
      "Usually the “gross” figure before income tax",
    ],
    excludes: [
      "Do not subtract income tax, USC, or PRSI yourself here — enter gross",
      "Don’t use take-home (net) pay",
      "Don’t enter one month’s salary — we need the annual / year-to-date total for the tax year",
      "Non-PAYE trading profits belong on Form 11 (out of scope for this MVP)",
    ],
    where: [
      "myAccount → PAYE Services → Employment Detail Summary (best — shows the year total)",
      "End-of-year statement / P60 from your employer if you still have one",
      "Final payslip of the year: use the cumulative/YTD gross — not that month’s pay alone",
    ],
    tip: "If you had two jobs, add both employments’ full-year gross figures. Monthly × 12 is only a rough fallback.",
  },
  taxPaid: {
    id: "taxPaid",
    title: "Income tax already paid (full year)",
    summary:
      "This means the Income Tax deducted under PAYE for the whole tax year — the income-tax line only — not your full set of payroll deductions, and not one month’s PAYE. Socair compares this to a simplified income-tax sketch to hint at a possible refund or underpayment.",
    includes: [
      "Income Tax (PAYE) deducted for the full year",
      "The income-tax total on Employment Detail Summary / P60",
    ],
    excludes: [
      "A single month’s tax deduction from one payslip",
      "USC (Universal Social Charge) — separate charge; do not add it here",
      "PRSI — social insurance, not income tax",
      "Pension contributions deducted from pay",
      "Health insurance, union fees, parking, or other voluntary deductions",
      "Local Property Tax",
    ],
    where: [
      "myAccount → Employment Detail Summary → Income Tax for the year (not USC/PRSI)",
      "P60 / employer year-end certificate: Income Tax column",
      "Payslips: use the cumulative/YTD “PAYE” or “Tax” total at year end — not that month only",
    ],
    tip: "If you only remember take-home pay, don’t guess this field — leave it blank. The “extra relief value” still works without it.",
  },
  weeksIdle: {
    id: "weeksIdle",
    title: "Weeks with little or no pay",
    summary:
      "A rough count of weeks where you had little or no taxable pay (between jobs, unpaid leave, etc.). In this version it mainly informs your situation; it doesn’t fully re-simulate payroll.",
    includes: ["Unpaid weeks between employments", "Unpaid leave stretches"],
    excludes: ["Paid annual leave", "Sick leave that was still paid by the employer"],
    where: [
      "Diary / calendar",
      "Gaps between employment dates on Employment Detail Summary",
    ],
  },
  rentPaidYear: {
    id: "rentPaidYear",
    title: "Qualifying rent paid (full year)",
    summary:
      "Total rent you paid across the whole tax year for a qualifying private tenancy — not one month’s rent. The Rent Tax Credit is based on this annual figure (about 20%, with a cap).",
    includes: ["Core rent for the dwelling for all months you rented in that year"],
    excludes: [
      "A single month’s rent on its own",
      "Electricity, gas, bin charges, broadband",
      "Meals, laundry, cleaning packages",
      "Deposits that were returned",
    ],
    where: [
      "Lease / rent book — add months in the tax year",
      "Bank standing orders labelled rent (sum for the year)",
      "Landlord or agent annual statement",
    ],
    tip: "If rent is shared, only enter what you personally paid for the year. Monthly rent × months lived there is fine.",
  },
  healthNetPaid: {
    id: "healthNetPaid",
    title: "Net health expenses (full year)",
    summary:
      "What you paid for qualifying health care over the whole tax year after subtracting anything you got back from insurers or the HSE. Relief is generally 20% of this net annual amount.",
    includes: [
      "GP and consultant fees you paid that year",
      "Hospital bills you paid that year",
      "Prescribed medicines you paid for that year",
      "Other qualifying expenses on Revenue’s health expenses list",
    ],
    excludes: [
      "Amounts reimbursed by VHI / Laya / Irish Life Health / etc.",
      "Health insurance premiums (relief is usually already in the premium)",
      "Routine dental that doesn’t qualify (see Med 2 / non-routine)",
    ],
    where: [
      "Receipts folder / phone photos for the tax year",
      "Insurer claims statements (to subtract refunds)",
      "Revenue Receipts Tracker in myAccount if you uploaded them",
    ],
  },
  nursingHomeNetPaid: {
    id: "nursingHomeNetPaid",
    title: "Net nursing home fees (full year)",
    summary:
      "What you paid to an approved nursing home over the tax year after supports/reimbursements — the annual total, not one month. Relief can be at your highest tax rate.",
    includes: ["Qualifying nursing home maintenance/treatment fees you paid that year"],
    excludes: ["Amounts covered by Fair Deal / other state support already paid for you"],
    where: ["Nursing home invoices for the year", "Care-support statements showing your contribution"],
  },
  utilityBillsYear: {
    id: "utilityBillsYear",
    title: "Electricity + heating + broadband (full year)",
    summary:
      "Add up those three household bills for the whole calendar tax year (your share if shared) — not a typical monthly bill. Used in Revenue’s remote-working formula.",
    includes: ["Electricity", "Heating fuels / gas / oil as applicable", "Broadband"],
    excludes: [
      "One month’s bill on its own",
      "Phone handset instalments",
      "TV packages that aren’t broadband",
      "Water charges",
    ],
    where: [
      "Annual online statements from suppliers (best)",
      "Otherwise add all monthly bills for the tax year",
    ],
    tip: "If bills are shared, enter only your share of the annual total.",
  },
  remoteDays: {
    id: "remoteDays",
    title: "Remote working days (full year)",
    summary:
      "Number of days in the whole tax year you worked from home as a remote worker — not days per week or per month.",
    includes: ["Scheduled WFH weekdays you actually worked from home that year"],
    excludes: [
      "A weekly pattern figure (e.g. “3”) without multiplying across the year",
      "Weekends and public holidays you weren’t working",
      "Annual leave",
      "Evenings bringing work home after office days",
    ],
    where: [
      "Work calendar / hybrid policy logs for the year",
      "Manager-approved WFH pattern × weeks worked in the tax year",
    ],
  },
  employerWfhPay: {
    id: "employerWfhPay",
    title: "Employer remote-working allowance (full year)",
    summary:
      "Cash your employer already paid you specifically toward remote working / e-working costs over the tax year. Revenue’s formula subtracts this so you don’t double count.",
    includes: ["Stated remote-working or e-working allowance totals for the year"],
    excludes: [
      "One month’s allowance on its own",
      "Normal salary",
      "General expenses claims unrelated to home utilities",
    ],
    where: [
      "Payslip YTD / year totals for the allowance line",
      "HR expenses policy / expense reports for the year",
    ],
    tip: "If your employer paid nothing extra for WFH, enter 0.",
  },
  freOccupation: {
    id: "freOccupation",
    title: "Flat-rate expense occupation",
    summary:
      "Pick the closest occupation from Revenue’s flat-rate expenses list. This fills a typical amount you can edit.",
    where: [
      "Revenue Flat Rate Expenses PDF / online list — match your job title carefully",
      "Your tax credit certificate may already show an FRE",
    ],
  },
  freAmount: {
    id: "freAmount",
    title: "Flat-rate expense amount",
    summary:
      "The euro amount from Revenue’s FRE list for your role (or the amount already on your tax credit cert).",
    where: ["Revenue FRE list", "myAccount tax credit certificate"],
    tip: "If payroll already gives you the FRE, claiming again may double-count — check your cert first.",
  },
  mortgageInterestPaid: {
    id: "mortgageInterestPaid",
    title: "Qualifying mortgage interest (full year)",
    summary:
      "Interest element of mortgage payments for the whole tax year that may qualify for the Mortgage Interest Tax Credit — only if you meet Revenue’s conditions. Use the lender’s annual interest figure, not one month’s repayment.",
    includes: ["Interest portion on a qualifying mortgage for the year"],
    excludes: [
      "One month’s mortgage repayment",
      "Capital/principal repayments",
      "Protection insurance premiums",
    ],
    where: ["Lender’s annual interest statement", "Revenue Mortgage Interest Tax Credit page"],
  },
  homeCarerIncome: {
    id: "homeCarerIncome",
    title: "Home carer’s income (full year)",
    summary:
      "Income of the partner who is caring at home for the whole tax year. Higher annual income reduces (tapers) the Home Carer Tax Credit.",
    where: [
      "Carer’s Employment Detail Summary / year totals — not one month’s pay",
      "Revenue Home Carer Tax Credit page for thresholds",
    ],
  },
  incapChildCount: {
    id: "incapChildCount",
    title: "Qualifying incapacitated children",
    summary: "How many children meet Revenue’s incapacitated child definition for the credit.",
    where: ["Your tax credit certificate", "Revenue Incapacitated Child Tax Credit guidance"],
  },
  depRelativeCount: {
    id: "depRelativeCount",
    title: "Dependent relatives",
    summary:
      "How many relatives you maintain who meet the dependency and income-limit tests.",
    where: ["Revenue Dependent Relative Tax Credit page (income limit)", "Your records of support provided"],
  },
  rememberAmounts: {
    id: "rememberAmounts",
    title: "Remember figures on this device",
    summary:
      "Off (default): amounts stay in temporary session storage and disappear when you close the tab/browser session. On: saved in this browser until you clear Socair’s data.",
    where: ["Privacy page → Clear all local data"],
  },
};
