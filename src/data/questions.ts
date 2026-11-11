import type { ChecklistAnswers, PersonalStatus, ReliefId, TriState } from "../lib/types";

export type QuestionOption = {
  value: string;
  label: string;
};

export type HelpContent = {
  title: string;
  summary: string;
  bullets?: string[];
  where?: string;
  tip?: string;
};

export type QuestionDef = {
  id: keyof ChecklistAnswers;
  section: string;
  prompt: string;
  help: HelpContent;
  type: "choice";
  options: QuestionOption[];
  showIf?: (a: ChecklistAnswers) => boolean;
};

const yesNoUnsure: QuestionOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export const QUESTIONS: QuestionDef[] = [
  {
    id: "q_status",
    section: "About you",
    prompt: "What best describes you for this tax year?",
    help: {
      title: "Personal status / how you’re assessed",
      summary:
        "Revenue taxes people differently depending on whether you’re single, jointly assessed with a spouse/civil partner, or a lone parent. This choice mainly affects your standard-rate tax band and some credit maximums (for example rent credit caps).",
      bullets: [
        "Single: usual personal credit and single person’s standard-rate band.",
        "Married / civil partners — jointly assessed: you share a wider band and some credits as a couple. Most couples who file together pick this.",
        "Married / civil partners — separately assessed: each person is largely taxed like a single person. Only choose this if that’s how you’re set up with Revenue.",
        "Lone parent / Single Person Child Carer: a wider standard-rate band than single, if you qualify for that credit.",
        "Widowed / surviving civil partner: different personal credits can apply, especially in years after bereavement.",
      ],
      where:
        "In myAccount, check your tax credit certificate / “Manage your tax” personal circumstances. If you’re unsure how you’re assessed as a couple, check the “Married persons and civil partners” pages on revenue.ie or your last Statement of Liability.",
      tip: "If you’re not sure between jointly and separately assessed, look at last year’s return or tax credit cert — it usually states the basis.",
    },
    type: "choice",
    options: [
      { value: "single", label: "Single" },
      { value: "married_joint", label: "Married / civil partners — jointly assessed" },
      { value: "married_separate", label: "Married / civil partners — separately assessed" },
      { value: "lone_parent", label: "Single person child carer / lone parent" },
      { value: "widowed", label: "Widowed / surviving civil partner" },
    ],
  },
  {
    id: "q_age65",
    section: "About you",
    prompt: "Were you (or your spouse/partner) aged 65 or over during the year?",
    help: {
      title: "Age 65+ and the Age Tax Credit",
      summary:
        "If you (or, where relevant, your spouse/civil partner) were 65 or older at any time in the tax year, you may be due an Age Tax Credit on top of your normal personal credit.",
      bullets: [
        "It is a tax credit (reduces tax due), not a cash payment by itself.",
        "Amounts differ for single vs married/civil partner cases.",
        "Turning 65 mid-year still usually counts for that tax year.",
      ],
      where:
        "Often already on your tax credit certificate. Confirm under PAYE Services → Manage your tax / tax credits, or on your Statement of Liability.",
      tip: "Answer Yes if either you or your jointly assessed partner was 65+ in that year.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_paye",
    section: "About you",
    prompt: "Did you have PAYE employment or occupational pension income?",
    help: {
      title: "What PAYE means",
      summary:
        "PAYE (Pay As You Earn) is tax taken from wages, salaries, or many occupational pensions by an employer/pension payer and sent to Revenue. Socair is built for people in that system who use myAccount.",
      bullets: [
        "Yes: you got payslips with tax/USC/PRSI deducted, or a PAYE pension.",
        "No: you’re mainly self-employed / rental / other income filed on Form 11 via ROS — different process.",
        "Not sure: if you have an Employment Detail Summary or P60-style figures in myAccount, you’re usually PAYE.",
      ],
      where:
        "myAccount → PAYE Services → Documents / Employment Detail Summary. Your employer’s payslips also show PAYE deductions.",
      tip: "You can be PAYE from a job and still have a small side hustle — for this MVP, choose Yes if PAYE was your main setup.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_job_change",
    section: "Work",
    prompt: "Did you start, leave, or change jobs during the year?",
    help: {
      title: "Job changes and emergency / Week 1 tax",
      summary:
        "Starting or leaving a job mid-year is normal, but it often causes temporary over- or under-deduction of tax (emergency tax or Week 1 basis) until Revenue and payroll catch up.",
      bullets: [
        "A job change doesn’t create a special credit by itself.",
        "It does mean you should review the year in myAccount — refunds are common after emergency tax.",
        "Keep P45 / employment cessation details if you have them.",
      ],
      where:
        "Employment history appears in myAccount under PAYE Services. Employers issue P45 when you leave; new employers need your PPSN and often a tax credit cert.",
      tip: "If you were on emergency tax for a stretch, answering Yes here is a reminder to run the end-of-year review.",
    },
    type: "choice",
    options: yesNoUnsure,
    showIf: (a) => a.q_paye !== "no",
  },
  {
    id: "q_idle",
    section: "Work",
    prompt: "Were there weeks with little or no taxable pay (between jobs, unpaid leave, etc.)?",
    help: {
      title: "Gaps in pay during the year",
      summary:
        "Weeks without pay (between jobs, unpaid leave, some parental leave situations, etc.) change how much tax was taken versus how much should apply for the full year. Credits are annual — payroll may not “catch up” until a review.",
      bullets: [
        "Doesn’t automatically mean a refund — but it’s a common reason people are due one.",
        "Illness benefit / some DSP payments have special rules; we’re only flagging gaps for now.",
        "We’ll ask for a rough week count later if you run an estimate.",
      ],
      where:
        "Compare payslips across the year, or Employment Detail Summary employment periods in myAccount.",
      tip: "If you had a few unpaid weeks, Yes is fine even if you can’t remember the exact number yet.",
    },
    type: "choice",
    options: yesNoUnsure,
    showIf: (a) => a.q_paye !== "no",
  },
  {
    id: "q_second_job",
    section: "Work",
    prompt: "Did you have more than one employer at the same time?",
    help: {
      title: "Two jobs at once",
      summary:
        "If two employers pay you in the same period, tax credits and rate band are usually allocated to one “primary” employment. The second job may have tax taken at higher rates unless credits were split.",
      bullets: [
        "Doesn’t create a new relief by itself.",
        "Often leads to overpayment that a year-end review can fix.",
        "You can ask Revenue to split credits between employments.",
      ],
      where:
        "myAccount → Manage your tax / tax credit certificate shows how credits are allocated. Both jobs appear on Employment Detail Summary.",
      tip: "Weekend bar work + weekday office job is a classic example of Yes.",
    },
    type: "choice",
    options: yesNoUnsure,
    showIf: (a) => a.q_paye !== "no",
  },
  {
    id: "q_wfh",
    section: "Work",
    prompt: "Did you work from home as a remote worker on some workdays?",
    help: {
      title: "Remote working (e-working) relief",
      summary:
        "If you were required/agreed to work from home on some workdays, you may claim a portion of electricity, heating and broadband. Relief uses Revenue’s formula and is given at your highest income-tax rate.",
      bullets: [
        "Count only actual remote workdays — not weekends, annual leave, or evenings you chose to finish work at home.",
        "Bills must be ones you paid (apportion if shared house).",
        "Subtract any remote-working cash allowance your employer already paid you.",
        "Health insurance premiums are separate and usually already include tax relief at source.",
      ],
      where:
        "Keep utility bills for the calendar year. Claim via Income Tax Return / remote working expenses in myAccount. Revenue publishes the exact formula under jobs and pensions → e-working.",
      tip: "Hybrid workers (e.g. 2 days in office, 3 at home) usually answer Yes.",
    },
    type: "choice",
    options: yesNoUnsure,
    showIf: (a) => a.q_paye !== "no",
  },
  {
    id: "q_fre",
    section: "Work",
    prompt: "Might your job have a Revenue flat-rate expense (uniforms, tools, etc.)?",
    help: {
      title: "Flat-rate expenses (FRE)",
      summary:
        "For many occupations, Revenue publishes a fixed yearly expense amount (uniform, tools, equipment) you can claim without keeping every receipt. It’s deducted in arriving at taxable pay / claimed on your return.",
      bullets: [
        "Common for nurses, shop staff, trades, hospitality, some teachers — check the official list.",
        "If payroll already includes your FRE, you may already be getting it.",
        "If not on your tax credit cert, you can still claim on the year-end return.",
      ],
      where:
        "Search Revenue “Flat Rate Expenses” PDF/list for your job title. Compare with your tax credit certificate in myAccount.",
      tip: "Pick “Not sure — I’ll check” if your job sounds like it might qualify; we’ll still show the guide.",
    },
    type: "choice",
    options: [
      { value: "yes", label: "Yes / probably" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not sure — I’ll check" },
    ],
    showIf: (a) => a.q_paye !== "no",
  },
  {
    id: "q_rent",
    section: "Home & education",
    prompt: "Did you pay private rent on a home (or qualifying digs / course housing)?",
    help: {
      title: "Rent Tax Credit — did you pay rent?",
      summary:
        "If you paid rent for a private residential tenancy (your main home, or certain digs / student accommodation situations), you may get a Rent Tax Credit. It’s a credit against income tax, not a refund of rent from your landlord.",
      bullets: [
        "Usually for private landlord tenancies — social/local authority rents often don’t qualify the same way.",
        "Credit is broadly 20% of qualifying rent, capped (e.g. €1,000 single / €2,000 jointly assessed for recent years).",
        "Don’t include separately billed utilities, meals, or laundry in the “rent” figure later.",
      ],
      where:
        "Tenancy agreement / rent receipts / bank standing orders. Claim in myAccount under credits (Rent Tax Credit) on the Income Tax Return or current-year credits.",
      tip: "Living with parents rent-free = No. Paying a private landlord for your home = usually Yes.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_rent_landlord",
    section: "Home & education",
    prompt: "Was this private landlord rent (not local authority / approved housing body social rent)?",
    help: {
      title: "Private vs social rent",
      summary:
        "The Rent Tax Credit is aimed at private rented accommodation. Rent paid to a local authority or many Approved Housing Body / social housing arrangements is treated differently and often won’t qualify for this credit.",
      bullets: [
        "Private landlord or private letting agent → usually Yes.",
        "Council / HAP structures / some AHB tenancies → often No for this specific credit (rules are specific — check Revenue if unsure).",
        "If unsure, keep your tenancy paperwork and read Revenue’s Rent Tax Credit page before claiming.",
      ],
      where: "Your lease or rent statement names the landlord. Revenue’s Rent Tax Credit pages list qualifying situations.",
      tip: "When in doubt, choose Not sure — we’ll still show the guide so you can verify before claiming.",
    },
    type: "choice",
    options: [
      { value: "yes", label: "Yes — private landlord" },
      { value: "no", label: "No — social / other" },
      { value: "unsure", label: "Not sure" },
    ],
    showIf: (a) => a.q_rent === "yes" || a.q_rent === "unsure",
  },
  {
    id: "q_tuition",
    section: "Home & education",
    prompt: "Did you pay qualifying tuition fees for an approved course?",
    help: {
      title: "Tuition fees relief",
      summary:
        "Tax relief can apply to qualifying fees for approved third-level / certain training courses, subject to Revenue’s lists and thresholds. Grants or employer-paid fees usually don’t count as your claimable amount.",
      bullets: [
        "Course generally needs to be on Revenue’s approved list / qualifying institution.",
        "Relief has its own calculation rules (not the same as medical 20%).",
        "This version emphasises the claim guide more than a full calculator.",
      ],
      where:
        "Fee receipts from the college/provider; Revenue tuition fees relief pages list qualifying courses and how to claim on your return.",
      tip: "Evening / part-time approved courses can qualify even if you also work full-time.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_mortgage_interest",
    section: "Home & education",
    prompt: "Did you pay mortgage interest that might qualify for the mortgage interest tax credit?",
    help: {
      title: "Mortgage interest tax credit",
      summary:
        "In recent tax years Ireland has had a Mortgage Interest Tax Credit with specific eligibility rules (property, mortgage type, dates, caps). It is easy to get wrong — treat this as a “check carefully” item, not an automatic Yes.",
      bullets: [
        "Only interest (not capital repayments) can be relevant.",
        "There is a maximum credit in the tax charts.",
        "Many mortgages / situations won’t qualify — read Revenue’s conditions.",
      ],
      where:
        "Annual mortgage interest statement from your lender. Revenue’s Mortgage Interest Tax Credit page for eligibility. Claim via Income Tax Return / credits if you qualify.",
      tip: "If you only suspect you might qualify, choose Not sure and use the guide before entering numbers.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_medical",
    section: "Health",
    prompt:
      "Did you pay doctor, hospital, prescription or other qualifying health costs not fully refunded by insurance or the HSE?",
    help: {
      title: "Health expenses relief",
      summary:
        "You can claim income-tax relief on many qualifying health expenses for yourself or someone else, at the standard rate (20% for most items). You must have paid the cost and keep receipts. Amounts refunded by VHI/Laya/Irish Life Health, HSE, etc. must be subtracted.",
      bullets: [
        "Often qualifies: GP/consultant fees, hospital treatment, prescribed drugs, prescribed physio, ambulance, some appliances on advice of a practitioner.",
        "Usually does not qualify the same way: routine dental (check non-routine / Med 2), cosmetic treatment without medical need.",
        "Health insurance premiums already get relief at source — don’t claim the premium again here.",
        "You can claim for the last four tax years, one year at a time.",
      ],
      where:
        "Keep receipts 6 years, or upload to Revenue Receipts Tracker in myAccount (can enable real-time credits). Claim under Health expenses on your Income Tax Return or Manage your tax → Add credits.",
      tip: "Add up what you paid minus what insurance/HSE paid back. That net figure is what matters later.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_dental_nonroutine",
    section: "Health",
    prompt: "Did you have non-routine dental treatment (your dentist issues a Med 2)?",
    help: {
      title: "Non-routine dental & Form Med 2",
      summary:
        "Routine dental care (check-ups, scale and polish, ordinary fillings in many cases) generally doesn’t qualify. Non-routine dental treatment can qualify — your dentist completes Form Med 2 as evidence.",
      bullets: [
        "Examples often treated as non-routine: extractions, root canals, gum disease treatment, crowns/bridges in qualifying cases — confirm with your dentist/Revenue list.",
        "Med 2 is your supporting document; you still claim through myAccount health expenses.",
        "Orthodontics and some treatments have specific rules — check before claiming.",
      ],
      where:
        "Ask your dentist for Med 2. Claim with other health expenses in myAccount. Store Med 2 / receipts in Receipts Tracker or your files for 6 years.",
      tip: "If you only had a check-up and clean, answer No.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_nursing",
    section: "Health",
    prompt: "Did you pay approved nursing home fees?",
    help: {
      title: "Nursing home expenses",
      summary:
        "Fees for maintenance/treatment in an approved nursing home can qualify for relief — usually at your highest rate of income tax (so potentially more valuable than ordinary health expenses at 20%).",
      bullets: [
        "Must be an approved nursing home / qualifying care setting under Revenue rules.",
        "Subtract any state support or reimbursements.",
        "Can be claimed for yourself or another person in qualifying situations.",
      ],
      where:
        "Nursing home invoices; Revenue list/guidance on approved nursing homes. Claim via health / nursing home sections on the return or real-time credits with receipts.",
      tip: "Private hospital overnight stays are usually ordinary health expenses, not this nursing-home category.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_home_carer",
    section: "Other credits",
    prompt:
      "Did one spouse/partner care at home with limited income while the other worked (jointly assessed)?",
    help: {
      title: "Home Carer Tax Credit",
      summary:
        "For jointly assessed couples, if one partner cares for a dependent person at home and has low income, a Home Carer Tax Credit may apply (with tapering as the carer’s income rises).",
      bullets: [
        "Usually needs joint assessment.",
        "Caring for a dependent child/relative at home is the typical scenario.",
        "Credit reduces if the carer’s own income goes above Revenue thresholds.",
      ],
      where:
        "Claim/confirm on the Income Tax Return or tax credits in myAccount. Revenue’s Home Carer Tax Credit page explains income limits.",
      tip: "If both partners work full-time on similar pay, this is usually No.",
    },
    type: "choice",
    options: yesNoUnsure,
    showIf: (a) => a.q_status === "married_joint",
  },
  {
    id: "q_incap_child",
    section: "Other credits",
    prompt: "Do you care for a qualifying incapacitated child?",
    help: {
      title: "Incapacitated Child Tax Credit",
      summary:
        "If you have a child who is permanently incapacitated (physical or mental) to the extent they can’t maintain themselves, a substantial tax credit may apply. “Child” can include an adult child in some cases — check Revenue’s definition.",
      bullets: [
        "This is specific medical/ incapacity criteria — not the same as the ordinary child benefit system.",
        "Credit amount is set in the annual tax charts.",
        "You may already have it on your tax credit certificate.",
      ],
      where:
        "Tax credit certificate in myAccount; Revenue Incapacitated Child Tax Credit guidance. Medical evidence may be needed if Revenue asks.",
      tip: "If you’re unsure whether the legal definition applies, choose Not sure and read Revenue’s page before claiming anything new.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
  {
    id: "q_dep_relative",
    section: "Other credits",
    prompt: "Did you maintain a dependent relative?",
    help: {
      title: "Dependent Relative Tax Credit",
      summary:
        "A smaller credit may apply if you maintain a relative who meets Revenue’s dependency and income-limit tests (the relative’s income must be under a published limit).",
      bullets: [
        "“Maintain” means you contribute substantially to their care/upkeep.",
        "If the relative’s income is too high, the credit won’t apply.",
        "Different from Home Carer or Incapacitated Child credits.",
      ],
      where:
        "Revenue Dependent Relative Tax Credit page for the income limit. Claim on your return / tax credits if eligible.",
      tip: "Helping an elderly parent occasionally with bills might qualify — but only if the income-limit test is met.",
    },
    type: "choice",
    options: yesNoUnsure,
  },
];

export function visibleQuestions(answers: ChecklistAnswers): QuestionDef[] {
  return QUESTIONS.filter((q) => (q.showIf ? q.showIf(answers) : true));
}

export function deriveSelectedReliefs(answers: ChecklistAnswers): ReliefId[] {
  const ids = new Set<ReliefId>();

  if (answers.q_medical === "yes" || answers.q_dental_nonroutine === "yes") {
    ids.add("health_expenses");
  }
  if (answers.q_nursing === "yes") ids.add("nursing_home");
  if (
    (answers.q_rent === "yes" || answers.q_rent === "unsure") &&
    answers.q_rent_landlord !== "no"
  ) {
    ids.add("rent_tax_credit");
  }
  if (answers.q_wfh === "yes") ids.add("remote_working");
  if (answers.q_fre === "yes" || answers.q_fre === "unsure") {
    ids.add("flat_rate_expense");
  }
  if (answers.q_tuition === "yes") ids.add("tuition_fees");
  if (answers.q_mortgage_interest === "yes" || answers.q_mortgage_interest === "unsure") {
    ids.add("mortgage_interest_credit");
  }
  if (answers.q_home_carer === "yes") ids.add("home_carer_credit");
  if (answers.q_age65 === "yes") ids.add("age_credit");
  if (answers.q_incap_child === "yes") ids.add("incapacitated_child_credit");
  if (answers.q_dep_relative === "yes") ids.add("dependent_relative_credit");

  return [...ids];
}

export function isTri(v: unknown): v is TriState {
  return v === "yes" || v === "no" || v === "unsure";
}

export function isStatus(v: unknown): v is PersonalStatus {
  return (
    v === "single" ||
    v === "married_joint" ||
    v === "married_separate" ||
    v === "lone_parent" ||
    v === "widowed"
  );
}
