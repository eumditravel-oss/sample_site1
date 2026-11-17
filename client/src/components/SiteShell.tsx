import { company } from "@/config/company";
import { assetPath } from "@/lib/assets";
import {
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  Mail,
  Menu,
  MessageSquareText,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";

export const navGroups = [
  {
    key: "company",
    label: "회사소개",
    summary: "현장 중심 시공 원칙과 기업 개요",
    href: "/company",
    links: [
      { label: "인사말 · 기업개요", href: "/company" },
      { label: "오시는길 · 시공권역", href: "/location" },
    ],
  },
  {
    key: "services",
    label: "시공분야",
    summary: "4대 전문 공정 범위와 안전 약속",
    href: "/services/scope",
    links: [
      { label: "전문 공정 범위", href: "/services/scope" },
      { label: "고객과의 약속 · 안전수칙", href: "/services/promise" },
    ],
  },
  {
    key: "gallery",
    label: "기술 소개",
    summary: "공종별 핵심 시공 디테일과 검측 기준",
    href: "/gallery",
    links: [{ label: "기술 · 시공 아카이브", href: "/gallery" }],
  },
  {
    key: "notices",
    label: "고객센터",
    summary: "시공 안내 공지 및 상담 전 체크리스트",
    href: "/notices",
    links: [
      { label: "공지사항 · 시공안내", href: "/notices" },
      { label: "상담 전 확인사항", href: "/notices/pre-check" },
    ],
  },
  {
    key: "consultation",
    label: "온라인상담",
    summary: "현장 조건 정리 및 견적·실측 문의",
    href: "/consultation",
    links: [{ label: "온라인 견적·상담 신청", href: "/consultation" }],
  },
] as const;

export type SubSectionKey = (typeof navGroups)[number]["key"] | "legal";

const subMap: Record<SubSectionKey, { title: string; en: string; items: ReadonlyArray<{ label: string; href: string }> }> = {
  company: { title: "회사소개", en: "COMPANY", items: navGroups[0].links },
  services: { title: "시공분야", en: "WORK SCOPE", items: navGroups[1].links },
  gallery: { title: "기술 소개", en: "TECH ARCHIVE", items: navGroups[2].links },
  notices: { title: "고객센터", en: "SUPPORT", items: navGroups[3].links },
  consultation: {
    title: "온라인상담",
    en: "CONSULTATION",
    items: [
      { label: "온라인 견적·상담 신청", href: "/consultation" },
      { label: "상담 전 확인사항", href: "/notices/pre-check" },
    ],
  },
  legal: {
    title: "법적 고지",
    en: "LEGAL NOTICE",
    items: [
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "이용약관", href: "/terms" },
      { label: "이메일무단수집거부", href: "/email-policy" },
    ],
  },
};

const normalizePath = (p: string) => p.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="sj-brand" aria-label={`${company.name} 홈으로 이동`}>
      <img src={assetPath(inverse ? "seonjin-logo-white.png" : "seonjin-logo.png")} alt={`${company.name} 로고`} />
    </Link>
  );
}

