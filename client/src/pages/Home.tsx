/**
 * Design reference: a contractor landing page with practical service scope, a formal trust band, process, operational information, and field archive; direct calling is handled by the shared floating control.
 */
import { CompanyIntro, Hero, InformationGrid, ProcessSteps, PromiseBand, ServiceScope, TechnologyShowcase } from "@/components/HomeSections";
import { SiteFrame } from "@/components/SiteShell";

export default function Home() {
  return <SiteFrame><Hero /><CompanyIntro /><ServiceScope /><PromiseBand /><ProcessSteps /><InformationGrid /><TechnologyShowcase /></SiteFrame>;
}
