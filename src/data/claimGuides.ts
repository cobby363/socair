import type { ReliefId } from "../lib/types";

export type ClaimStep = {
  title: string;
  detail: string;
  /** What screenshot to capture for this step (for you to add later). */
  screenshotHint?: string;
};

export type ClaimGuideDef = {
  title: string;
  overview: string;
  eligibility: string[];
  need: string[];
  tips: string[];
  stepsPrior: ClaimStep[];
  stepsInYear: ClaimStep[];
  officialPath: string;
};

export const CLAIM_GUIDES: Record<ReliefId, ClaimGuideDef> = {
  health_expenses: {
    title: "Claim health expenses",
    overview:
      "You can claim income-tax relief on qualifying medical expenses you paid and were not reimbursed for. Relief is generally at the standard rate (20%) of the net amount. Non-routine dental usually needs a Med 2 form. Keep records for six years.",
    eligibility: [
      "You (or a dependent) incurred qualifying medical costs in the tax year",
      "You have subtracted any health-insurance / HSE reclaim",
      "Routine dental often does not qualify — non-routine may, with Med 2",
    ],
    need: [
      "Receipts or invoices for GP, hospital, consultant, prescribed medicines, etc.",
      "Insurer / HSE statements so you can subtract refunds",
      "Med 2 for non-routine dental (if claiming dental)",
      "Optional: Revenue Receipts Tracker uploads",
    ],
    tips: [
      "Enter the net figure after reimbursements — not the gross bill.",
      "Nursing-home fees are a separate relief (often at your highest rate).",
      "Health insurance premiums usually already carry relief at source — don’t double-count them here.",
    ],
    stepsPrior: [
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
        screenshotHint: "myAccount sign-in / home screen after login",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
        screenshotHint: "myAccount home with PAYE Services card highlighted",
      },
      {
        title: "Review your tax for previous years",
        detail:
          "Choose “Review your tax for the previous 4 years” (wording can vary slightly). Pick the tax year you selected in Socair.",
        screenshotHint: "List of prior years / Review your tax screen",
      },
      {
        title: "Request or open the Statement of Liability path",
        detail:
          "Start or continue the Income Tax Return / Statement of Liability process for that year. You are updating credits and reliefs, not rewriting your whole life story.",
        screenshotHint: "Statement of Liability / Complete Income Tax Return option",
      },
      {
        title: "Find Health expenses",
        detail:
          "In Tax Credits & Reliefs (or similar), open Health → Health expenses. Enter net qualifying amounts for the year. Attach or keep Med 2 / receipts as required.",
        screenshotHint: "Health expenses entry screen with amount fields",
      },
      {
        title: "Submit and check the result",
        detail:
          "Submit the return. When Revenue issues/updates the Statement of Liability, check the health-expenses line and any refund or balancing payment.",
        screenshotHint: "Confirmation / Statement of Liability summary showing health relief",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail: "myAccount → PAYE Services for the current tax year.",
        screenshotHint: "PAYE Services current-year hub",
      },
      {
        title: "Manage your tax / add credits",
        detail:
          "Open Manage your tax for the current year (or Real Time Credits). Look for Add new credits / Health expenses.",
        screenshotHint: "Manage your tax → Add credits menu",
      },
      {
        title: "Enter health expenses (or use Receipts Tracker)",
        detail:
          "Enter net qualifying spend, or upload clear receipt images via Receipts Tracker if that path is offered. Non-routine dental still needs Med 2 rules.",
        screenshotHint: "Health expenses form or Receipts Tracker upload",
      },
      {
        title: "Submit and watch your credits / refund",
        detail:
          "After submit, credits may update in-year and you may get a partial refund through payroll or a Revenue payment. Keep your paperwork.",
        screenshotHint: "Updated tax credit certificate or refund notice",
      },
    ],
    officialPath: "revenue.ie → Personal → Tax credits & reliefs → Health expenses",
  },

  nursing_home: {
    title: "Claim nursing home fees",
    overview:
      "Qualifying fees paid to an approved nursing home can attract relief, often at your highest rate of income tax (unlike many other health expenses at 20%). Claim only the amount you paid after state supports / reimbursements.",
    eligibility: [
      "Fees were paid to an approved nursing home",
      "You paid (or are claiming for) the net private contribution",
      "Fair Deal / other supports already covering fees are not claimed again",
    ],
    need: [
      "Nursing home invoices for the tax year",
      "Statements showing your contribution vs state support",
      "Details of any insurance reclaim",
    ],
    tips: [
      "This is separate from ordinary health expenses — use the nursing-home path if offered.",
      "Relief value depends heavily on whether you are a 20% or 40% taxpayer.",
    ],
    stepsPrior: [
      {
        title: "Sign in → PAYE Services → prior year",
        detail:
          "Open Review your tax for the previous 4 years and select the year. Start/continue the Income Tax Return.",
        screenshotHint: "Prior-year review year picker",
      },
      {
        title: "Add nursing home expenses",
        detail:
          "Under Health-related reliefs, find nursing home / dependent relative medical care style entries (labels vary). Enter the net fees you paid.",
        screenshotHint: "Nursing home expense field on the return",
      },
      {
        title: "Submit and review Statement of Liability",
        detail:
          "Submit, then check the Statement of Liability for the nursing-home relief and any refund.",
        screenshotHint: "SoL line for nursing home relief",
      },
    ],
    stepsInYear: [
      {
        title: "Manage your tax / Real Time Credits",
        detail:
          "myAccount → current year → add nursing home expenses with invoices where required.",
        screenshotHint: "Current-year nursing home claim screen",
      },
      {
        title: "Submit and confirm updated credits",
        detail: "Check your tax credit certificate or refund notice after processing.",
        screenshotHint: "Updated credits confirmation",
      },
    ],
    officialPath: "revenue.ie → Health expenses / nursing home guidance",
  },

  rent_tax_credit: {
    title: "Claim the rent tax credit",
    overview:
      "If you paid qualifying private rent, you may get a Rent Tax Credit (roughly 20% of rent, with annual caps that depend on status and year). Available for tax years 2022–2028. Do not include utilities, meals, or laundry in the rent figure.",
    eligibility: [
      "Private residential tenancy (not typical local-authority / social-only setups)",
      "You meet Revenue’s relationship / RTB / use-of-property conditions",
      "You have income tax to use the credit against",
    ],
    need: [
      "Total qualifying rent paid in the calendar tax year",
      "Landlord / agent name and address (and tax reference if you have it)",
      "Property address / Eircode and tenancy details as requested",
    ],
    tips: [
      "Shared rent: only claim what you personally paid.",
      "Caps differ by year (lower in 2022–2023; higher from 2024 in current rules).",
      "If landlord is a relative, check Revenue carefully — many cases are excluded.",
    ],
    stepsPrior: [
      {
        title: "Open the prior-year Income Tax Return",
        detail:
          "myAccount → PAYE Services → Review previous years → Complete Income Tax Return for the chosen year.",
        screenshotHint: "Prior-year return start screen",
      },
      {
        title: "Locate Rent Tax Credit",
        detail:
          "In credits / land & property style sections, open Rent Tax Credit. Enter rent and tenancy details Revenue asks for.",
        screenshotHint: "Rent Tax Credit form fields",
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit the return. Check the Statement of Liability for the rent credit amount.",
        screenshotHint: "SoL showing Rent Tax Credit",
      },
    ],
    stepsInYear: [
      {
        title: "Manage your tax for the current year",
        detail: "PAYE Services → Manage your tax → Add new credits → Rent Tax Credit.",
        screenshotHint: "Add Rent Tax Credit in current year",
      },
      {
        title: "Enter rent and tenancy details",
        detail:
          "Use annual rent (or year-to-date as instructed), exclude extras, and complete landlord/property fields.",
        screenshotHint: "Completed rent credit form before submit",
      },
      {
        title: "Submit",
        detail: "Submit and check updated credits / any in-year refund.",
        screenshotHint: "Confirmation screen",
      },
    ],
    officialPath: "revenue.ie → Rent Tax Credit",
  },

  remote_working: {
    title: "Claim remote working relief",
    overview:
      "Remote Working Relief (sometimes called e-working) lets you claim income-tax relief on a portion of electricity, heating and broadband for days you worked from home. The current statutory formula applies from tax year 2022: allowable cost = ((bills × remote days) ÷ days in year − employer allowance) × 30%. Tax relief is then at your marginal rate. Socair only shows this for years 2022 onwards.",
    eligibility: [
      "You performed duties of your employment from your home on some workdays",
      "You paid electricity / heating / broadband for that home",
      "You subtract any employer remote-working / e-working cash allowance",
    ],
    need: [
      "Annual totals for electricity + heating + broadband (your share if shared)",
      "Count of remote working days in the tax year (not weekends/leave)",
      "Employer remote-working allowance total for the year (or €0)",
      "Utility statements or a simple spreadsheet adding the bills",
    ],
    tips: [
      "Days = actual remote workdays, not “I sometimes check email at home.”",
      "If your employer already paid a tax-free e-working amount, deduct it (D in the formula).",
      "End-of-year claim with full annual bills is usually cleaner than guessing mid-year.",
    ],
    stepsPrior: [
      {
        title: "Gather bills and day count",
        detail:
          "Add electricity + heating + broadband for the calendar year. Count remote workdays. Note any employer WFH allowance from payslips.",
        screenshotHint: "Optional: your own spreadsheet totals (not Revenue)",
      },
      {
        title: "Open the prior-year return",
        detail:
          "myAccount → Review your tax for previous years → Income Tax Return for that year.",
        screenshotHint: "Prior-year return hub",
      },
      {
        title: "Enter remote working / e-working expenses",
        detail:
          "Find Remote working relief / e-working expenses. Enter bills, days, and employer amounts as the form requests. Revenue applies the statutory formula.",
        screenshotHint: "Remote working expense fields (bills, days, employer)",
      },
      {
        title: "Submit and check Statement of Liability",
        detail:
          "Submit. On the Statement of Liability, confirm remote-working relief appears and matches a sensible order of magnitude.",
        screenshotHint: "SoL remote working line",
      },
    ],
    stepsInYear: [
      {
        title: "Prefer a clean annual claim where possible",
        detail:
          "Keep bills and a day log through the year. Many people claim once the year closes via the Income Tax Return for a full annual calculation.",
        screenshotHint: "Current-year remote working option if shown",
      },
      {
        title: "If an in-year path is offered, complete it carefully",
        detail:
          "Follow Manage your tax / expenses prompts. Mid-year figures may need updating when the year ends.",
        screenshotHint: "In-year remote working claim screen",
      },
      {
        title: "Keep evidence",
        detail:
          "Store bills and your day count. Revenue can ask for particulars of the expenses.",
        screenshotHint: "N/A — your filing folder",
      },
    ],
    officialPath: "revenue.ie → Jobs and pensions → Tax treatment of e-working / Remote Working Relief",
  },

  flat_rate_expense: {
    title: "Claim flat-rate expenses",
    overview:
      "For many jobs, Revenue publishes a fixed yearly “flat-rate expense” (FRE) for uniforms, tools, etc. You usually don’t need individual receipts for the published amount. Check your tax credit certificate — payroll may already include it.",
    eligibility: [
      "Your occupation appears on Revenue’s Flat Rate Expenses list",
      "You haven’t already fully received the same FRE through payroll",
    ],
    need: [
      "Your job title as it appears on Revenue’s FRE list",
      "The published euro amount for that occupation",
      "Your tax credit certificate to see if FRE is already there",
    ],
    tips: [
      "Match the occupation carefully — similar titles can have different amounts.",
      "Claiming twice (payroll + return) can cause problems; verify first.",
    ],
    stepsPrior: [
      {
        title: "Check the FRE list and your tax credit cert",
        detail:
          "Download/open Revenue’s Flat Rate Expenses list. Compare with PAYE Services → Manage your tax / tax credit certificate.",
        screenshotHint: "Tax credit certificate showing expenses line",
      },
      {
        title: "Claim on the prior-year return if missing",
        detail:
          "On the Income Tax Return, enter the FRE under expenses / flat-rate expenses for your role.",
        screenshotHint: "FRE entry on the return",
      },
      {
        title: "Submit",
        detail: "Submit and confirm on the Statement of Liability.",
        screenshotHint: "SoL confirmation",
      },
    ],
    stepsInYear: [
      {
        title: "Ask payroll / check your certificate",
        detail:
          "If FRE is missing from your current-year cert, add via Manage your tax / credits paths if available.",
        screenshotHint: "Current-year FRE / expenses add screen",
      },
      {
        title: "Confirm the amount matches Revenue’s list",
        detail: "Don’t invent an amount — use the published figure for your occupation.",
        screenshotHint: "Amount confirmation",
      },
    ],
    officialPath: "revenue.ie → Flat Rate Expenses",
  },

  mortgage_interest_credit: {
    title: "Mortgage interest tax credit",
    overview:
      "A condition-heavy credit linked to qualifying mortgage interest. Only claim if you clearly meet Revenue’s published rules for the year — Socair does not verify eligibility.",
    eligibility: [
      "You paid interest on a qualifying mortgage",
      "You meet all Revenue conditions for the Mortgage Interest Tax Credit that year",
    ],
    need: [
      "Lender annual interest statement (interest only, not full repayment)",
      "Evidence you meet the credit’s qualifying conditions",
    ],
    tips: [
      "Read Revenue’s page before entering figures — wrong claims cause hassle.",
      "Capital/principal repayments are not interest.",
    ],
    stepsPrior: [
      {
        title: "Confirm eligibility on revenue.ie",
        detail: "Read the Mortgage Interest Tax Credit conditions for your year end-to-end.",
        screenshotHint: "Revenue guidance page (browser)",
      },
      {
        title: "Claim on the prior-year return if eligible",
        detail: "Enter qualifying interest on the Income Tax Return credit section.",
        screenshotHint: "Mortgage interest credit fields",
      },
      {
        title: "Submit",
        detail: "Check Statement of Liability after submit.",
        screenshotHint: "SoL credit line",
      },
    ],
    stepsInYear: [
      {
        title: "Check current-year credit options",
        detail: "Only proceed if myAccount offers the credit and you meet the rules.",
        screenshotHint: "Current-year mortgage credit option",
      },
      {
        title: "Enter interest from the lender statement",
        detail: "Use the interest figure, not the full monthly repayment.",
        screenshotHint: "Interest amount entry",
      },
    ],
    officialPath: "revenue.ie → Mortgage Interest Tax Credit",
  },

  tuition_fees: {
    title: "Tuition fees relief",
    overview:
      "Relief may apply to qualifying fees for approved courses, after grants. Socair shows a guide only in this version — confirm course approval on Revenue before claiming.",
    eligibility: [
      "Course is on Revenue’s approved list / meets the rules",
      "Fees were paid in the tax year (net of grants)",
    ],
    need: [
      "Course name and college/provider",
      "Fees paid and grant amounts",
      "Confirmation the course qualifies",
    ],
    tips: [
      "Not every course qualifies — check first.",
      "Keep fee receipts and grant award letters.",
    ],
    stepsPrior: [
      {
        title: "Confirm the course qualifies",
        detail: "Check Revenue’s tuition fees relief guidance / approved courses.",
        screenshotHint: "Revenue tuition guidance",
      },
      {
        title: "Claim on the Income Tax Return",
        detail: "Enter net qualifying fees for the year paid.",
        screenshotHint: "Tuition fees fields on return",
      },
      {
        title: "Submit",
        detail: "Review Statement of Liability.",
        screenshotHint: "SoL tuition line",
      },
    ],
    stepsInYear: [
      {
        title: "Use Manage your tax / return paths when available",
        detail: "Follow current-year prompts if offered; otherwise claim when filing the year.",
        screenshotHint: "Current-year tuition option if present",
      },
    ],
    officialPath: "revenue.ie → Tuition fees relief",
  },

  home_carer_credit: {
    title: "Home carer tax credit",
    overview:
      "For jointly assessed couples where one partner cares at home and has limited income. The credit can taper as the carer’s income rises.",
    eligibility: [
      "Usually jointly assessed married / civil partners",
      "One partner cares for a dependent person at home",
      "Carer’s income is within Revenue’s thresholds (taper applies)",
    ],
    need: [
      "Carer’s annual income figure",
      "Confirmation of joint assessment / caring situation",
    ],
    tips: [
      "Enter the carer’s income carefully — it drives the taper.",
      "If already on your tax credit cert, verify rather than double-claiming.",
    ],
    stepsPrior: [
      {
        title: "Open prior-year return",
        detail: "Find Home Carer Tax Credit under credits.",
        screenshotHint: "Home carer credit section",
      },
      {
        title: "Enter carer income",
        detail: "Complete the income fields; Revenue calculates / applies taper rules.",
        screenshotHint: "Carer income field",
      },
      {
        title: "Submit",
        detail: "Check Statement of Liability.",
        screenshotHint: "SoL home carer credit",
      },
    ],
    stepsInYear: [
      {
        title: "Check Manage your tax / tax credits",
        detail: "Add or confirm Home Carer Credit if not already on your certificate.",
        screenshotHint: "Current-year home carer credit",
      },
    ],
    officialPath: "revenue.ie → Home Carer Tax Credit",
  },

  age_credit: {
    title: "Age tax credit",
    overview:
      "If you (or, where relevant, your spouse/civil partner) were 65 or over in the tax year, an Age Tax Credit may apply on top of the personal credit.",
    eligibility: [
      "You or your jointly assessed partner turned 65+ in the tax year (or already were)",
    ],
    need: ["Confirmation of age / date of birth on Revenue’s record"],
    tips: [
      "Often already on your tax credit certificate — verify before chasing a claim.",
      "Amounts differ for single vs married/civil partner cases.",
    ],
    stepsPrior: [
      {
        title: "Check your tax credit certificate / return",
        detail: "Confirm Age Credit is present. If missing, add/correct on the prior-year return.",
        screenshotHint: "Tax credit cert with Age Credit",
      },
      {
        title: "Submit any correction",
        detail: "File the return update and review Statement of Liability.",
        screenshotHint: "SoL age credit",
      },
    ],
    stepsInYear: [
      {
        title: "Check Manage your tax → tax credits",
        detail: "Ensure Age Credit appears for the current year.",
        screenshotHint: "Current-year credits list",
      },
    ],
    officialPath: "revenue.ie → Age Tax Credit",
  },

  incapacitated_child_credit: {
    title: "Incapacitated child credit",
    overview:
      "A tax credit may apply if you maintain a child who meets Revenue’s incapacitated child definition. Rules are specific — confirm on Revenue before claiming.",
    eligibility: [
      "Child meets Revenue’s incapacitated child criteria",
      "You are entitled to claim for that child for the year",
    ],
    need: ["Qualifying child details", "Any supporting medical / Revenue documentation as required"],
    tips: ["One credit per qualifying child in typical cases — confirm current amounts on Revenue."],
    stepsPrior: [
      {
        title: "Confirm eligibility",
        detail: "Read Revenue’s Incapacitated Child Tax Credit page.",
        screenshotHint: "Revenue guidance page",
      },
      {
        title: "Claim / confirm on the prior-year return",
        detail: "Enter the number of qualifying children as required.",
        screenshotHint: "Incapacitated child credit fields",
      },
      {
        title: "Submit",
        detail: "Check Statement of Liability.",
        screenshotHint: "SoL credit line",
      },
    ],
    stepsInYear: [
      {
        title: "Confirm on current-year tax credits",
        detail: "Add via Manage your tax if missing from your certificate.",
        screenshotHint: "Current-year credit confirmation",
      },
    ],
    officialPath: "revenue.ie → Incapacitated Child Tax Credit",
  },

  dependent_relative_credit: {
    title: "Dependent relative credit",
    overview:
      "A smaller credit if you maintain a relative who meets dependency tests and whose income is under Revenue’s limit for the year.",
    eligibility: [
      "You maintain the relative",
      "Relative’s income is under the published limit",
    ],
    need: [
      "Relative’s approximate income vs Revenue limit",
      "Evidence of maintenance/support if asked",
    ],
    tips: [
      "Check the income limit every year — it can change.",
      "Different from Home Carer and Incapacitated Child credits.",
    ],
    stepsPrior: [
      {
        title: "Check the income limit on Revenue",
        detail: "If the relative’s income is over the limit, stop — the credit won’t apply.",
        screenshotHint: "Revenue dependent relative page with limit",
      },
      {
        title: "Claim on the prior-year return",
        detail: "Enter the number of qualifying dependent relatives.",
        screenshotHint: "Dependent relative credit fields",
      },
      {
        title: "Submit",
        detail: "Confirm on Statement of Liability.",
        screenshotHint: "SoL credit line",
      },
    ],
    stepsInYear: [
      {
        title: "Add or confirm via myAccount credits",
        detail: "Use Manage your tax if the credit is missing.",
        screenshotHint: "Current-year dependent relative credit",
      },
    ],
    officialPath: "revenue.ie → Dependent Relative Tax Credit",
  },
};

/** Shared screenshots useful across almost every PAYE claim guide. */
export const SHARED_SCREENSHOT_CHECKLIST = [
  "myAccount home after login (PAYE Services card visible)",
  "PAYE Services hub",
  "Review your tax for previous 4 years — year list",
  "Manage your tax for the current year hub",
  "Tax credit certificate sample (personal info blurred)",
  "Statement of Liability summary page (PPSN / address blurred)",
  "Submit / confirmation success screen",
];
