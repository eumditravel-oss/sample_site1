/**
 * Design reference: a restrained private consultation board with title search, pagination, and password-gated detail viewing.
 */
import { LockKeyhole, Paperclip, Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

type SelectedPost = { id: number; title: string } | null;

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(value).replace(/\. /g, ".").replace(/\.$/, "");
}

export default function ConsultationList() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<SelectedPost>(null);
  const [password, setPassword] = useState("");
  const [detail, setDetail] = useState<Awaited<ReturnType<ReturnType<typeof trpc.consultation.verifyDetail.useMutation>["mutateAsync"]>> | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const { user, loading: authLoading } = useAuth();
  const utils = trpc.useUtils();
  const listQuery = trpc.consultation.list.useQuery({ page, query });
  const verifyDetail = trpc.consultation.verifyDetail.useMutation({
    onSuccess: (result) => {
      setDetail(result);
      setReplyBody(result.reply?.body ?? "");
      void utils.consultation.list.invalidate();
    },
    onError: (error) => toast.error(error.message || "상세 내용을 확인할 수 없습니다."),
  });
  const upsertReply = trpc.consultation.upsertReply.useMutation({
    onSuccess: (result) => {
      setDetail((current) => current ? { ...current, status: result.status, reply: result.reply } : current);
      toast.success("관리자 답변을 저장했습니다.");
      void utils.consultation.list.invalidate();
    },
    onError: (error) => toast.error(error.message || "답변을 저장하지 못했습니다."),
  });

  useEffect(() => { setPage(1); }, [query]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(searchInput.trim());
  };
  const openPasswordDialog = (post: { id: number; title: string }) => {
    setSelectedPost(post);
    setPassword("");
    setDetail(null);
  };
  const closeDetailDialog = (open: boolean) => {
    if (!open) {
      setSelectedPost(null);
      setPassword("");
      setDetail(null);
      setReplyBody("");
    }
  };
  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPost) return;
    verifyDetail.mutate({ id: selectedPost.id, password });
  };
  const submitReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!detail) return;
    upsertReply.mutate({ postId: detail.id, body: replyBody });
  };
  const data = listQuery.data;
  const boardMessage = listQuery.isLoading ? "상담 리스트를 불러오는 중입니다." : listQuery.isError ? "상담 리스트를 불러오지 못했습니다." : !data?.items.length ? "등록된 상담 게시글이 없습니다." : null;

  return (
    <SiteFrame>
      <PageTitle title="상담 리스트" subtitle="CONSULTATION LIST" crumbs="상담 리스트" image="/manus-storage/construction-hero-2_76fd72ca.jpg" />
      <section className="sub-layout">
        <SubNavigation section="consultation" />
        <article className="sub-content board-content consultation-list-only">
          <div className="board-top"><p>상담 내용은 비공개로 관리됩니다. 제목을 선택한 뒤 등록 시 설정한 비밀번호를 입력해 주세요.</p><form className="board-search" onSubmit={submitSearch}><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="제목을 입력하세요" aria-label="상담 제목 검색" /><button type="submit" aria-label="검색"><Search size={17} /></button></form></div>
          {boardMessage ? <div className="board-empty-state">{boardMessage}</div> : <div className="board-table-wrap"><table className="board-table"><thead><tr><th>번호</th><th>제목</th><th>등록일</th><th>조회</th></tr></thead><tbody>{data?.items.map((item) => <tr key={item.id}><td>{item.id}</td><td><button type="button" className="board-title-button" onClick={() => openPasswordDialog(item)}><LockKeyhole size={14} /> {item.title}<span className={`consultation-status consultation-status--${item.status}`}>{item.status === "answered" ? "답변 완료" : "답변 대기"}</span></button></td><td>{formatDate(item.createdAt)}</td><td>{item.views}</td></tr>)}</tbody></table></div>}
          {data && data.totalPages > 1 && <div className="pagination" aria-label="상담 리스트 페이지 이동">{Array.from({ length: data.totalPages }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" className={pageNumber === page ? "is-active" : ""} onClick={() => setPage(pageNumber)} aria-current={pageNumber === page ? "page" : undefined}>{pageNumber}</button>)}</div>}
        </article>
      </section>
      <Dialog open={Boolean(selectedPost)} onOpenChange={closeDetailDialog}>
        <DialogContent className="border-[#ccd8e2] bg-white sm:max-w-md">
          {!detail ? <form onSubmit={submitPassword}><DialogHeader><DialogTitle>비공개 상담 확인</DialogTitle><DialogDescription>{selectedPost?.title}</DialogDescription></DialogHeader><label className="mt-5 block text-sm font-semibold text-[#31475c]" htmlFor="detail-password">비밀번호</label><input id="detail-password" className="mt-2 h-11 w-full border border-[#cbd7e0] px-3 text-sm" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required autoFocus placeholder="등록 시 설정한 비밀번호" /><DialogFooter className="mt-5"><Button type="submit" disabled={verifyDetail.isPending} className="bg-[#1457b7] hover:bg-[#0f4696]">{verifyDetail.isPending ? "확인 중..." : "상세 내용 확인"}</Button></DialogFooter></form> : <><DialogHeader><DialogTitle>{detail.title}</DialogTitle><DialogDescription>{formatDate(detail.createdAt)} · 조회 {detail.views} <span className={`consultation-status consultation-status--${detail.status}`}>{detail.status === "answered" ? "답변 완료" : "답변 대기"}</span></DialogDescription></DialogHeader><dl className="grid gap-3 border-y border-[#e1e7ec] py-5 text-sm"><div className="grid grid-cols-[76px_1fr] gap-3"><dt className="text-[#728190]">성함</dt><dd>{detail.applicantName}</dd></div><div className="grid grid-cols-[76px_1fr] gap-3"><dt className="text-[#728190]">연락처</dt><dd>{detail.phone}</dd></div><div className="grid grid-cols-[76px_1fr] gap-3"><dt className="text-[#728190]">현장 위치</dt><dd>{detail.location}</dd></div><div className="grid grid-cols-[76px_1fr] gap-3"><dt className="text-[#728190]">공정 유형</dt><dd>{detail.workType}</dd></div><div className="grid grid-cols-[76px_1fr] gap-3"><dt className="text-[#728190]">희망 시기</dt><dd>{detail.schedule}</dd></div></dl><div className="whitespace-pre-wrap text-sm leading-7 text-[#35485b]">{detail.message}</div>{detail.attachments.length > 0 && <section className="detail-attachments"><h3><Paperclip size={15} /> 첨부파일</h3><ul>{detail.attachments.map((attachment) => <li key={attachment.id}><a href={attachment.fileUrl} target="_blank" rel="noreferrer">{attachment.fileName}</a><span>{Math.ceil(attachment.fileSize / 1024)}KB</span></li>)}</ul></section>}<section className="detail-reply"><h3>관리자 답변</h3>{detail.reply ? <p>{detail.reply.body}</p> : <p className="detail-reply__pending">현재 답변을 준비하고 있습니다.</p>}</section>{!authLoading && (user?.role === "admin" ? <form className="detail-reply-form" onSubmit={submitReply}><label htmlFor="admin-reply">관리자 답변 작성</label><textarea id="admin-reply" value={replyBody} onChange={(event) => setReplyBody(event.target.value)} required minLength={2} placeholder="상담 내용을 검토한 뒤 답변을 입력하세요." /><Button type="submit" disabled={upsertReply.isPending} className="bg-[#1457b7] hover:bg-[#0f4696]">{upsertReply.isPending ? "저장 중..." : detail.reply ? "답변 수정" : "답변 등록"}</Button></form> : <button className="admin-login-link" type="button" onClick={startLogin}>관리자 답변 작성</button>)}</>}
        </DialogContent>
      </Dialog>
    </SiteFrame>
  );
}
