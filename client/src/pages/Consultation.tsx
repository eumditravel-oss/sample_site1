/**
 * Design reference: a focused contractor consultation intake card, with the private list intentionally kept on a separate route.
 */
import { ConsultationForm } from "@/components/HomeSections";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";
import { assetUrl } from "@/lib/siteAssets";

export default function Consultation() {
  return (
    <SiteFrame>
      <PageTitle title="온라인상담" subtitle="ONLINE CONSULTATION" image={assetUrl("/manus-storage/construction-hero-2_76fd72ca.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="consultation" />
        <article className="sub-content consultation-form-only">
          <ConsultationForm compact />
        </article>
      </section>
    </SiteFrame>
  );
}
