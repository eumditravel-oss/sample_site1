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
          <div className="service-lead"><p className="content-kicker">PROJECT STRUCTURE</p><h2>공정별 확인 내용을<br /><em>현장 자료 구조로 정리합니다.</em></h2><p>현재 사진·지역·기간은 회사 자료 수령 전 화면 구성을 보여 주는 샘플입니다. 실제 현장 자료를 받으면 같은 카드 구조에서 순차적으로 교체합니다.</p></div>
          <div className="gallery-grid production-gallery-grid">{projectCards.map((project) => <article className="gallery-grid__item" key={project.title}><div><img src={project.thumbnail} alt={`${project.title} ${project.isSample ? "샘플" : "현장"} 이미지`} />{project.isSample && <span className="sample-data-badge">샘플 이미지</span>}</div><p className="content-kicker">{project.category}</p><h2>{project.title}</h2><p>{project.description}</p><ul>{project.scope.map((item) => <li key={item}>{item}</li>)}</ul>{project.location && <small>지역 {project.location} {project.isSample && "(샘플)"}</small>}{project.period && <small>기간 {project.period} {project.isSample && "(샘플)"}</small>}</article>)}</div>
        </article>
      </section>
    </SiteFrame>
  );
}