export function SiteHeader() {
  const [location] = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const normLoc = normalizePath(location);
  const isGroupActive = (group: (typeof navGroups)[number]) =>
    group.links.some((link) => normLoc === normalizePath(link.href)) ||
    (group.key === "services" && normLoc === "/services") ||
    (group.key === "consultation" && normLoc.startsWith("/consultation"));

  useEffect(() => {
    setActiveIndex(null);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useLayoutEffect(() => {
    if (!mobileOpen) return;
    const menu = drawerRef.current;
    const root = document.getElementById("root");
    if (!menu) return;

    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    const prevInert = root?.inert ?? false;
    if (root) root.inert = true;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus({ preventScroll: true });

    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.getClientRects().length > 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (root) root.inert = prevInert;
      document.body.style.overflow = prevOverflow;
      const target = menuBtnRef.current?.isConnected ? menuBtnRef.current : prevFocus;
      target?.focus({ preventScroll: true });
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="sj-header-wrap"
        ref={headerRef}
        onMouseLeave={() => setActiveIndex(null)}
        onBlur={(e) => {
          if (!headerRef.current?.contains(e.relatedTarget as Node | null)) setActiveIndex(null);
        }}
      >
        <a className="sj-skip" href="#main-content">
          본문 바로가기
        </a>

        <div className="sj-utility-bar">
          <div className="sj-utility-bar__inner">
            <p>
              <ShieldCheck size={14} aria-hidden="true" />
              <span>정밀 토목 · 도로경계 · 보행환경 · 우수배수 책임시공</span>
            </p>
            <nav aria-label="상단 보조 메뉴">
              <Link href="/notices/pre-check">사전 체크리스트</Link>
              <Link href="/consultation">견적·상담 안내</Link>
              <Link href="/privacy">개인정보처리방침</Link>
            </nav>
          </div>
        </div>

        <div className="sj-header">
          <div className="sj-header__inner">
            <BrandLogo />

            <nav className="sj-gnb" aria-label="주요 메뉴">
              {navGroups.map((group, idx) => (
                <div
                  key={group.key}
                  className={`sj-gnb__item ${activeIndex === idx ? "is-open" : ""}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <Link
                    href={group.href}
                    className={isGroupActive(group) ? "is-active" : ""}
                    aria-current={isGroupActive(group) ? "page" : undefined}
                    onFocus={() => setActiveIndex(idx)}
                  >
                    <span>{group.label}</span>
                    <ChevronDown size={14} aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </nav>

            <div className="sj-header__cta">
              <Link href="/consultation" className="sj-header__consult-btn">
                <MessageSquareText size={16} aria-hidden="true" />
                <span>온라인 견적·상담</span>
              </Link>
              <button
                ref={menuBtnRef}
                type="button"
                className="sj-mobile-trigger sj-js-only"
                aria-label="전체 메뉴 열기"
                aria-expanded={mobileOpen}
                aria-controls="sj-mobile-drawer"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          <div className={`sj-megamenu ${activeIndex !== null ? "is-open" : ""}`} aria-hidden={activeIndex === null}>
            <div className="sj-megamenu__inner">
              <div className="sj-megamenu__intro">
                <span>SEONJIN CIVIL ENGINEERING</span>
                <strong>현장 여건을 먼저 읽는 정밀 시공</strong>
                <p>경계석·보행포장·배수로·외부시설 정비까지 표준 시방과 검측 기준으로 안내합니다.</p>
                <Link href="/notices/pre-check" onClick={() => setActiveIndex(null)}>
                  상담 전 체크사항 보기 <ArrowRight size={14} />
                </Link>
              </div>
              <div className="sj-megamenu__columns">
                {navGroups.map((group, idx) => (
                  <div key={group.key} className={`sj-megamenu__col ${activeIndex === idx ? "is-highlighted" : ""}`}>
                    <strong>{group.label}</strong>
                    <ul>
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} onClick={() => setActiveIndex(null)}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {typeof document !== "undefined" &&
        createPortal(
          <div
            id="sj-mobile-drawer"
            ref={drawerRef}
            className="sj-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="전체 메뉴"
            tabIndex={-1}
            hidden={!mobileOpen}
          >
            <div className="sj-mobile-drawer__top">
              <BrandLogo inverse />
              <button ref={closeBtnRef} type="button" onClick={() => setMobileOpen(false)} aria-label="전체 메뉴 닫기">
                <X size={25} />
              </button>
            </div>
            <p className="sj-mobile-drawer__caption">SEONJIN CONSTRUCTION · MENU</p>
            <nav
              className="sj-mobile-drawer__nav"
              aria-label="모바일 주요 메뉴"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
              }}
            >
              {navGroups.map((group, idx) => (
                <section key={group.key} className="sj-mobile-drawer__group">
                  <div className="sj-mobile-drawer__head">
                    <span>0{idx + 1}</span>
                    <Link href={group.href}>{group.label}</Link>
                  </div>
                  <div className="sj-mobile-drawer__links">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label} <ChevronRight size={14} />
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
              <div className="sj-mobile-drawer__legal">
                <Link href="/privacy">개인정보처리방침</Link>
                <Link href="/terms">이용약관</Link>
                <Link href="/email-policy">이메일무단수집거부</Link>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}

export function SubPageBanner({
  eyebrow,
  title,
  description,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: string;
  image: string;
}) {
  return (
    <section className="sj-sub-banner" style={{ backgroundImage: `url(${assetPath(image)})` }}>
      <div className="sj-sub-banner__veil" />
      <div className="sj-sub-banner__inner">
        <p className="sj-sub-banner__crumbs">
          <Link href="/">홈</Link> <span>/</span> {crumbs}
        </p>
        <span className="sj-sub-banner__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="sj-sub-banner__desc">{description}</p>
      </div>
    </section>
  );
}

export function SubLayout({ section, children }: { section: SubSectionKey; children: ReactNode }) {
  const [location] = useLocation();
  const normLoc = normalizePath(location);
  const group = subMap[section];

  return (
    <div className="sj-sub-container">
      <aside className="sj-lnb" aria-label={`${group.title} 메뉴`}>
        <div className="sj-lnb__header">
          <span>{group.en}</span>
          <strong>{group.title}</strong>
        </div>
        <nav className="sj-lnb__nav">
          {group.items.map((item) => {
            const active =
              normLoc === normalizePath(item.href) ||
              (item.href === "/services/scope" && normLoc === "/services") ||
              (item.href === "/consultation" && normLoc === "/consultation/list");
            return (
              <Link key={item.href} href={item.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
                <span>{item.label}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        <div className="sj-lnb__help">
          <span className="sj-lnb__help-tag">FIELD INQUIRY</span>
          <strong>현장 실측 · 견적 상담</strong>
          <p>현장 주소와 필요한 공정, 참고 사진을 준비해 주시면 신속하게 검토 기준을 안내합니다.</p>
          <dl>
            <div>
              <dt>대표연락처</dt>
              <dd>{company.phone ?? "번호 확인 후 고시"}</dd>
            </div>
            <div>
              <dt>운영시간</dt>
              <dd>평일 08:30 – 18:00</dd>
            </div>
          </dl>
          <Link href="/consultation" className="sj-lnb__help-btn">
            온라인 상담 작성 <ArrowRight size={15} />
          </Link>
          <Link href="/notices/pre-check" className="sj-lnb__help-sub">
            <ClipboardCheck size={14} /> 상담 전 체크리스트
          </Link>
        </div>
      </aside>

      <div className="sj-sub-main">{children}</div>
    </div>
  );
}

export function FloatingQuickBar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sj-floating sj-js-only ${open ? "is-open" : ""}`} aria-label="빠른 상담 도구">
      {open && (
        <div className="sj-floating__panel" role="dialog" aria-label="상담 연결 안내">
          <div className="sj-floating__panel-head">
            <span>QUICK GUIDE</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="상담 안내 닫기">
              <X size={16} />
            </button>
          </div>
          <strong>선진건설(주) 상담 창구</strong>
          <p>현장 위치·공종·희망 일정을 온라인으로 정리해 바로 메일 초안 또는 복사로 전달하실 수 있습니다.</p>
          <div className="sj-floating__info">
            <div>
              <Phone size={15} />
              <span>{company.phone ?? "대표번호 등록 준비 중"}</span>
            </div>
            <div>
              <Mail size={15} />
              <span>{company.email ?? "대표 이메일 등록 준비 중"}</span>
            </div>
          </div>
          <Link href="/notices/pre-check" className="sj-floating__sublink" onClick={() => setOpen(false)}>
            <FileCheck2 size={15} /> 사전 체크리스트 먼저 보기
          </Link>
        </div>
      )}
      <div className="sj-floating__bar">
        <button
          type="button"
          className="sj-floating__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <Phone size={18} aria-hidden="true" />
          <span>상담안내</span>
        </button>
        <Link href="/consultation" className="sj-floating__cta" onClick={() => setOpen(false)}>
          <span>온라인상담</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

export function SiteFooter() {
  return (
    <footer className="sj-footer">
      <div className="sj-footer__top">
        <div className="sj-footer__top-inner">
          <nav className="sj-footer__legal-nav" aria-label="법적 고지 및 약관 메뉴">
            <Link href="/privacy" className="is-emphasized">
              개인정보처리방침
            </Link>
            <Link href="/terms">이용약관</Link>
            <Link href="/email-policy">이메일무단수집거부</Link>
            <Link href="/notices/pre-check">상담 전 확인사항</Link>
            <Link href="/location">오시는길</Link>
          </nav>
          <button
            type="button"
            className="sj-footer__top-btn sj-js-only"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="페이지 맨 위로 이동"
          >
            <ArrowUp size={16} />
            <span>TOP</span>
          </button>
        </div>
      </div>

      <div className="sj-footer__body">
        <div className="sj-footer__brand-col">
          <BrandLogo inverse />
          <p className="sj-footer__en">{company.nameEn}</p>
          <p className="sj-footer__slogan">도로경계 · 보행포장 · 우수배수 · 외부기반 정밀시공 전문기업</p>
        </div>

        <div className="sj-footer__info-col">
          <dl className="sj-footer__ledger" aria-label="사업자 법적 고시 정보">
            <div>
              <dt>상호(법인명)</dt>
              <dd>{company.legalName} ({company.name})</dd>
            </div>
            <div>
              <dt>대표자</dt>
              <dd>{company.ceo ?? "업체 확인 후 고시"}</dd>
            </div>
            <div>
              <dt>사업자등록번호</dt>
              <dd>{company.businessNumber ?? "업체 확인 후 고시"}</dd>
            </div>
            <div>
              <dt>건설업 등록</dt>
              <dd>{company.licenseInfo ?? "보유 전문건설업 면허 확인 후 고시"}</dd>
            </div>
            <div>
              <dt>사업장 소재지</dt>
              <dd>{company.address ?? "도로명 주소 확인 후 고시 예정"}</dd>
            </div>
            <div>
              <dt>대표연락처 / 이메일</dt>
              <dd>
                전화: {company.phone ?? "등록 준비 중"} · 이메일: {company.email ?? "등록 준비 중"}
              </dd>
            </div>
          </dl>
          <div className="sj-footer__copy">
            <small>{company.copyright}</small>
            <span>※ 미확정 사업자 식별정보 및 연락처는 임의 표기하지 않으며, 공식 서류 확인 후 즉시 반영됩니다.</span>
          </div>
        </div>

        <div className="sj-footer__cta-col">
          <span>ONLINE CONSULTATION</span>
          <strong>현장 실측 및 시공 문의</strong>
          <p>{company.hours}</p>
          <Link href="/consultation">
            온라인 견적·상담 바로가기 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="sj-site">
      <SiteHeader />
      <noscript>
        <nav className="sj-nojs-nav" aria-label="주요 메뉴">
          {navGroups.map((g) => (
            <Link key={g.href} href={g.href}>
              {g.label}
            </Link>
          ))}
          <Link href="/privacy">개인정보처리방침</Link>
        </nav>
      </noscript>
      <main id="main-content" className="sj-main">
        {children}
      </main>
      <SiteFooter />
      <FloatingQuickBar />
    </div>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.IntersectionObserver) {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sj-reveal ${className}`}>
      {children}
    </div>
  );
}
