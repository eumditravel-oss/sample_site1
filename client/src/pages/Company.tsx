/**
 * Design reference: quiet contractor introduction page with editorial body copy and a persistent phone contact aside.
 */
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "wouter";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

export default function Company() {
  return (
    <SiteFrame>
      <PageTitle title="회사소개" subtitle="COMPANY INTRODUCTION" crumbs="회사소개 / 인사말" image="/manus-storage/construction-hero_9277bcc5.jpg" />
      <section className="sub-layout">
        <SubNavigation section="company" />
        <article className="sub-content greeting-content">
          <p className="content-kicker">선진건설</p>
          <h2>현장을 먼저 이해하고,<br /><em>공정의 기준</em>을 세웁니다.</h2>
          <div className="greeting-content__line" />
          <p>선진건설은 토목·건축 공사와 외부 시설물의 시공·정비 흐름을 명확하게 안내하기 위해 만든 예시 브랜드입니다. 실제 사업 정보로 교체하기 전, 고객이 문의부터 현장 확인까지 자연스럽게 이동할 수 있는 페이지 구조를 보여 줍니다.</p>
          <p>현장마다 조건과 공정은 다릅니다. 작업 범위, 자재, 통행 환경, 일정의 우선순위를 먼저 확인하고 필요한 내용을 정리하는 방식을 기본으로 합니다.</p>
          <p>이 페이지의 문구와 사진은 교체용 예시이며, 추후 실제 회사 소개와 시공 이력으로 바꾸기 쉽게 구성되어 있습니다.</p>
          <div className="company-signoff"><span>선진건설 드림</span><b>선진<br />건설</b></div>
          <Link href="/location" className="text-link"><MapPin size={17} /> 오시는 길 보기 <ArrowRight size={17} /></Link>
        </article>
      </section>
    </SiteFrame>
  );
}
