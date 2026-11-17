import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { useConsultationDraft } from "@/context/ConsultationDraft";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, CheckSquare, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const workOptions = [
  "경계·도로 구조물 시공",
  "보행환경·블록 포장 정비",
  "우수·배수로 및 관로 부대토목",
  "외부 기반시설·옹벽 유지보수",
];

const scheduleOptions = [
  "2주 이내 빠른 착수 희망",
  "1개월 이내 일정 협의",
  "예산 검토용 사전 견적 문의",
];

export default function PreConsultation() {
  usePageMeta(
    "상담 전 확인사항",
    "신속하고 정확한 현장 실측·견적 검토를 위해 상담 전 확인하면 좋은 자가 체크리스트",
  );
  const [, setLocation] = useLocation();
  const { draft, setDraft } = useConsultationDraft();
  const [hasAddress, setHasAddress] = useState(true);
  const [hasPhotos, setHasPhotos] = useState(false);
  const [hasEquipmentAccess, setHasEquipmentAccess] = useState(true);

  const applyToConsultation = () => {
    const memoLines = [
      hasAddress ? "· 현장 주소(시·군·구/번지) 확인 완료" : "· 정확한 번지는 협의 시 추가 안내 예정",
      hasPhotos ? "· 현장 전경 및 보수 구간 사진 준비 완료 (이메일 첨부 가능)" : "· 현장 사진은 추후 촬영 또는 방문 실측 희망",
      hasEquipmentAccess ? "· 1톤 트럭 / 미니 굴착기 진입 가능 여건" : "· 협소 구간으로 장비 진입 여건 현장 확인 필요",
    ].join("\n");

    setDraft((prev) => ({
      ...prev,
      title: prev.workType ? `[${prev.workType}] 현장 검토 및 견적 문의` : "현장 실측 및 시공 견적 문의",
      message: prev.message ? `${prev.message}\n\n${memoLines}` : `[사전 체크사항]\n${memoLines}\n\n[추가 요청 내용]\n`,
    }));
    setLocation("/consultation");
  };

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="PRE-CONSULTATION CHECKLIST"
        title="상담 전 확인사항"
        description="아래 항목을 먼저 점검해 주시면 현장 실측과 견적 산출이 훨씬 정확하고 빨라집니다."
        crumbs="고객센터 / 상담 전 확인사항"
        image="/seonjin-06.jpg"
      />

      <SubLayout section="notices">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">STEP-BY-STEP PREPARATION</span>
            <h2>
              상담 전 3분 체크리스트로
              <br />
              <em>현장 조건을 간편하게 정리</em>하세요.
            </h2>
            <p>선택하신 항목은 [온라인상담 작성하기] 버튼을 누르면 상담 양식에 자동으로 채워집니다.</p>
          </Reveal>

          <Reveal className="sj-precheck-box">
            <div className="sj-precheck-group">
              <h3>1. 필요한 주력 공정을 선택해 주세요</h3>
              <div className="sj-precheck-chips">
                {workOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={draft.workType === opt ? "is-selected" : ""}
                    onClick={() => setDraft((p) => ({ ...p, workType: opt }))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="sj-precheck-group">
              <h3>2. 희망 착수 시기를 선택해 주세요</h3>
              <div className="sj-precheck-chips">
                {scheduleOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={draft.schedule === opt ? "is-selected" : ""}
                    onClick={() => setDraft((p) => ({ ...p, schedule: opt }))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="sj-precheck-group">
              <h3>3. 현장 준비 상태를 체크해 주세요</h3>
              <div className="sj-precheck-checks">
                <label>
                  <input type="checkbox" checked={hasAddress} onChange={(e) => setHasAddress(e.target.checked)} />
                  <div>
                    <strong>현장 위치(시·군·구 또는 도로명/지번 주소)를 알고 있습니다.</strong>
                    <span>대략적인 작업 연장(m)이나 면적(㎡)을 함께 알려주시면 더욱 좋습니다.</span>
                  </div>
                </label>
                <label>
                  <input type="checkbox" checked={hasPhotos} onChange={(e) => setHasPhotos(e.target.checked)} />
                  <div>
                    <strong>현장 전경 및 작업 필요 구간의 사진이 준비되어 있습니다.</strong>
                    <span>전체 동선이 보이는 사진 1~2장과 바닥·경계 상태 근접 사진이 큰 도움이 됩니다.</span>
                  </div>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={hasEquipmentAccess}
                    onChange={(e) => setHasEquipmentAccess(e.target.checked)}
                  />
                  <div>
                    <strong>작업 구간 인근까지 차량·소형 장비 진입이 가능합니다.</strong>
                    <span>지하주차장 상부 슬래브나 협소 통로인 경우 하중·진입폭을 별도 검토합니다.</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="sj-precheck-submit">
              <div>
                <ClipboardCheck size={20} />
                <span>체크한 조건을 바탕으로 바로 상담 초안을 작성할 수 있습니다.</span>
              </div>
              <button type="button" className="sj-btn sj-btn--primary" onClick={applyToConsultation}>
                <CheckSquare size={16} /> 선택 내용으로 온라인상담 작성하기 <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
