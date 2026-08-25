import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Company from "@/pages/Company";
import Consultation from "@/pages/Consultation";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Location from "@/pages/Location";
import NoticeDetail from "@/pages/NoticeDetail";
import Notices from "@/pages/Notices";
import NotFound from "@/pages/NotFound";
import PreConsultation from "@/pages/PreConsultation";
import Privacy from "@/pages/Privacy";
import ServiceProcess from "@/pages/ServicePromise";
import ServiceScope from "@/pages/ServiceScope";
import { useHashLocation } from "@/lib/hashLocation";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/company" component={Company} />
      <Route path="/services" component={ServiceScope} />
      <Route path="/services/scope" component={ServiceScope} />
      <Route path="/services/process" component={ServiceProcess} />
      <Route path="/services/promise" component={ServiceProcess} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/consultation/list" component={Consultation} />
      <Route path="/notices/pre-check" component={PreConsultation} />
      <Route path="/notices/:id" component={NoticeDetail} />
      <Route path="/notices" component={Notices} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/location" component={Location} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router hook={useHashLocation}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Routes />
          </TooltipProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}
