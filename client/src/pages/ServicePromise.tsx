import { assetUrl } from "@/lib/siteAssets";
import { Check } from "lucide-react";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const steps = [
  ["문의 내용 확인", "현장 위치, 필요한 공정과 희망 시기를 확인합니다."],
  ["현장 조건 검토", "작업 구간, 진입 여건과 기존 시설 상태를 살핍니다."],
  ["범위·견적 안내", "포함 공정과 제외 범위, 일정과 작업 기준을 구분합니다."],
  ["시공 진행", "협의한 범위와 현장 동선을 기준으로 작업합니다."],
  ["완료 확인", "요청 범위와 마감 상태, 사용 동선을 함께 확인합니다."],
];

export default function ServiceProcess() {
  return (
    <SiteFrame>
      <PageTitle title="진행 절차" subtitle="WORK PROCESS" crumbs="시공안내 / 진행 절차" image={assetUrl("/media/construction-hero-3_cc7a91dc.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="services" />
        <article className="sub-content promise-detail-content">
          <div className="service-lead"><p className="content-kicker">WORK PROCESS</p><h2>다음 단계에 필요한 내용을<br /><em>미리 안내합니다.</em></h2><p>공정과 현장 조건에 따라 일부 단계는 달라질 수 있습니다.</p></div>
          <ol className="production-process-list">{steps.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><Check size={18} /><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
        </article>
      </section>
    </SiteFrame>
  );
}
