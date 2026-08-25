import { projectCards } from "@/data/projects";
import { assetUrl } from "@/lib/siteAssets";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

export default function Gallery() {
  return (
    <SiteFrame>
      <PageTitle title="현장사례" subtitle="FIELD CASES" crumbs="현장사례 / 시공사례" image={assetUrl("/media/construction-hero-3_cc7a91dc.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="gallery" />
        <article className="sub-content gallery-content">
          <div className="service-lead"><p className="content-kicker">PROJECT STRUCTURE</p><h2>공정별 확인 내용을<br /><em>현장 자료 구조로 정리합니다.</em></h2><p>현재 등록된 자료는 작업 범위를 설명하기 위한 공정별 구성입니다. 실제 위치와 기간은 확인된 자료가 등록될 때만 표시됩니다.</p></div>
          <div className="gallery-grid production-gallery-grid">{projectCards.map((project) => <article className="gallery-grid__item" key={project.title}><div><img src={project.thumbnail} alt={`${project.title} 공정 안내 이미지`} /></div><p className="content-kicker">{project.category}</p><h2>{project.title}</h2><p>{project.description}</p><ul>{project.scope.map((item) => <li key={item}>{item}</li>)}</ul>{project.location && <small>지역 {project.location}</small>}{project.period && <small>기간 {project.period}</small>}</article>)}</div>
        </article>
      </section>
    </SiteFrame>
  );
}
