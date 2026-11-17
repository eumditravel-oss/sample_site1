import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { company } from "@/config/company";
import { useConsultationDraft, type ConsultationDraft } from "@/context/ConsultationDraft";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowUpRight, Copy, Mail, Send, ShieldCheck } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "wouter";

export default function Consultation() {
  usePageMeta(
    "온라인 견적·상담 신청",
    "현장 위치, 필요 공정, 희망 일정을 정리해 안전하게 문의 초안을 작성하는 선진건설(주) 온라인상담",
  );
  const { draft, setDraft } = useConsultationDraft();
  const [ready, setReady] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setReady(true);
  }, []);

  const updateField =
    (key: Exclude<keyof ConsultationDraft, "agreed">) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val = e.currentTarget.value;
      setDraft((prev) => ({ ...prev, [key]: val }));
    };

  const composeText = () =>
    [
      `[${company.name} 온라인 견적·상담 신청]`,
      `성함 / 업체명: ${draft.applicantName}`,
      `회신 연락처: ${draft.phone}`,
      `현장 위치: ${draft.location}`,
      `상담 제목: ${draft.title}`,
      `희망 공정: ${draft.workType}`,
      `희망 착수 시기: ${draft.schedule}`,
      "",
      "[상세 문의 내용]",
      draft.message,
      "",
      "※ 현장 사진이나 도면 파일이 있으시면 이메일에 함께 첨부해 주세요.",
    ].join("\n");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.agreed) {
      setFeedback("개인정보 수집·이용 고지 확인에 체크해 주세요.");
      return;
    }
    const subject = `[시공상담] ${draft.title || draft.workType || "현장 견적 문의"} - ${draft.applicantName}`;
    const body = composeText();
    const note = company.email
      ? ""
      : "현재 공식 대표 이메일이 등록 준비 중이므로 열린 메일 창에서 수신자 주소를 직접 입력해 주세요. ";
    setFeedback(`${note}이메일 작성 창에서 내용을 확인하시고 직접 발송해 주세요. 입력 내용은 이 화면에 안전하게 유지됩니다.`);
    window.location.href = `mailto:${company.email ?? ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopy = async () => {
    if (!draft.applicantName.trim() && !draft.location.trim() && !draft.message.trim()) {
      setFeedback("복사할 상담 내용이 없습니다. 주요 항목을 먼저 작성해 주세요.");
      return;
    }
    try {
      if (!navigator.clipboard?.writeText) throw new Error("No clipboard");
      await navigator.clipboard.writeText(composeText());
      setFeedback("작성하신 상담 내용이 클립보드에 복사되었습니다. 웹메일이나 문자·메신저에 붙여넣어 전달하실 수 있습니다.");
    } catch {
      setFeedback("클립보드 복사를 지원하지 않는 환경입니다. 작성된 텍스트를 직접 선택해 복사해 주세요.");
    }
  };

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="ONLINE CONSULTATION"
        title="온라인상담"
        description="현장 위치와 필요 공정을 남겨주시면 검토 후 방문 실측 및 견적 기준을 안내해 드립니다."
        crumbs="온라인상담 / 온라인 견적·상담 신청"
        image="/seonjin-01.jpg"
      />

      <SubLayout section="consultation">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">ZERO-STORAGE SAFE INQUIRY</span>
            <h2>
              현장 여건을 정리해
              <br />
              <em>신속한 견적·실측 검토</em>를 요청하세요.
            </h2>
            <p>
              고객 정보 보호를 위해 본 양식의 입력값은 웹사이트 서버나 브라우저 저장소(localStorage)에 저장되지 않으며, 제출 시 이용자 기기의 이메일 초안으로만 전달됩니다.
            </p>
          </Reveal>

          <noscript>
            <div className="sj-notice-callout">
              <p>온라인 상담 초안 생성 기능은 브라우저의 자바스크립트 활성화가 필요합니다.</p>
            </div>
          </noscript>

          <form className="sj-consult-form" onSubmit={handleSubmit}>
            <div className="sj-consult-form__grid">
              <div>
                <label htmlFor="sj-name">성함 / 업체(단지)명 *</label>
                <input
                  id="sj-name"
                  name="applicantName"
                  required
                  disabled={!ready}
                  autoComplete="name"
                  placeholder="예: 홍길동 / OO아파트 관리사무소"
                  value={draft.applicantName}
                  onChange={updateField("applicantName")}
                />
              </div>

              <div>
                <label htmlFor="sj-phone">회신 연락처 *</label>
                <input
                  id="sj-phone"
                  name="phone"
                  type="tel"
                  required
                  disabled={!ready}
                  autoComplete="tel"
                  placeholder="예: 010-1234-5678 또는 일반전화"
                  value={draft.phone}
                  onChange={updateField("phone")}
                />
              </div>

              <div className="is-full">
                <label htmlFor="sj-location">현장 위치 (주소) *</label>
                <input
                  id="sj-location"
                  name="location"
                  required
                  disabled={!ready}
                  placeholder="시·군·구 및 도로명/지번 주소 (개략 위치 가능)"
                  value={draft.location}
                  onChange={updateField("location")}
                />
              </div>

              <div>
                <label htmlFor="sj-worktype">필요 공정 유형 *</label>
                <select
                  id="sj-worktype"
                  name="workType"
                  required
                  disabled={!ready}
                  value={draft.workType}
                  onChange={updateField("workType")}
                >
                  <option value="" disabled>
                    공정 유형을 선택하세요
                  </option>
                  <option value="경계·도로 구조물 시공">경계·도로 구조물 시공 (경계석·연석·낮춤)</option>
                  <option value="보행환경·블록 포장 정비">보행환경·블록 포장 정비 (보도·투수·점자블록)</option>
                  <option value="우수·배수로 및 관로 부대토목">우수·배수로 및 관로 부대토목 (측구·그레이팅)</option>
                  <option value="외부 기반시설·옹벽 유지보수">외부 기반시설·옹벽 유지보수 (보강토·석축·보수)</option>
                  <option value="복합 공정 · 현장 진단 요청">복합 공정 · 현장 방문 진단 요청</option>
                </select>
              </div>

              <div>
                <label htmlFor="sj-schedule">희망 착수 시기 *</label>
                <select
                  id="sj-schedule"
                  name="schedule"
                  required
                  disabled={!ready}
                  value={draft.schedule}
                  onChange={updateField("schedule")}
                >
                  <option value="" disabled>
                    희망 시기를 선택하세요
                  </option>
                  <option value="2주 이내 빠른 착수 희망">2주 이내 빠른 착수 희망</option>
                  <option value="1개월 이내 일정 협의">1개월 이내 일정 협의</option>
                  <option value="예산 검토용 사전 견적 문의">예산 검토용 사전 견적 문의</option>
                  <option value="일정 미정 (실측 후 결정)">일정 미정 (실측 후 결정)</option>
                </select>
              </div>

              <div className="is-full">
                <label htmlFor="sj-title">상담 제목 *</label>
                <input
                  id="sj-title"
                  name="title"
                  required
                  disabled={!ready}
                  placeholder="예: 단지 내 보도블록 침하 보수 및 배수 측구 정비 문의"
                  value={draft.title}
                  onChange={updateField("title")}
                />
              </div>

              <div className="is-full">
                <label htmlFor="sj-message">상세 문의 내용 *</label>
                <textarea
                  id="sj-message"
                  name="message"
                  rows={6}
                  required
                  disabled={!ready}
                  placeholder="대략적인 작업 길이(m)나 면적(㎡), 파손 상태, 장비 진입 가능 여부 등을 적어주시면 더욱 정확한 안내가 가능합니다."
                  value={draft.message}
                  onChange={updateField("message")}
                />
              </div>
            </div>

            {/* 법정 4대 고지사항 요약 */}
            <div className="sj-consent-panel" aria-label="개인정보 수집 및 이용 법정 고지사항">
              <div className="sj-consent-panel__title">
                <ShieldCheck size={17} aria-hidden="true" />
                <strong>개인정보 수집·이용 안내 (개인정보 보호법 제15조 제2항 필수 고지)</strong>
              </div>
              <div className="sj-table-wrap">
                <table className="sj-spec-table">
                  <caption>온라인상담 개인정보 수집·이용 고지</caption>
                  <tbody>
                    <tr>
                      <th scope="row">수집·이용 목적</th>
                      <td>공사 견적·실측 문의 내용 확인, 현장 검토 및 회신 연락</td>
                    </tr>
                    <tr>
                      <th scope="row">수집 항목</th>
                      <td>성함(업체명), 연락처, 현장 위치, 상담 제목·내용 및 이메일 발신 시 발신자 메일 주소</td>
                    </tr>
                    <tr>
                      <th scope="row">보유 및 이용기간</th>
                      <td>웹사이트 서버 미저장 / 이메일 수신 건은 상담 종료 후 지체 없이 파기 (법령 보존 대상 예외)</td>
                    </tr>
                    <tr>
                      <th scope="row">동의 거부권 안내</th>
                      <td>동의를 거부할 권리가 있으며, 미동의 시 온라인 이메일 상담 초안 생성이 제한됩니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="sj-consent-panel__check">
                <input
                  id="sj-agree"
                  type="checkbox"
                  required
                  disabled={!ready}
                  checked={draft.agreed}
                  onChange={(e) => {
                    const checked = e.currentTarget.checked;
                    setDraft((p) => ({ ...p, agreed: checked }));
                  }}
                />
                <div>
                  <label htmlFor="sj-agree">
                    [필수] 위 개인정보 수집·이용 고지 사항을 확인하였으며 이에 동의합니다.
                  </label>
                  <Link href="/privacy">
                    개인정보처리방침 전문 보기 <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {!company.email && (
              <p className="sj-consult-form__info">
                <Mail size={16} /> 현재 대표 수신 이메일이 확정 준비 중입니다. 이메일 작성 창에서 수신 주소를 직접 입력하시거나 아래 [상담 내용 복사] 버튼을 함께 활용해 주세요.
              </p>
            )}

            <div className="sj-consult-form__actions">
              <button type="submit" className="sj-btn sj-btn--primary" disabled={!ready}>
                <Send size={16} /> 이메일 상담 초안 열기
              </button>
              <button type="button" className="sj-btn sj-btn--outline" disabled={!ready} onClick={handleCopy}>
                <Copy size={16} /> 상담 내용 클립보드 복사
              </button>
            </div>

            {feedback && (
              <output className="sj-consult-form__output" aria-live="polite">
                {feedback}
              </output>
            )}
          </form>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
