export type NoticeCategory = "이용 안내" | "상담 안내" | "시공 안내";

export type Notice = {
  id: string;
  category: NoticeCategory;
  title: string;
  summary: string;
  body: string[];
};

export const notices: Notice[] = [
  {
    id: "email-inquiry",
    category: "이용 안내",
    title: "이메일 문의 이용 방법",
    summary: "사이트에 내용을 저장하지 않고 문의 내용을 정리하거나 이메일 앱으로 전달하는 방법을 안내합니다.",
    body: [
      "문의 화면에 입력한 내용은 이 웹사이트의 서버나 데이터베이스에 저장되지 않습니다.",
      "대표 이메일이 설정된 경우에는 입력 내용을 바탕으로 이메일 초안을 열 수 있으며, 사진과 도면은 메일 앱에서 직접 첨부해 주세요.",
      "이메일 앱을 사용할 수 없는 환경에서는 정리된 문의 내용을 복사해 원하는 연락 수단에 붙여 넣을 수 있습니다.",
    ],
  },
  {
    id: "before-consultation",
    category: "상담 안내",
    title: "상담 전에 준비하면 좋은 자료",
    summary: "현장 위치, 필요한 작업 범위, 희망 일정과 사진을 미리 준비하면 상담이 빨라집니다.",
    body: [
      "현장 주소 또는 작업 구간을 확인해 주세요.",
      "필요한 공정과 불편한 점을 간단히 정리해 주세요.",
      "현장 전경과 보수가 필요한 부분의 사진이 있으면 메일 앱에서 첨부해 주세요.",
      "희망 시기는 확정 일정이 아니라 상담을 위한 참고 정보로 전달됩니다.",
    ],
  },
  {
    id: "work-process",
    category: "시공 안내",
    title: "시공 상담 진행 순서",
    summary: "문의 확인부터 현장 확인, 견적 안내, 시공과 완료 확인까지의 기본 흐름입니다.",
    body: [
      "문의 내용을 확인한 뒤 현장 조건과 필요한 작업 범위를 정리합니다.",
      "현장 확인이 필요한 경우 방문 일정과 확인 항목을 협의합니다.",
      "작업 범위와 자재, 일정에 따라 견적과 진행 기준을 안내합니다.",
      "시공 후에는 요청 범위와 마감 상태를 함께 확인합니다.",
    ],
  },
];

export const noticeCategories: Array<"전체" | NoticeCategory> = ["전체", "이용 안내", "상담 안내", "시공 안내"];

export function getNotice(id: string) {
  return notices.find((notice) => notice.id === id);
}
