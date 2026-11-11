import type { ReliefId } from "../lib/types";
import type { StepImage } from "./guideMedia";
import {
  SHOT_ADD_RECEIPT,
  SHOT_CREDIT_CATEGORIES,
  SHOT_REVIEW_PRIOR_YEARS,
} from "./guideMedia";

export type ClaimStep = {
  title: string;
  detail: string;
  /** Only when the UI is hard to describe in text alone. */
  image?: StepImage;
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
      "You can claim income-tax relief on qualifying medical expenses you paid and were not reimbursed for. Relief is generally at the standard rate (20%) of the net amount. Non-routine dental usually needs a Med 2 form. Keep records for six years. The steps below walk from sign-in through to submitting the claim.",
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
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Open the prior year",
        detail:
          "Choose “Review your tax for the previous 4 years” (wording can vary slightly). Pick the tax year you selected in Socair, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Find Health expenses",
        detail:
          "In Tax Credits & Reliefs (or similar), open the Health section → Health expenses. Enter the net qualifying amount for the year (after insurance / HSE reclaim). Keep Med 2 and receipts for your records; you may also upload via Receipts Tracker if offered.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit the return. When Revenue issues or updates the Statement of Liability, confirm the health-expenses line and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year (or Real Time Credits). You’ll see your current credits and options to add more.",
      },
      {
        title: "Add Health expenses",
        detail:
          "Choose Add new credits. Open the Health category, then Health expenses. Enter net qualifying spend for the year so far (or as the form instructs).",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Or use Receipts Tracker",
        detail:
          "Alternatively, from PAYE Services open Receipts Tracker → Add new receipt. Choose the health-related category / sub-category, enter the date paid and amount, and keep clear images of receipts. Non-routine dental still needs Med 2 rules.",
        image: SHOT_ADD_RECEIPT,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Credits may update in-year; any refund often comes through payroll or a Revenue payment after processing. Keep your paperwork for six years.",
      },
    ],
    officialPath: "revenue.ie → Personal → Tax credits & reliefs → Health expenses",
  },

  nursing_home: {
    title: "Claim nursing home fees",
    overview:
      "Qualifying fees paid to an approved nursing home can attract relief, often at your highest rate of income tax (unlike many other health expenses at 20%). Claim only the amount you paid after state supports / reimbursements. The steps below start from sign-in.",
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
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Open the prior year",
        detail:
          "Choose “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Add nursing home expenses",
        detail:
          "In Tax Credits & Reliefs, open Health-related reliefs. Find nursing home fees (labels vary — sometimes near other health / dependent care medical entries). Enter only the net fees you paid after Fair Deal, insurance, or other supports.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit the return. Confirm nursing-home relief appears on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year. You’ll see your current credits and an option to add more.",
      },
      {
        title: "Add nursing home expenses",
        detail:
          "Choose Add new credits → Health category → nursing home expenses (wording can vary). Enter the net amount you paid and have invoices ready if Revenue asks.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check your tax credit certificate or refund notice after processing. Keep nursing-home invoices with your records.",
      },
    ],
    officialPath: "revenue.ie → Health expenses / nursing home guidance",
  },

  rent_tax_credit: {
    title: "Claim the rent tax credit",
    overview:
      "If you paid qualifying private rent, you may get a Rent Tax Credit (roughly 20% of rent, with annual caps that depend on status and year). Available for tax years 2022–2028. Do not include utilities, meals, or laundry in the rent figure. The steps below start from sign-in.",
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
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Open the prior year",
        detail:
          "Choose “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Find Rent Tax Credit",
        detail:
          "In Tax Credits & Reliefs (or a land & property style section), open Rent Tax Credit. Enter the rent you personally paid and the tenancy / landlord / property details Revenue asks for. Exclude utilities and extras.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit the return. Confirm the Rent Tax Credit amount on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year. You’ll see your current credits and an option to add more.",
      },
      {
        title: "Add Rent Tax Credit",
        detail:
          "Choose Add new credits. Look under the category that covers personal / family / property credits (often “You and your family” or similar), then select Rent Tax Credit.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Enter rent and tenancy details",
        detail:
          "Use annual rent (or year-to-date as the form instructs). Exclude utilities, meals, and laundry. Complete landlord, property address / Eircode, and any RTB-style fields requested.",
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check that Rent Tax Credit appears on your tax credit certificate. Any in-year refund usually comes through payroll or a Revenue payment after processing.",
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
        title: "Gather bills and day count first",
        detail:
          "Before opening Revenue, add electricity + heating + broadband for the calendar year (your share if bills are shared). Count remote workdays only. Note any employer WFH / e-working allowance from payslips (or €0).",
      },
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Open the prior year",
        detail:
          "Choose “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Enter remote working / e-working expenses",
        detail:
          "In Tax Credits & Reliefs / expenses, find Remote working relief or e-working expenses (often under Your job). Enter bills, remote days, and employer allowance as the form asks — Revenue applies the statutory formula. You can store utility bills in Receipts Tracker if that helps.",
        image: SHOT_ADD_RECEIPT,
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. On the Statement of Liability, confirm remote-working relief appears and is a sensible order of magnitude for your bills and days.",
      },
    ],
    stepsInYear: [
      {
        title: "Keep a running log through the year",
        detail:
          "Save utility bills and a simple count of remote workdays. Many people find it cleaner to claim once the year closes with full annual figures.",
      },
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Check whether an in-year path is offered",
        detail:
          "Open Manage your tax. If remote working / e-working expenses appear under Add new credits or expenses (often Your job), you can enter year-to-date figures — but you may need to update them when the year ends.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Prefer the full prior-year return if unsure",
        detail:
          "If the in-year screens are unclear or incomplete, wait until the year closes and use “Review your tax for the previous 4 years” for a full annual claim instead.",
      },
      {
        title: "Keep evidence",
        detail:
          "Store bills and your day count. Revenue can ask for particulars of the expenses.",
      },
    ],
    officialPath:
      "revenue.ie → Jobs and pensions → Tax treatment of e-working / Remote Working Relief",
  },

  flat_rate_expense: {
    title: "Claim flat-rate expenses",
    overview:
      "For many jobs, Revenue publishes a fixed yearly “flat-rate expense” (FRE) for uniforms, tools, etc. You usually don’t need individual receipts for the published amount. Check your tax credit certificate first — payroll may already include it. The steps below start from sign-in.",
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
        title: "Look up your occupation on Revenue’s FRE list",
        detail:
          "On revenue.ie, open the Flat Rate Expenses list and find your job title and the published yearly amount. Note that figure before you go into myAccount.",
      },
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Check whether FRE is already on your certificate",
        detail:
          "Open Manage your tax (or your Tax Credit Certificate). Look for flat-rate expenses / expenses of employment. If the correct amount is already there for the year you care about, you usually don’t need to claim again — stop here.",
      },
      {
        title: "Open the prior year if it’s missing",
        detail:
          "If FRE is missing or wrong for a past year, go to PAYE Services → “Review your tax for the previous 4 years”. Pick the year, then request / open the Statement of Liability / Income Tax Return.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Enter the published FRE amount",
        detail:
          "On the return, find flat-rate expenses / expenses of employment (often under Your job). Enter the published amount for your occupation — don’t invent a figure.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. Confirm the FRE line on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Check your tax credit certificate",
        detail:
          "Open Manage your tax and look for flat-rate expenses. Also ask payroll if they already apply FRE for your role.",
      },
      {
        title: "Add FRE if it’s missing",
        detail:
          "If it’s missing, choose Add new credits / expenses. Look under Your job (or similar), select flat-rate expenses, and enter only the published amount for your occupation.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check that the FRE now shows on your tax credit certificate at the correct published amount.",
      },
    ],
    officialPath: "revenue.ie → Flat Rate Expenses",
  },

  mortgage_interest_credit: {
    title: "Mortgage interest tax credit",
    overview:
      "A condition-heavy credit linked to qualifying mortgage interest. Only claim if you clearly meet Revenue’s published rules for the year — Socair does not verify eligibility. The steps below start from checking the rules, then walk through myAccount.",
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
        title: "Confirm eligibility on revenue.ie first",
        detail:
          "Open Revenue’s Mortgage Interest Tax Credit page for your year and read the conditions end-to-end. If you don’t clearly qualify, stop — do not claim.",
      },
      {
        title: "Get the interest figure from your lender",
        detail:
          "Use the annual interest amount from your lender statement — not the full monthly repayment (which includes capital).",
      },
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Open the prior year",
        detail:
          "Choose “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Enter Mortgage Interest Tax Credit",
        detail:
          "In Tax Credits & Reliefs, find Mortgage Interest Tax Credit (often under property / You and your family style sections). Enter the qualifying interest and complete any condition prompts Revenue shows.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. Confirm the credit on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Confirm eligibility again for the current year",
        detail:
          "Re-read Revenue’s conditions for the current year. Only continue if you still clearly qualify and myAccount offers the credit.",
      },
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year and check whether Mortgage Interest Tax Credit is already listed.",
      },
      {
        title: "Add the credit if offered",
        detail:
          "If it’s missing and available, choose Add new credits. Find Mortgage Interest Tax Credit under the relevant category, then enter interest from the lender statement (interest only).",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check your tax credit certificate. Keep the lender interest statement with your records.",
      },
    ],
    officialPath: "revenue.ie → Mortgage Interest Tax Credit",
  },

  tuition_fees: {
    title: "Tuition fees relief",
    overview:
      "Relief may apply to qualifying fees for approved courses, after grants. Confirm the course qualifies on Revenue before claiming — not every course is eligible. The steps below start from that check, then walk through myAccount.",
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
        detail:
          "On revenue.ie, open tuition fees relief guidance / approved courses. If your course doesn’t qualify, stop — do not claim.",
      },
      {
        title: "Work out the net fees",
        detail:
          "Add fees you paid in the tax year and subtract grants or other support that reduced what you paid. Keep receipts and grant letters.",
      },
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Open the prior year",
        detail:
          "Choose “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Enter tuition fees relief",
        detail:
          "In Tax Credits & Reliefs / education-related sections, open tuition fees relief. Enter net qualifying fees and the course / college details Revenue asks for.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. Confirm tuition fees relief on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Confirm the course still qualifies",
        detail:
          "Check Revenue’s current tuition fees guidance before entering anything in myAccount.",
      },
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax. If an in-year tuition fees option isn’t clearly offered, it’s often cleaner to claim when the year closes via the prior-year return path.",
      },
      {
        title: "Add tuition fees if offered",
        detail:
          "If Add new credits / reliefs includes tuition fees, select it under the relevant category, enter net fees paid so far (or as instructed), and complete course details.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and keep records",
        detail:
          "Submit if you used an in-year path. Keep fee receipts and grant letters either way.",
      },
    ],
    officialPath: "revenue.ie → Tuition fees relief",
  },

  home_carer_credit: {
    title: "Home carer tax credit",
    overview:
      "For jointly assessed couples where one partner cares at home and has limited income. The credit can taper as the carer’s income rises. Many people already have it on their tax credit certificate — the steps below show how to check, and how to add or correct it if it’s missing.",
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
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Check whether Home Carer Credit is already there",
        detail:
          "Open Manage your tax (or your Tax Credit Certificate). Look for Home Carer Tax Credit. If it’s already present and correct for the year you care about, you usually don’t need to claim again — stop here.",
      },
      {
        title: "Open the prior year if it’s missing or wrong",
        detail:
          "Go to PAYE Services → “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Find Home Carer Tax Credit and enter carer income",
        detail:
          "In Tax Credits & Reliefs, open Home Carer Tax Credit (often under You and your family). Enter the carer’s income as asked — Revenue applies the taper rules from that figure.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. Confirm Home Carer Tax Credit on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year. Open your current credits / Tax Credit Certificate and look for Home Carer Tax Credit.",
      },
      {
        title: "Add or correct it if needed",
        detail:
          "If it’s missing, choose Add new credits. Pick the personal / family category (often “You and your family”), select Home Carer Tax Credit, and enter the carer’s income carefully.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check that Home Carer Tax Credit now shows on your tax credit certificate at a sensible amount for the carer’s income.",
      },
    ],
    officialPath: "revenue.ie → Home Carer Tax Credit",
  },

  age_credit: {
    title: "Age tax credit",
    overview:
      "If you (or, where relevant, your spouse/civil partner) were 65 or over in the tax year, an Age Tax Credit may apply on top of the personal credit. Many people already have it on their tax credit certificate — the steps below show how to check, and how to add or correct it if it’s missing.",
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
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Check whether Age Credit is already there",
        detail:
          "Still in PAYE Services, open Manage your tax (or your Tax Credit Certificate) for a recent year. Look for “Age Tax Credit” (or similar) in the list of credits. If it’s already present for the year you care about, you usually don’t need to claim again — stop here.",
      },
      {
        title: "Open the prior year if it’s missing",
        detail:
          "If Age Credit is missing for a past year, go back to PAYE Services → “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return for that year.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Find and add Age Tax Credit",
        detail:
          "In Tax Credits & Reliefs (or similar), look under You and your family / personal credits for Age Tax Credit. Add or correct it so it matches your (or your partner’s) age for that year. You usually don’t type a euro amount — Revenue applies the credit once age qualifies.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit the return. When Revenue issues or updates the Statement of Liability, confirm Age Tax Credit appears and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year. Open your current credits / Tax Credit Certificate view and look for Age Tax Credit.",
      },
      {
        title: "Add it if it’s missing",
        detail:
          "If Age Credit isn’t listed, choose Add new credits. Pick the category that covers personal / family credits (often “You and your family”), then select Age Tax Credit and complete any age / partner prompts.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check that Age Tax Credit now shows on your tax credit certificate. Any refund usually comes through payroll or a Revenue payment after processing.",
      },
    ],
    officialPath: "revenue.ie → Age Tax Credit",
  },

  incapacitated_child_credit: {
    title: "Incapacitated child credit",
    overview:
      "A tax credit may apply if you maintain a child who meets Revenue’s incapacitated child definition. Rules are specific — confirm on Revenue before claiming. The steps below show how to check your certificate and how to claim if it’s missing.",
    eligibility: [
      "Child meets Revenue’s incapacitated child criteria",
      "You are entitled to claim for that child for the year",
    ],
    need: [
      "Qualifying child details",
      "Any supporting medical / Revenue documentation as required",
    ],
    tips: [
      "One credit per qualifying child in typical cases — confirm current amounts on Revenue.",
    ],
    stepsPrior: [
      {
        title: "Confirm eligibility on revenue.ie",
        detail:
          "Open Revenue’s Incapacitated Child Tax Credit page and confirm the child meets the definition. If not, stop — do not claim.",
      },
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Check whether the credit is already there",
        detail:
          "Open Manage your tax (or your Tax Credit Certificate). Look for Incapacitated Child Tax Credit. If it’s already present and correct for the year you care about, you usually don’t need to claim again — stop here.",
      },
      {
        title: "Open the prior year if it’s missing",
        detail:
          "Go to PAYE Services → “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Add Incapacitated Child Tax Credit",
        detail:
          "In Tax Credits & Reliefs, find Incapacitated Child Tax Credit (often under You and your family). Enter the number of qualifying children and any details Revenue asks for.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. Confirm the credit on the Statement of Liability and check any refund or balancing payment. Keep supporting documents if Revenue may ask.",
      },
    ],
    stepsInYear: [
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year. Look for Incapacitated Child Tax Credit on your current credits / Tax Credit Certificate.",
      },
      {
        title: "Add it if it’s missing",
        detail:
          "If it’s missing, choose Add new credits. Open the personal / family category (often “You and your family”), select Incapacitated Child Tax Credit, and complete the prompts.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check that the credit now shows on your tax credit certificate.",
      },
    ],
    officialPath: "revenue.ie → Incapacitated Child Tax Credit",
  },

  dependent_relative_credit: {
    title: "Dependent relative credit",
    overview:
      "A smaller credit if you maintain a relative who meets dependency tests and whose income is under Revenue’s limit for the year. Check the income limit first — it can change. The steps below start from that check, then walk through myAccount.",
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
        title: "Check the income limit on revenue.ie",
        detail:
          "Open Revenue’s Dependent Relative Tax Credit page and note the income limit for the year. If the relative’s income is over the limit, stop — the credit won’t apply.",
      },
      {
        title: "Sign in to myAccount",
        detail:
          "Go to revenue.ie and sign in to myAccount (or ROS if that’s how you file). Have your 2FA device ready.",
      },
      {
        title: "Open PAYE Services",
        detail:
          "From the myAccount home, open the PAYE Services card. This is where prior-year reviews and current-year tax management live.",
      },
      {
        title: "Check whether the credit is already there",
        detail:
          "Open Manage your tax (or your Tax Credit Certificate). Look for Dependent Relative Tax Credit. If it’s already present and correct for the year you care about, you usually don’t need to claim again — stop here.",
      },
      {
        title: "Open the prior year if it’s missing",
        detail:
          "Go to PAYE Services → “Review your tax for the previous 4 years”. Pick the tax year, then request / open the Statement of Liability / Income Tax Return.",
        image: SHOT_REVIEW_PRIOR_YEARS,
      },
      {
        title: "Add Dependent Relative Tax Credit",
        detail:
          "In Tax Credits & Reliefs, find Dependent Relative Tax Credit (often under You and your family). Enter the number of qualifying dependent relatives and complete any prompts.",
      },
      {
        title: "Submit and check the Statement of Liability",
        detail:
          "Submit. Confirm the credit on the Statement of Liability and check any refund or balancing payment.",
      },
    ],
    stepsInYear: [
      {
        title: "Confirm the income limit for this year",
        detail:
          "Re-check Revenue’s published income limit before adding the credit mid-year.",
      },
      {
        title: "Sign in and open PAYE Services",
        detail:
          "Go to revenue.ie → myAccount → PAYE Services for the current tax year.",
      },
      {
        title: "Open Manage your tax",
        detail:
          "Choose Manage your tax for the current year. Look for Dependent Relative Tax Credit on your current credits.",
      },
      {
        title: "Add it if it’s missing",
        detail:
          "If it’s missing, choose Add new credits. Open the personal / family category (often “You and your family”), select Dependent Relative Tax Credit, and complete the prompts.",
        image: SHOT_CREDIT_CATEGORIES,
      },
      {
        title: "Submit and confirm",
        detail:
          "Submit. Check that the credit now shows on your tax credit certificate.",
      },
    ],
    officialPath: "revenue.ie → Dependent Relative Tax Credit",
  },
};
