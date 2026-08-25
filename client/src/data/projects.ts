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
};

export const projectCards: ProjectCard[] = [
  {
    title: "보행로 정비",
    category: "보행 동선",
    location: null,
    period: null,
    scope: ["단차 확인", "배수 방향", "포장 상태"],
    thumbnail: assetUrl("/media/construction-hero_9277bcc5.jpg"),
    images: [assetUrl("/media/construction-hero_9277bcc5.jpg")],
    description: "보행 폭과 단차, 배수 흐름을 함께 확인해 필요한 정비 범위를 구분합니다.",
  },
  {
    title: "경계 구조 시공",
    category: "경계 마감",
    location: null,
    period: null,
    scope: ["기초 높이", "선형 확인", "진입부 연결"],
    thumbnail: assetUrl("/media/construction-hero-2_76fd72ca.jpg"),
    images: [assetUrl("/media/construction-hero-2_76fd72ca.jpg")],
    description: "경계석과 연석의 높이, 작업 구간의 선형과 연결부 마감을 확인합니다.",
  },
  {
    title: "외부 시설 보수",
    category: "시설 정비",
    location: null,
    period: null,
    scope: ["파손 구간", "사용 동선", "주변 마감"],
    thumbnail: assetUrl("/media/construction-hero-3_cc7a91dc.jpg"),
    images: [assetUrl("/media/construction-hero-3_cc7a91dc.jpg")],
    description: "파손과 단차, 주변 시설과의 연결 상태를 확인해 보수 방향을 정리합니다.",
  },
];
