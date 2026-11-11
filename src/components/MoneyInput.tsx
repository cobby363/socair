import { useEffect, useState } from "react";

/** Allow typing euros with decimals (e.g. 1234.56) without the trailing "." vanishing. */
function isMoneyDraft(raw: string): boolean {
  return raw === "" || /^\d{0,9}([.,]\d{0,2})?$/.test(raw.trim());
}

function parseMoney(raw: string): number | undefined {
  const cleaned = raw.trim().replace(/,/g, "");
  if (cleaned === "" || cleaned === ".") return undefined;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return undefined;
  return Math.round(n * 100) / 100;
}

function formatFromValue(value: number | undefined): string {
  if (value == null || Number.isNaN(value)) return "";
  return String(value);
}

type MoneyProps = {
  id: string;
  value: number | undefined;
  onValueChange: (n: number | undefined) => void;
};

export function MoneyInput({ id, value, onValueChange }: MoneyProps) {
  const [text, setText] = useState(() => formatFromValue(value));

  useEffect(() => {
    const parsed = parseMoney(text);
    if (value == null && (text === "" || text === "." || text.endsWith(".") || text.endsWith(","))) {
      return;
    }
    if (parsed !== value) {
      setText(formatFromValue(value));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps -- sync from external value only

  return (
    <input
      id={id}
      inputMode="decimal"
      autoComplete="off"
      placeholder="0.00"
      value={text}
      onChange={(e) => {
        const next = e.target.value;
        if (!isMoneyDraft(next)) return;
        setText(next);
        onValueChange(parseMoney(next));
      }}
      onBlur={() => {
        const parsed = parseMoney(text);
        onValueChange(parsed);
        setText(formatFromValue(parsed));
      }}
    />
  );
}

type CountProps = {
  id: string;
  value: number | undefined;
  onValueChange: (n: number | undefined) => void;
};

export function CountInput({ id, value, onValueChange }: CountProps) {
  const [text, setText] = useState(() => (value == null ? "" : String(Math.trunc(value))));

  useEffect(() => {
    const asNum = text === "" ? undefined : Number(text);
    if (value == null && text === "") return;
    if (asNum !== value) {
      setText(value == null ? "" : String(Math.trunc(value)));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <input
      id={id}
      inputMode="numeric"
      autoComplete="off"
      value={text}
      onChange={(e) => {
        const next = e.target.value;
        if (next !== "" && !/^\d{0,4}$/.test(next)) return;
        setText(next);
        onValueChange(next === "" ? undefined : Number(next));
      }}
    />
  );
}
