export const company = {
  name: "선진건설(주)",
  legalName: "선진건설 주식회사",
  nameEn: "SEONJIN CONSTRUCTION CO., LTD.",
  ceo: null as string | null,
  businessNumber: null as string | null,
  licenseInfo: null as string | null,
  phone: null as string | null,
  fax: null as string | null,
  email: null as string | null,
  address: null as string | null,
  hours: "평일 08:30 – 18:00 (현장 실측 일정 사전 협의 가능 / 주말·공휴일 휴무)",
  serviceRegion: "수도권 및 전국 주요 현장 (세부 시공 권역 업체 확인 후 고시)",
  privacyOfficer: null as string | null,
  privacyDepartment: "공무·관리팀 (담당자 정보 확인 후 고시)",
  policyEffectiveDate: "2026년 11월 17일",
  copyright: `Copyright © ${new Date().getFullYear()} 선진건설(주) SEONJIN CONSTRUCTION CO., LTD. All rights reserved.`,
} as const;

export const hasPublishedContact = Boolean(company.phone || company.email || company.address);
