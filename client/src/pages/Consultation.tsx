import { company } from "@/config/company";
import { buildInquiryText, buildMailto, copyText, validateInquiry, type InquiryErrors, type InquiryValues } from "@/lib/inquiry";
import { assetUrl } from "@/lib/siteAssets";
import { Clipboard, Mail, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const emptyValues: InquiryValues = { name: "", contact: "", location: "", workType: "", schedule: "", message: "" };

export default function Consultation() {
  const [route] = useLocation();
  const preset = useMemo(() => {
    const hashQuery = route.split("?")[1] ?? "";
    return new URLSearchParams(hashQuery || window.location.search);
  }, [route]);
  const [values, setValues] = useState<InquiryValues>(() => ({ ...emptyValues, workType: preset.get("workType") ?? "", schedule: preset.get("schedule") ?? "" }));
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [completed, setCompleted] = useState<"copied" | "email" | null>(null);

  const update = (key: keyof InquiryValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setCompleted(null);
  };

  const check = () => {
    const next = validateInquiry(values, agreed);
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("입력 내용을 확인해 주세요.");
      return false;
    }
    return true;
  };

  const handleCopy = async (event: FormEvent) => {
    event.preventDefault();
    if (!check()) return;
    try {
      await copyText(buildInquiryText(values));
      setCompleted("copied");
      toast.success("상담 내용을 복사했습니다.");
    } catch {
      toast.error("상담 내용을 복사하지 못했습니다.");
    }
  };

  const handleEmail = () => {
    if (!company.email || !check()) return;
    setCompleted("email");
    window.location.href = buildMailto(company.email, values);
  };

  return (
    <SiteFrame>
      <PageTitle title="이메일 문의" subtitle="EMAIL INQUIRY" crumbs="상담안내 / 이메일 문의" image={assetUrl("/media/construction-hero-2_76fd72ca.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="consultation" />
        <article className="sub-content consultation-form-only">
          <section className="production-inquiry" aria-labelledby="inquiry-title">
            <p className="content-kicker">WRITE & COPY</p>
            <h2 id="inquiry-title">상담에 필요한 내용을<br />한 번에 정리하세요.</h2>
            <p className="production-inquiry__intro">입력 내용은 이 사이트에 저장되지 않습니다. 작성 후 내용을 복사하거나, 대표 이메일이 설정된 경우 이메일 초안을 열 수 있습니다.</p>
            {completed && <div className="consultation-complete" role="status"><strong>{completed === "copied" ? "상담 내용을 복사했습니다." : "이메일 작성 창을 열었습니다."}</strong><p>사진과 도면은 이메일 앱에서 직접 첨부해 주세요.</p></div>}
            <form className="consultation-form production-inquiry__form" onSubmit={handleCopy} noValidate>
              {Object.keys(errors).length > 0 && <div className="consultation-form__errors" role="alert"><strong>입력 내용을 확인해 주세요.</strong><ul>{Object.values(errors).filter(Boolean).map((error) => <li key={error}>{error}</li>)}</ul></div>}
              <div className="form-row"><label htmlFor="inquiry-name">성함 <em>*</em></label><input id="inquiry-name" value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} /></div>
              <div className="form-row"><label htmlFor="inquiry-contact">연락 정보 <em>*</em></label><input id="inquiry-contact" value={values.contact} onChange={(event) => update("contact", event.target.value)} placeholder="전화번호 또는 이메일" aria-invalid={Boolean(errors.contact)} /></div>
              <div className="form-row"><label htmlFor="inquiry-location">현장 위치 <em>*</em></label><input id="inquiry-location" value={values.location} onChange={(event) => update("location", event.target.value)} placeholder="시·군·구 또는 현장 주소" aria-invalid={Boolean(errors.location)} /></div>
              <div className="form-row"><label htmlFor="inquiry-work">필요 공정 <em>*</em></label><select id="inquiry-work" value={values.workType} onChange={(event) => update("workType", event.target.value)} aria-invalid={Boolean(errors.workType)}><option value="">선택해 주세요</option><option>경계 구조 시공</option><option>보행로·블록 정비</option><option>외부 시설 보수</option><option>현장 부대 공정</option><option>확인 필요</option></select></div>
              <div className="form-row"><label htmlFor="inquiry-schedule">희망 시기 <em>*</em></label><select id="inquiry-schedule" value={values.schedule} onChange={(event) => update("schedule", event.target.value)} aria-invalid={Boolean(errors.schedule)}><option value="">선택해 주세요</option><option>1주 이내</option><option>1개월 이내</option><option>일정 협의</option></select></div>
              <div className="form-row form-row--textarea"><label htmlFor="inquiry-message">문의 내용 <em>*</em></label><textarea id="inquiry-message" value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="작업 구간, 현재 상태, 확인이 필요한 내용을 적어 주세요." aria-invalid={Boolean(errors.message)} /></div>
              <p className="production-inquiry__attachment">사진·도면은 웹사이트에 업로드되지 않습니다. 이메일 앱에서 직접 첨부해 주세요.</p>
              <label className="agreement"><input type="checkbox" checked={agreed} onChange={(event) => { setAgreed(event.target.checked); setErrors((current) => ({ ...current, agreement: undefined })); }} /><span><em>*</em> <Link href="/privacy">개인정보처리방침</Link>을 확인했으며 문의 문안 작성에 동의합니다.</span></label>
              <div className="production-inquiry__actions"><button className="form-submit" type="submit"><Clipboard size={15} /> 상담 내용 복사</button>{company.email && <button className="form-submit form-submit--secondary" type="button" onClick={handleEmail}><Send size={15} /> 이메일 앱 열기</button>}</div>
            </form>
            {!company.email && <div className="production-config-note"><Mail size={18} /><p>대표 이메일이 확정되면 이메일 앱 열기 기능이 활성화됩니다. 현재는 상담 내용을 복사해 사용할 수 있습니다.</p></div>}
          </section>
        </article>
      </section>
    </SiteFrame>
  );
}
