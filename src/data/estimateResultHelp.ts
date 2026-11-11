import type { HelpContent } from "./questions";

export const RESULT_METRIC_HELP = {
  refund: {
    title: "Expected refund (indicative)",
    summary:
      "Socair’s best guess at the refund you might get back, based only on the annual figures you entered. It compares income tax you already paid with a simplified sketch of income tax due after your selected extras. It is not a Revenue confirmation.",
    bullets: [
      "Roughly: tax you paid − Socair’s simplified tax-due sketch = expected refund hint.",
      "Only shows if you entered annual income tax already paid.",
      "Uses your gross pay, a simplified rate band, basic credits, and the extras below.",
      "Does not model USC, PRSI, pensions, emergency tax, BIK, or full joint-assessment splits.",
      "€0 can still mean extras are worth claiming — the sketch may just be incomplete or you may not be overpaid.",
    ],
    tip: "Treat this as “expected refund from these inputs,” then confirm on a Statement of Liability.",
  },
  extras: {
    title: "Selected extras",
    summary:
      "Estimated tax value of the reliefs and credits you selected and entered amounts for — added together. This is not the same as a refund on its own; it’s how much those extras might be worth toward reducing tax.",
    bullets: [
      "Each line in the breakdown is one relief or credit with a calculated amount.",
      "Credits (rent, age, etc.) reduce income tax euro-for-euro.",
      "Some reliefs (health, remote working, FRE) are estimated as tax saved at 20% or your marginal rate.",
      "Selected items with no amounts entered appear under “Also on your list” instead.",
    ],
    tip: "Extras feed into the expected-refund sketch when you’ve also entered tax paid.",
  },
  marginal: {
    title: "Marginal rate used",
    summary:
      "The income-tax rate Socair assumes for rate-sensitive reliefs (remote working, nursing home, flat-rate expenses), based on whether your annual gross looks like it sits above the standard-rate band for your status.",
    bullets: [
      "20% = mainly a standard-rate taxpayer for these extras.",
      "40% = some income looks higher-rate, so those reliefs are worth more per euro.",
      "Rent credit and health expenses still follow their usual 20%-style rules where that applies.",
    ],
    tip: "If you’re near the band boundary, try a slightly higher/lower gross to see sensitivity.",
  },
  sketch: {
    title: "Simplified income-tax sketch",
    summary:
      "A rough guess at income tax due for the year after basic credits and your selected extras. When you enter tax paid, expected refund ≈ tax paid − this sketch.",
    bullets: [
      "Starts from annual gross (minus FRE if entered).",
      "Taxes income at 20% up to a simplified band, then 40% above.",
      "Subtracts simplified personal + PAYE credits and selected extras.",
      "Ignores USC, PRSI, and many real payroll details.",
    ],
  },
} as const satisfies Record<string, HelpContent>;
