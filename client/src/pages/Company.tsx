import { company } from "@/config/company";
import { assetUrl } from "@/lib/siteAssets";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

export default function Company() {
  return (
    <SiteFrame>
      <PageTitle title="회사소개" subtitle="ABOUT US" crumbs="회사소개 / 인사말" image={assetUrl("/media/construction-hero_9277bcc5.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="company" />
        <article className="sub-content greeting-content">
          <p className="content-kicker">{company.name}</p>
          <h2>현장 조건을 먼저 보고,<br /><em>필요한 작업</em>을 정리합니다.</h2>
          <div className="greeting-content__line" />
          <div className="sample-company-card"><strong>샘플 콘텐츠 안내</strong><p>현재 회사소개와 현장 이미지는 실제 회사 자료를 받기 전 화면 구성을 유지하기 위한 샘플입니다. 확정된 소개문과 시공 이력을 받으면 이 영역에서 교체합니다.</p></div>
          <p>공사 문의에서 가장 먼저 필요한 것은 현장 위치와 작업 구간, 현재 불편한 점을 정확히 확인하는 일입니다.</p>
          <p>필요 공정을 한 번에 단정하기보다 현장 조건과 사용 동선, 일정의 우선순위를 살펴 작업 범위를 구분합니다.</p>
          <p>상담부터 현장 확인, 견적 안내와 완료 확인까지 다음 단계에서 필요한 내용을 직접적이고 이해하기 쉽게 안내합니다.</p>
          <div className="company-signoff"><span>{company.name}</span><b>현장<br />중심</b></div>
          <Link href="/location" className="text-link"><MapPin size={17} /> 방문 안내 보기 <ArrowRight size={17} /></Link>
        </article>
      </section>
    </SiteFrame>
  );
}
