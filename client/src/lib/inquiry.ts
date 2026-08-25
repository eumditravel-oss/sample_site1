export type InquiryValues = {
  name: string;
  contact: string;
  location: string;
  workType: string;
  schedule: string;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryValues | "agreement", string>>;

export function validateInquiry(values: InquiryValues, agreed: boolean): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = "성함을 입력해 주세요.";
  if (!values.contact.trim()) errors.contact = "연락 가능한 정보를 입력해 주세요.";
  if (!values.location.trim()) errors.location = "현장 위치를 입력해 주세요.";
  if (!values.workType) errors.workType = "필요 공정을 선택해 주세요.";
  if (!values.schedule) errors.schedule = "희망 시기를 선택해 주세요.";
  if (values.message.trim().length < 10) errors.message = "문의 내용을 10자 이상 입력해 주세요.";
  if (!agreed) errors.agreement = "개인정보 수집 및 이용에 동의해 주세요.";
  return errors;
}

export function buildInquiryText(values: InquiryValues) {
  return [
    "[선진건설 공사 상담 문의]",
    "",
    `성함: ${values.name.trim()}`,
    `연락 정보: ${values.contact.trim()}`,
    `현장 위치: ${values.location.trim()}`,
    `필요 공정: ${values.workType}`,
    `희망 시기: ${values.schedule}`,
    "",
    "문의 내용",
    values.message.trim(),
    "",
    "※ 사진과 도면은 이메일 앱에서 직접 첨부합니다.",
  ].join("\n");
}

export function buildMailto(email: string, values: InquiryValues) {
  const subject = `[공사 상담 문의] ${values.workType} - ${values.name.trim()}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryText(values))}`;
}

export async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
