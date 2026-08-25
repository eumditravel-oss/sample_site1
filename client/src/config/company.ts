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

export const companySetupNotes = {
  phone: "대표전화 확정 후 company.phone에 입력",
  email: "대표 이메일 확정 후 company.email에 입력",
  address: "사업장 주소 확정 후 company.address에 입력",
  businessHours: "상담 가능 시간 확정 후 company.businessHours에 입력",
} as const;
