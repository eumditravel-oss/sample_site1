import { noticeCategories, notices, type NoticeCategory } from "@/data/notices";
import { assetUrl } from "@/lib/siteAssets";
import { ArrowRight, Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

export default function Notices() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<"전체" | NoticeCategory>("전체");
  const filtered = useMemo(() => {
    const query = keyword.trim().toLocaleLowerCase("ko-KR");
    return notices.filter((notice) => (category === "전체" || notice.category === category) && (!query || `${notice.title} ${notice.summary}`.toLocaleLowerCase("ko-KR").includes(query)));
  }, [category, keyword]);

  return (
    <SiteFrame>
      <PageTitle title="공지사항" subtitle="NOTICE" image={assetUrl("/media/construction-hero-3_cc7a91dc.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="notices" />
        <article className="sub-content board-content production-notices">
          <div className="production-notices__controls"><div className="production-notices__filters" aria-label="공지 카테고리">{noticeCategories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><form className="board-search" onSubmit={(event: FormEvent) => event.preventDefault()}><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="제목 또는 내용을 검색하세요" aria-label="공지사항 검색" /><button type="submit" aria-label="검색"><Search size={17} /></button></form></div>
          <p className="production-notices__count">검색 결과 <b>{filtered.length}</b>건</p>
          <div className="production-notice-list">{filtered.length ? filtered.map((notice, index) => <Link href={`/notices/${notice.id}`} key={notice.id}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{notice.category}</small><h2>{notice.title}</h2><p>{notice.summary}</p></div><ArrowRight size={18} /></Link>) : <div className="board-empty">일치하는 공지사항이 없습니다.</div>}</div>
        </article>
      </section>
    </SiteFrame>
  );
}
