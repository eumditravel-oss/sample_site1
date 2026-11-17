import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { useConsultationDraft } from "@/context/ConsultationDraft";
import { civilScopes } from "@/data/civilData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { assetPath } from "@/lib/assets";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Link } from "wouter";

export default function ServiceScope() {
  usePageMeta(
    "전문 공정 범위",
    "경계 구조물, 보행로·블록 포장, 우수·배수로 정비, 외부 기반시설 보수 등 선진건설(주) 시공 범위 안내",
  );
  const { setDraft } = useConsultationDraft();

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="PROFESSIONAL WORK SCOPE"
        title="공정 범위"
        description="경계 구조물부터 보행포장, 배수 측구, 외부 기반 보수까지 공정별 세부 시공 기준을 안내합니다."
        crumbs="시공분야 / 전문 공정 범위"
        image="/seonjin-01.jpg"
      />

      <SubLayout section="services">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">WORK SCOPE SPECIFICATION</span>
            <h2>
              현장 목적과 하중 조건에 맞춘
              <br />
              <em>4대 전문 시공 영역</em>
            </h2>
            <p>
              단순 표면 교체가 아니라 원지반 다짐과 배수 연결, 인접 구조물과의 정합성을 함께 검토하여 재하자 없는 시공 범위를 설계합니다.
            </p>
          </Reveal>

          <div className="sj-scope-detail-list">
            {civilScopes.map((scope) => (
              <Reveal key={scope.slug} className="sj-scope-detail">
                <div className="sj-scope-detail__media">
                  <img
                    src={assetPath(scope.image)}
                    alt={`${scope.title} — ${scope.shortDesc}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{scope.code}</span>
                </div>
                <div className="sj-scope-detail__content">
                  <div className="sj-scope-detail__head">
                    <span className="sj-tag">{scope.category}</span>
                    <h3>{scope.title}</h3>
                    <p>{scope.summary}</p>
                  </div>

                  <dl className="sj-scope-detail__meta">
                    <div>
                      <dt>적용 대상 현장</dt>
                      <dd>{scope.targets}</dd>
                    </div>
                    <div>
                      <dt>주요 투입 자재</dt>
                      <dd>{scope.materials}</dd>
                    </div>
                  </dl>

                  <div className="sj-scope-detail__cols">
                    <div>
                      <strong>세부 시공 공정</strong>
                      <ul>
                        {scope.subWorks.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong>핵심 검측 기준</strong>
                      <ul>
                        {scope.checkPoints.map((c) => (
                          <li key={c}>
                            <CheckCircle2 size={14} aria-hidden="true" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sj-scope-detail__foot">
                    <Link
                      href="/consultation"
                      className="sj-inline-link"
                      onClick={() => setDraft((prev) => ({ ...prev, workType: scope.title }))}
                    >
                      [{scope.title}] 견적·실측 상담 신청 <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="sj-section-block">
            <div className="sj-block-head">
              <span>ESTIMATE BOUNDARY GUIDE</span>
              <h3>견적 검토 시 포함 · 별도 협의 구분 기준</h3>
            </div>
            <div className="sj-notice-callout">
              <Info size={20} aria-hidden="true" />
              <div>
                <strong>투명한 내역 산출을 위해 사전 구분하여 안내합니다.</strong>
                <p>
                  기본 시공비(자재·노무·장비) 외에 현장 조건에 따라 달라지는 <strong>① 기존 철거 폐기물 수집·운반·처리비, ② 지하 매설 지장물(통신·배관·전선관) 이설, ③ 관공서 도로점용·굴착 인허가 대행, ④ 야간·휴일 지정 작업 할증</strong> 여부는 현장 실측 후 견적서에 포함/별도 항목으로 명확히 표기해 드립니다.
                </p>
              </div>
            </div>
          </Reveal>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
