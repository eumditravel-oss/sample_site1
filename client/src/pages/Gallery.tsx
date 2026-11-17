import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { useConsultationDraft } from "@/context/ConsultationDraft";
import { techArchiveItems, type TechArchiveItem } from "@/data/civilData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { assetPath } from "@/lib/assets";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const categories: Array<"전체" | TechArchiveItem["category"]> = [
  "전체",
  "경계·도로",
  "보행·포장",
  "배수·관로",
  "옹벽·검측",
];

export default function Gallery() {
  usePageMeta(
    "기술 및 시공 가이드",
    "공종별 핵심 시공 디테일과 현장 검측 포인트를 소개하는 선진건설(주) 기술 아카이브",
  );
  const { setDraft } = useConsultationDraft();
  const [selectedCat, setSelectedCat] = useState<(typeof categories)[number]>("전체");
  const [activeItem, setActiveItem] = useState<TechArchiveItem | null>(null);

  const filtered =
    selectedCat === "전체"
      ? techArchiveItems
      : techArchiveItems.filter((item) => item.category === selectedCat);

  useEffect(() => {
    if (!activeItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeItem]);

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="TECHNICAL ARCHIVE"
        title="기술 소개"
        description="공종별 핵심 시공 디테일과 선진건설(주)이 중점 관리하는 현장 검측 포인트를 소개합니다."
        crumbs="기술 소개 / 기술 · 시공 아카이브"
        image="/seonjin-05.jpg"
      />

      <SubLayout section="gallery">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">CONSTRUCTION QUALITY ARCHIVE</span>
            <h2>
              공종별 핵심 시공 포인트와
              <br />
              <em>현장 품질 검측 기준</em>
            </h2>
            <p>
              아래 아카이브는 각 공종에서 하자를 예방하고 내구성을 높이기 위해 당사가 적용하는 핵심 기술 기준입니다. 발주처 공개 동의가 완료된 실제 준공 현장 사진은 순차적으로 추가 등재됩니다.
            </p>
          </Reveal>

          <div className="sj-filter-tabs" role="tablist" aria-label="공종별 기술 분류">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCat === cat}
                className={selectedCat === cat ? "is-active" : ""}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sj-gallery-grid">
            {filtered.map((item) => (
              <Reveal key={item.id} className="sj-gallery-card">
                <div className="sj-gallery-card__img">
                  <img src={assetPath(item.image)} alt="" />
                  <span>{item.category}</span>
                </div>
                <div className="sj-gallery-card__body">
                  <small>{item.subtitle}</small>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.specList.map((spec) => (
                      <li key={spec}>
                        <CheckCircle2 size={14} aria-hidden="true" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="sj-gallery-card__btn sj-js-only"
                    onClick={() => setActiveItem(item)}
                  >
                    상세 기준 확대 보기 <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </article>
      </SubLayout>

      {activeItem && (
        <div
          className="sj-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sj-tech-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveItem(null);
          }}
        >
          <div className="sj-modal">
            <div className="sj-modal__media">
              <img src={assetPath(activeItem.image)} alt="" />
              <span>{activeItem.category}</span>
            </div>
            <div className="sj-modal__body">
              <div className="sj-modal__top">
                <span>{activeItem.subtitle}</span>
                <button type="button" onClick={() => setActiveItem(null)} aria-label="상세 창 닫기">
                  <X size={20} />
                </button>
              </div>
              <h2 id="sj-tech-modal-title">{activeItem.title}</h2>
              <p>{activeItem.description}</p>
              <div className="sj-modal__box">
                <strong>현장 필수 검측 리스트</strong>
                <ul>
                  {activeItem.specList.map((spec) => (
                    <li key={spec}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sj-modal__actions">
                <Link
                  href="/consultation"
                  className="sj-btn sj-btn--primary"
                  onClick={() => {
                    setDraft((prev) => ({ ...prev, title: `${activeItem.title} 관련 상담 문의` }));
                    setActiveItem(null);
                  }}
                >
                  유사 현장 상담 신청하기 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteFrame>
  );
}
