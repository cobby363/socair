import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppStateProvider } from "./context/AppState";
import { Landing } from "./pages/Landing";
import { TaxYearPage } from "./pages/TaxYear";
import { Checklist } from "./pages/Checklist";
import { Results } from "./pages/Results";
import { ClaimGuide } from "./pages/ClaimGuide";
import { Estimate } from "./pages/Estimate";
import { EstimateResults } from "./pages/EstimateResults";
import { Privacy } from "./pages/Privacy";

export default function App() {
  const location = useLocation();

  return (
    <AppStateProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="year" element={<TaxYearPage />} />
            <Route path="checklist" element={<Checklist />} />
            <Route path="results" element={<Results />} />
            <Route path="claim" element={<ClaimGuide />} />
            <Route path="claim/:reliefId" element={<ClaimGuide />} />
            <Route path="estimate" element={<Estimate />} />
            <Route path="estimate/results" element={<EstimateResults />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AppStateProvider>
  );
}
