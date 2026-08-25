import { company, contentMode, sampleCompany, sampleContentNotice } from "@/config/company";
import { assetUrl } from "@/lib/siteAssets";
import { copyText } from "@/lib/inquiry";
import { ArrowUp, ArrowUpRight, ChevronDown, ChevronRight, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "회사소개", href: "/company", links: [{ label: "인사말", href: "/company" }, { label: "오시는길", href: "/location" }] },
  { label: "시공안내", href: "/services/scope", links: [{ label: "시공 가능 공정", href: "/services/scope" }, { label: "진행 절차", href: "/services/process" }] },
  { label: "현장사례", href: "/gallery", links: [{ label: "시공사례", href: "/gallery" }] },
  { label: "상담안내", href: "/notices/pre-check", links: [{ label: "상담 전 확인사항", href: "/notices/pre-check" }, { label: "이메일 문의", href: "/consultation" }] },
  { label: "공지사항", href: "/notices", links: [{ label: "공지사항", href: "/notices" }] },
] as const;

const subNavigation = {
  company: { label: "회사소개", items: navItems[0].links },
  services: { label: "시공안내", items: navItems[1].links },
  gallery: { label: "현장사례", items: navItems[2].links },
  consultation: { label: "상담안내", items: navItems[3].links },
  notices: { label: "공지사항", items: navItems[4].links },
} as const;

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand-mark ${inverse ? "brand-mark--inverse" : ""}`} aria-label={`${company.name} 홈으로 이동`}>
      <img src={assetUrl(company.logoPath)} alt={`${company.legalName} 로고`} />
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [location, setLocation] = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const navigatePrimary = (index: number) => {
    setActiveMenu(null);
    setLocation(navItems[index].href);
  };

  return (
    <header className="site-header" ref={headerRef} onMouseLeave={() => setActiveMenu(null)} onBlur={(event) => {
      if (!headerRef.current?.contains(event.relatedTarget as Node | null)) setActiveMenu(null);
    }}>
      <div className="site-header__inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navItems.map((item, index) => (
            <div className={`desktop-nav__item ${activeMenu === index ? "is-open" : ""}`} key={item.label} onMouseEnter={() => setActiveMenu(index)}>
              <button type="button" className={location === item.href || activeMenu === index ? "is-active" : ""} aria-expanded={activeMenu === index} aria-controls={`submenu-${index}`} onFocus={() => setActiveMenu(index)} onClick={() => navigatePrimary(index)}>
                {item.label}<ChevronDown size={12} aria-hidden="true" />
              </button>
              <div id={`submenu-${index}`} className="desktop-nav__submenu" aria-hidden={activeMenu !== index}>
                {item.links.map((link) => <Link key={link.label} href={link.href} role="menuitem" onClick={() => setActiveMenu(null)}>{link.label}</Link>)}
              </div>
            </div>
          ))}
        </nav>
        <button className="menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="메뉴 열기" aria-expanded={mobileOpen}><Menu size={25} /></button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-panel is-open" role="dialog" aria-modal="true" aria-label="모바일 메뉴">
          <div className="mobile-nav-panel__top"><BrandMark /><button className="menu-button" type="button" onClick={() => setMobileOpen(false)} aria-label="메뉴 닫기"><X size={26} /></button></div>
          <p className="mobile-nav-panel__label">MENU</p>
          <nav aria-label="모바일 주요 메뉴">
            {navItems.map((item, index) => (
              <div className="mobile-nav-group" key={item.label}>
                <button type="button" onClick={() => setActiveMenu((current) => current === index ? null : index)} aria-expanded={activeMenu === index}>{item.label}<ChevronDown size={20} /></button>
                <div className={activeMenu === index ? "mobile-nav-sub is-open" : "mobile-nav-sub"}>
                  {item.links.map((link) => <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}<ChevronRight size={14} /></Link>)}
                </div>
              </div>
            ))}
          </nav>
          {(company.phone || company.email) && <div className="mobile-nav-panel__contact">
            {company.phone && <a href={`tel:${company.phone}`}><Phone size={17} /> 전화 문의</a>}
            {company.email && <a href={`mailto:${company.email}`}><Mail size={17} /> 이메일 문의</a>}
          </div>}
        </div>
      )}
    </header>
  );
}

export function SubNavigation({ section }: { section: keyof typeof subNavigation }) {
  const [location] = useLocation();
  const menu = subNavigation[section];
  return (
    <aside className="sub-navigation" aria-label={`${menu.label} 내부 메뉴`}>
      <div className="sub-navigation__header"><span>SECTION</span><strong>{menu.label}</strong></div>
      <nav>{menu.items.map((item) => <Link key={item.label} href={item.href} className={location === item.href ? "is-active" : ""}>{item.label}<ChevronRight size={15} /></Link>)}</nav>
    </aside>
  );
}

export function PageTitle({ title, subtitle, crumbs, image }: { title: string; subtitle: string; crumbs?: string; image?: string }) {
  return (
    <section className={`page-title ${image ? "page-title--image" : ""}`} style={image ? { backgroundImage: `linear-gradient(90deg,#102233d9,#10223379),url(${image})` } : undefined}>
      <div className="page-title__inner"><p className="eyebrow">{subtitle}</p><h1>{title}</h1><p className="breadcrumbs">홈 <span>/</span> {crumbs ?? title}</p></div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <BrandMark inverse />
        <div className="footer-info"><p>{company.name}</p>{contentMode === "sample" && !company.address && <span className="footer-info__sample">샘플 정보 · {sampleCompany.address} · {sampleCompany.phone}</span>}<small>Copyright © {company.name}. All rights reserved.</small></div>
        {(company.phone || company.email) && <div className="footer-call"><span>CONTACT</span>{company.phone && <a href={`tel:${company.phone}`}>{company.phone}</a>}{company.email && <a className="footer-call__email" href={`mailto:${company.email}`}>{company.email}</a>}</div>}
        <button className="footer-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="맨 위로 이동"><ArrowUp size={25} /></button>
      </div>
      <div className="footer-bottom"><div><Link href="/privacy">개인정보처리방침</Link></div><p>현장 조건과 필요한 작업 범위를 먼저 확인합니다.</p></div>
    </footer>
  );
}

