import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Company from "@/pages/Company";
import Consultation from "@/pages/Consultation";
import ConsultationList from "@/pages/ConsultationList";
import Gallery from "@/pages/Gallery";
import Location from "@/pages/Location";
import Notices from "@/pages/Notices";
import NotFound from "@/pages/NotFound";
import PreConsultation from "@/pages/PreConsultation";
import ServicePromise from "@/pages/ServicePromise";
import ServiceScope from "@/pages/ServiceScope";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/company" component={Company} />
      <Route path="/services" component={ServiceScope} />
      <Route path="/services/scope" component={ServiceScope} />
      <Route path="/services/promise" component={ServicePromise} />
      <Route path="/consultation/list" component={ConsultationList} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/notices/pre-check" component={PreConsultation} />
      <Route path="/notices" component={Notices} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/location" component={Location} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <ErrorBoundary>
      <WouterRouter base={basePath || undefined}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Routes />
          </TooltipProvider>
        </ThemeProvider>
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
