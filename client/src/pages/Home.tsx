import { CompanyIntro, Hero, InformationGrid, ProcessSteps, PromiseBand, ServiceScope, TechnologyShowcase } from "@/components/HomeSections";
import { SiteFrame } from "@/components/SiteShell";

export default function Home() {
  return <SiteFrame><Hero /><CompanyIntro /><ServiceScope /><PromiseBand /><ProcessSteps /><InformationGrid /><TechnologyShowcase /></SiteFrame>;
}
