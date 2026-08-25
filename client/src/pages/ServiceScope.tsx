import { assetUrl } from "@/lib/siteAssets";
import { ChevronRight } from "lucide-react";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const services = [
  { name: "경계 구조 시공", scope: "경계석 · 연석 · 진입부", checks: "기초 높이, 선형, 보행·차량 진입부 연결 상태를 확인합니다." },
  { name: "보행로·블록 정비", scope: "보도블록 · 단차 · 배수", checks: "통행 동선, 침하와 파손 구간, 배수 흐름을 함께 확인합니다." },
  { name: "외부 시설 보수", scope: "파손 · 마감 · 안전 정비", checks: "사용에 불편한 부분과 주변 마감의 연결 상태를 점검합니다." },
  { name: "현장 부대 공정", scope: "관로 주변 · 정리 · 보조 작업", checks: "주요 시공과 함께 필요한 주변 정리 범위를 구분합니다." },
];

export default function ServiceScope() {
  return (
    <SiteFrame>
      <PageTitle title="시공 가능 공정" subtitle="WORK SCOPE" crumbs="시공안내 / 시공 가능 공정" image={assetUrl("/media/construction-hero-2_76fd72ca.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="services" />
        <article className="sub-content service-content">
          <div className="service-lead"><p className="content-kicker">WORK SCOPE</p><h2>현장 상태에 따라<br /><em>필요한 범위를 구분합니다.</em></h2><p>아래 항목은 상담을 시작할 때 공정을 구분하기 위한 안내입니다. 최종 작업 범위는 현장 확인과 협의를 거쳐 정합니다.</p></div>
          <div className="service-list">{services.map((service, index) => <section key={service.name} className="service-list__item"><span>0{index + 1}</span><div><h3>{service.name}</h3><small>{service.scope}</small><p>{service.checks}</p></div><ChevronRight size={20} /></section>)}</div>
        </article>
      </section>
    </SiteFrame>
  );
}
