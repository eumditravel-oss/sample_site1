import { describe, expect, it } from "vitest";
import { buildInquiryText, buildMailto, validateInquiry, type InquiryValues } from "./inquiry";

const valid: InquiryValues = {
  name: "홍길동",
  contact: "contact@example.com",
  location: "서울시 작업 구간",
  workType: "보행로·블록 정비",
  schedule: "일정 협의",
  message: "보행로 단차와 배수 상태 확인을 요청합니다.",
};

describe("inquiry helpers", () => {
  it("requires every field and agreement", () => {
    expect(Object.keys(validateInquiry({ name: "", contact: "", location: "", workType: "", schedule: "", message: "" }, false))).toHaveLength(7);
  });

  it("accepts a complete inquiry", () => {
    expect(validateInquiry(valid, true)).toEqual({});
  });

  it("builds truthful copy and encoded mailto", () => {
    expect(buildInquiryText(valid)).toContain("사진과 도면은 이메일 앱에서 직접 첨부");
    const mailto = buildMailto("office@example.com", valid);
    expect(mailto).toMatch(/^mailto:office@example.com\?subject=/);
    expect(decodeURIComponent(mailto)).toContain(valid.message);
  });
});
