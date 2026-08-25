export const company = {
  name: "선진건설",
  legalName: "선진건설(주)",
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  businessHours: null as string | null,
  siteUrl: "https://eumditravel-oss.github.io/sample_site1/",
  logoPath: "/media/brand-mark_5f5a3175.png",
} as const;

/**
 * 실제 회사 정보가 전달되기 전 화면 구성을 유지하기 위한 샘플 값입니다.
 * 이 값들은 링크, 지도 검색, 상담 전송 대상에 사용하지 않습니다.
 */
export const sampleCompany = {
  phone: "010-0000-0000",
  email: "contact@oo-construction.co.kr",
  address: "서울특별시 ○○구 현장로 24, 202호",
  businessHours: "평일 09:00~18:00",
} as const;

export const contentMode = "sample" as "sample" | "production";
export const sampleContentNotice = "회사 정보 수령 전 샘플 콘텐츠가 표시되고 있습니다.";

export const companySetupNotes = {
  phone: "대표전화 확정 후 company.phone에 입력",
  email: "대표 이메일 확정 후 company.email에 입력",
  address: "사업장 주소 확정 후 company.address에 입력",
  businessHours: "상담 가능 시간 확정 후 company.businessHours에 입력",
} as const;
