import ErrorBoundary from "@/components/ErrorBoundary";
import { ConsultationDraftProvider } from "@/context/ConsultationDraft";
import Company from "@/pages/Company";
import Consultation from "@/pages/Consultation";
import EmailPolicy from "@/pages/EmailPolicy";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Location from "@/pages/Location";
import NotFound from "@/pages/NotFound";
import Notices from "@/pages/Notices";
import PreConsultation from "@/pages/PreConsultation";
import Privacy from "@/pages/Privacy";
import ServicePromise from "@/pages/ServicePromise";
import ServiceScope from "@/pages/ServiceScope";
import Terms from "@/pages/Terms";
import { Route, Router, Switch } from "wouter";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/company" component={Company} />
      <Route path="/location" component={Location} />
      <Route path="/services" component={ServiceScope} />
      <Route path="/services/scope" component={ServiceScope} />
      <Route path="/services/promise" component={ServicePromise} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/notices" component={Notices} />
      <Route path="/notices/pre-check" component={PreConsultation} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/consultation/list" component={Consultation} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/email-policy" component={EmailPolicy} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App({ ssrPath }: { ssrPath?: string }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <ErrorBoundary>
      <Router base={base} ssrPath={ssrPath}>
        <ConsultationDraftProvider>
          <Routes />
        </ConsultationDraftProvider>
      </Router>
    </ErrorBoundary>
  );
}
