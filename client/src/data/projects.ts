import { assetUrl } from "@/lib/siteAssets";

export type ProjectCard = {
  title: string;
  category: string;
  location: string | null;
  period: string | null;
  scope: string[];
  thumbnail: string;
  images: string[];
  description: string;
  isSample: boolean;
};

export const projectCards: ProjectCard[] = [
  {
    title: "보행로 정비",
    category: "보행 동선",
    location: "서울 ○○구",
    period: "2026.08",
    scope: ["단차 확인", "배수 방향", "포장 상태"],
    thumbnail: assetUrl("/media/construction-hero_9277bcc5.jpg"),
    images: [assetUrl("/media/construction-hero_9277bcc5.jpg")],
    description: "보행 폭과 단차, 배수 흐름을 함께 확인해 필요한 정비 범위를 구분합니다.",
    isSample: true,
  },
  {
    title: "경계 구조 시공",
    category: "경계 마감",
    location: "경기 ○○시",
    period: "2026.08",
    scope: ["기초 높이", "선형 확인", "진입부 연결"],
    thumbnail: assetUrl("/media/construction-hero-2_76fd72ca.jpg"),
    images: [assetUrl("/media/construction-hero-2_76fd72ca.jpg")],
    description: "경계석과 연석의 높이, 작업 구간의 선형과 연결부 마감을 확인합니다.",
    isSample: true,
  },
  {
    title: "외부 시설 보수",
    category: "시설 정비",
    location: "인천 ○○구",
    period: "2026.07",
    scope: ["파손 구간", "사용 동선", "주변 마감"],
    thumbnail: assetUrl("/media/construction-hero-3_cc7a91dc.jpg"),
    images: [assetUrl("/media/construction-hero-3_cc7a91dc.jpg")],
    description: "파손과 단차, 주변 시설과의 연결 상태를 확인해 보수 방향을 정리합니다.",
    isSample: true,
  },
  {
    title: "블록 포장 공정",
    category: "포장 정비",
    location: "서울 ○○구",
    period: "2026.07",
    scope: ["기존 포장 상태", "바닥 정리", "연결부 마감"],
    thumbnail: assetUrl("/media/construction-hero_9277bcc5.jpg"),
    images: [assetUrl("/media/construction-hero_9277bcc5.jpg")],
    description: "기존 포장과 접하는 구간을 확인하고 사용 동선에 맞춘 정비 범위를 보여 주는 샘플입니다.",
    isSample: true,
  },
  {
    title: "기반 시설 정비",
    category: "기반 공정",
    location: "경기 ○○시",
    period: "2026.06",
    scope: ["작업 구간", "주변 시설", "마감 기준"],
    thumbnail: assetUrl("/media/construction-hero-2_76fd72ca.jpg"),
    images: [assetUrl("/media/construction-hero-2_76fd72ca.jpg")],
    description: "현장 조건과 주변 시설을 함께 살펴 필요한 기반 공정을 정리하는 샘플 구성입니다.",
    isSample: true,
  },
  {
    title: "외부 공간 마감",
    category: "완료 기록",
    location: "인천 ○○구",
    period: "2026.06",
    scope: ["마감 상태", "이용 동선", "완료 확인"],
    thumbnail: assetUrl("/media/construction-hero-3_cc7a91dc.jpg"),
    images: [assetUrl("/media/construction-hero-3_cc7a91dc.jpg")],
    description: "실제 현장 사진과 완료 정보를 받으면 같은 형식으로 교체할 수 있는 샘플 카드입니다.",
    isSample: true,
  },
];
