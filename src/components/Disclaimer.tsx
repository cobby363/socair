export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="disclaimer">
      {compact
        ? "Indicative guide only — a Statement of Liability from Revenue confirms any refund."
        : "This is a guide and an estimate. Only Revenue’s Statement of Liability confirms a refund. We do not file for you and we do not connect to myAccount."}
    </div>
  );
}