export function FloatingContactCard() {
  const [open, setOpen] = useState(false);
  const copyEmail = async () => {
    if (!company.email) return;
    try { await copyText(company.email); toast.success("대표 이메일을 복사했습니다."); }
    catch { toast.error("이메일을 복사하지 못했습니다."); }
  };

  if (!company.phone && !company.email) {
    return <aside className="floating-contact floating-contact--single" aria-label="상담 문의"><Link href="/consultation" className="floating-contact__consult-link"><span>문의 내용<br />정리하기</span><ArrowUpRight size={16} /></Link></aside>;
  }

  return (
    <aside className={`floating-contact ${open ? "is-open" : ""}`} aria-label="상담 문의">
      <div id="floating-contact-panel" className="floating-contact__panel" role="dialog" aria-label="대표 연락처" aria-hidden={!open}>
        <strong className="floating-contact__panel-title">연락처</strong>
        {company.phone && <a href={`tel:${company.phone}`} tabIndex={open ? 0 : -1}><Phone size={18} /><span>{company.phone}</span></a>}
        {company.email && <button type="button" tabIndex={open ? 0 : -1} onClick={() => void copyEmail()}><Mail size={18} /><span>{company.email}</span></button>}
      </div>
      <div className="floating-contact__actions"><button type="button" className="floating-contact__trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="floating-contact-panel"><span className="floating-contact__icon"><Phone size={27} /></span><span className="floating-contact__copy"><small>CONTACT</small><strong>상담 문의</strong></span><ChevronDown size={17} /></button><Link href="/consultation" className="floating-contact__consult-link"><span>이메일<br />문의</span><ArrowUpRight size={16} /></Link></div>
    </aside>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [location]);
  return <div className="site-frame"><SiteHeader />{contentMode === "sample" && <div className="sample-mode-banner" role="note"><strong>SAMPLE</strong><span>{sampleContentNotice}</span></div>}<main>{children}</main><SiteFooter /><FloatingContactCard /></div>;
}
