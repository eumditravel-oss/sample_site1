import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { seonjinNotices } from "@/data/civilData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

export default function Notices() {
  usePageMeta(
    "공지사항 및 시공 안내",
    "견적 문의 준비 사항, 계절별 품질관리 기준 및 현장 안전 운영 안내를 전하는 선진건설(주) 게시판",
  );
  const [keyword, setKeyword] = useState("");
  const [openId, setOpenId] = useState<string>(seonjinNotices[0]?.id ?? "");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLocaleLowerCase("ko-KR");
    if (!q) return seonjinNotices;
    return seonjinNotices.filter((post) =>
      `${post.badge} ${post.title} ${post.summary} ${post.body.join(" ")}`.toLocaleLowerCase("ko-KR").includes(q),
    );
  }, [keyword]);

  const onSearch = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="CUSTOMER NOTICE & GUIDE"
        title="공지사항"
        description="상담 준비 안내부터 계절별 품질관리, 통행 안전 운영 기준까지 확인하실 수 있습니다."
        crumbs="고객센터 / 공지사항 · 시공안내"
        image="/seonjin-02.jpg"
      />

      <SubLayout section="notices">
        <article className="sj-article">
          <Reveal className="sj-board-toolbar">
            <p>
              {keyword.trim() ? "검색 결과" : "전체 게시물"} <strong>{filtered.length}</strong>건
            </p>
            <form className="sj-board-search sj-js-only" onSubmit={onSearch}>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="제목 또는 안내 키워드를 검색하세요"
                aria-label="공지사항 검색어 입력"
              />
              <button type="submit" aria-label="검색">
                <Search size={17} />
              </button>
            </form>
          </Reveal>

          <div className="sj-notice-board">
            {filtered.length > 0 ? (
              filtered.map((post, idx) => {
                const isOpen = openId === post.id;
                return (
                  <div key={post.id} className={`sj-notice-item ${isOpen ? "is-open" : ""}`}>
                    <div className="sj-notice-item__head">
                      <span className="sj-notice-item__num">{String(filtered.length - idx).padStart(2, "0")}</span>
                      <span className="sj-tag">{post.badge}</span>
                      <button
                        type="button"
                        className="sj-notice-item__trigger"
                        aria-expanded={isOpen}
                        aria-controls={`sj-notice-panel-${post.id}`}
                        onClick={() => setOpenId((prev) => (prev === post.id ? "" : post.id))}
                      >
                        <strong>{post.title}</strong>
                        <small>{post.summary}</small>
                      </button>
                      <time>{post.date}</time>
                      <ChevronDown className="sj-notice-item__chevron" size={18} aria-hidden="true" />
                    </div>
                    <div id={`sj-notice-panel-${post.id}`} className="sj-notice-item__body" hidden={!isOpen}>
                      {post.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="sj-notice-empty">입력하신 검색어와 일치하는 공지사항이 없습니다.</div>
            )}
          </div>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
