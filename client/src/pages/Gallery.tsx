/**
 * Design reference: spacious visual archive displaying replaceable project images in an orderly card grid.
 */
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const workItems = [
  ["보행로 정비", "/manus-storage/construction-hero_9277bcc5.jpg"],
  ["경계 구조 시공", "/manus-storage/construction-hero-2_76fd72ca.jpg"],
  ["블록 포장 공정", "/manus-storage/construction-hero-3_cc7a91dc.jpg"],
  ["기반 시설 정비", "/manus-storage/construction-hero_9277bcc5.jpg"],
  ["외부 공간 마감", "/manus-storage/construction-hero-2_76fd72ca.jpg"],
  ["완료 현장 기록", "/manus-storage/construction-hero-3_cc7a91dc.jpg"],
];

export default function Gallery() {
  return (
    <SiteFrame>
      <PageTitle title="기술 소개" subtitle="TECHNICAL ARCHIVE" image="/manus-storage/construction-hero-3_cc7a91dc.jpg" />
      <section className="sub-layout">
        <SubNavigation section="gallery" />
        <article className="sub-content gallery-content">
          <p className="gallery-content__intro">ㅇㅇ토건의 시공 결과와 현장 기록을 보여 주는 기술 소개 아카이브입니다. 실제 작업 사진으로 편리하게 교체할 수 있습니다.</p>
          <div className="gallery-grid">{workItems.map(([title, image], index) => <article className="gallery-grid__item" key={`${title}-${index}`}><div><img src={image} alt={`${title} 예시 사진`} /></div><h2>{title}</h2><p>2026.08.{String(18 - index).padStart(2, "0")}</p></article>)}</div>
          <div className="pagination"><button type="button" className="is-active">1</button><button type="button">2</button></div>
        </article>
      </section>
    </SiteFrame>
  );
}
