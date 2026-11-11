import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { deriveSelectedReliefs } from "../data/questions";
import {
  clearAllData,
  loadAmounts,
  loadState,
  saveAmounts,
  saveState,
} from "../lib/storage";
import type {
  AppPersistedState,
  ChecklistAnswers,
  EstimateAmounts,
  ReliefId,
  TaxYear,
} from "../lib/types";

type Ctx = {
  state: AppPersistedState;
  amounts: EstimateAmounts;
  setTaxYear: (y: TaxYear) => void;
  setAnswer: <K extends keyof ChecklistAnswers>(key: K, value: ChecklistAnswers[K]) => void;
  setSelectedReliefIds: (ids: ReliefId[]) => void;
  toggleRelief: (id: ReliefId) => void;
  completeChecklist: () => void;
  setStepTick: (key: string, done: boolean) => void;
  setAmounts: (patch: Partial<EstimateAmounts>) => void;
  resetAll: () => void;
};

const AppStateContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppPersistedState>(() => loadState());
  const [amounts, setAmountsState] = useState<EstimateAmounts>(() => loadAmounts());

  const persist = useCallback((next: AppPersistedState) => {
    setState(next);
    saveState(next);
  }, []);

  const setTaxYear = useCallback(
    (y: TaxYear) =>
      persist({
        ...state,
        taxYear: y,
        selectedReliefIds: deriveSelectedReliefs(state.answers, y),
      }),
    [persist, state],
  );

  const setAnswer = useCallback(
    <K extends keyof ChecklistAnswers>(key: K, value: ChecklistAnswers[K]) => {
      const answers = { ...state.answers, [key]: value };
      persist({
        ...state,
        answers,
        selectedReliefIds: deriveSelectedReliefs(answers, state.taxYear),
        checklistComplete: false,
      });
    },
    [persist, state],
  );

  const setSelectedReliefIds = useCallback(
    (ids: ReliefId[]) => persist({ ...state, selectedReliefIds: ids }),
    [persist, state],
  );

  const toggleRelief = useCallback(
    (id: ReliefId) => {
      const has = state.selectedReliefIds.includes(id);
      const selectedReliefIds = has
        ? state.selectedReliefIds.filter((x) => x !== id)
        : [...state.selectedReliefIds, id];
      persist({ ...state, selectedReliefIds });
    },
    [persist, state],
  );

  const completeChecklist = useCallback(() => {
    persist({
      ...state,
      checklistComplete: true,
      selectedReliefIds: deriveSelectedReliefs(state.answers, state.taxYear),
    });
  }, [persist, state]);

  const setStepTick = useCallback(
    (key: string, done: boolean) => {
      persist({ ...state, stepTicks: { ...state.stepTicks, [key]: done } });
    },
    [persist, state],
  );

  const setAmounts = useCallback((patch: Partial<EstimateAmounts>) => {
    setAmountsState((prev) => {
      const next = { ...prev, ...patch };
      saveAmounts(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    clearAllData();
    setState(loadState());
    setAmountsState({});
  }, []);

  const value = useMemo(
    () => ({
      state,
      amounts,
      setTaxYear,
      setAnswer,
      setSelectedReliefIds,
      toggleRelief,
      completeChecklist,
      setStepTick,
      setAmounts,
      resetAll,
    }),
    [
      state,
      amounts,
      setTaxYear,
      setAnswer,
      setSelectedReliefIds,
      toggleRelief,
      completeChecklist,
      setStepTick,
      setAmounts,
      resetAll,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
