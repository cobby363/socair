import type { AppPersistedState, EstimateAmounts } from "./types";

const KEY = "socair.tax.helper.v1";
const AMOUNTS_KEY = "socair.tax.helper.amounts.v1";
const LEGACY_KEY = "clare.tax.helper.v1";
const LEGACY_AMOUNTS_KEY = "clare.tax.helper.amounts.v1";

const defaultState = (): AppPersistedState => ({
  taxYear: 2026,
  answers: {},
  selectedReliefIds: [],
  stepTicks: {},
  checklistComplete: false,
});

export function loadState(): AppPersistedState {
  try {
    const raw =
      localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppPersistedState;
    return { ...defaultState(), ...parsed, answers: parsed.answers ?? {} };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppPersistedState) {
  const { amounts: _a, ...rest } = state;
  localStorage.setItem(KEY, JSON.stringify(rest));
  localStorage.removeItem(LEGACY_KEY);
}

export function loadAmounts(): EstimateAmounts {
  try {
    const raw =
      sessionStorage.getItem(AMOUNTS_KEY) ??
      localStorage.getItem(AMOUNTS_KEY) ??
      sessionStorage.getItem(LEGACY_AMOUNTS_KEY) ??
      localStorage.getItem(LEGACY_AMOUNTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as EstimateAmounts;
  } catch {
    return {};
  }
}

export function saveAmounts(amounts: EstimateAmounts) {
  const payload = JSON.stringify(amounts);
  sessionStorage.setItem(AMOUNTS_KEY, payload);
  sessionStorage.removeItem(LEGACY_AMOUNTS_KEY);
  if (amounts.rememberAmounts) {
    localStorage.setItem(AMOUNTS_KEY, payload);
    localStorage.removeItem(LEGACY_AMOUNTS_KEY);
  } else {
    localStorage.removeItem(AMOUNTS_KEY);
    localStorage.removeItem(LEGACY_AMOUNTS_KEY);
  }
}

export function clearAllData() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(AMOUNTS_KEY);
  localStorage.removeItem(LEGACY_KEY);
  localStorage.removeItem(LEGACY_AMOUNTS_KEY);
  sessionStorage.removeItem(AMOUNTS_KEY);
  sessionStorage.removeItem(LEGACY_AMOUNTS_KEY);
}
