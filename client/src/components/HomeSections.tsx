import { company } from "@/config/company";
import { notices } from "@/data/notices";
import { projectCards } from "@/data/projects";
import { assetUrl } from "@/lib/siteAssets";
import { ArrowRight, Check, ChevronRight, ClipboardList, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";

const heroSlides = [
  { image: assetUrl("/media/construction-hero_9277bcc5.jpg"), label: "보행로와 외부 공간" },
  { image: assetUrl("/media/construction-hero-2_76fd72ca.jpg"), label: "경계 구조와 포장 구간" },
  { image: assetUrl("/media/construction-hero-3_cc7a91dc.jpg"), label: "현장 기반 시설" },
];

const workAreas = [
  { title: "경계 구조 시공", description: "경계석 · 연석 · 진입부" },
  { title: "보행로 정비", description: "보도블록 · 배수 · 단차" },
  { title: "외부 시설 보수", description: "파손 · 마감 · 안전 정비" },
  { title: "현장 부대 공정", description: "관로 주변 · 정리 · 마감" },
];

const processSteps = [
  { index: "01", label: "INQUIRY", title: "문의 내용 정리", description: "현장 위치와 필요한 공정, 희망 시기를 정리합니다.", href: "/consultation" },
  { index: "02", label: "CHECK", title: "현장 조건 확인", description: "작업 구간과 진입 여건, 기존 시설 상태를 확인합니다.", href: "/notices/pre-check" },
  { index: "03", label: "ESTIMATE", title: "범위·견적 안내", description: "포함 공정과 일정, 작업 기준을 구분해 안내합니다.", href: "/services/process" },
  { index: "04", label: "WORK", title: "시공 진행", description: "협의한 범위와 현장 동선을 기준으로 작업합니다.", href: "/services/scope" },
  { index: "05", label: "REVIEW", title: "완료 확인", description: "요청 범위와 마감 상태를 함께 확인합니다.", href: "/services/process" },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.IntersectionObserver) { element.classList.add("is-revealed"); return; }
    const observer = new IntersectionObserver(([entry]) => element.classList.toggle("is-revealed", entry.isIntersecting), { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`scroll-reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % heroSlides.length), 5200);
    return () => window.clearInterval(timer);
  }, [current]);

  return (
    <section className="hero" aria-label="주요 시공 안내">
      {heroSlides.map((slide, index) => <img key={slide.image} className={index === current ? "hero__image is-current" : "hero__image"} src={slide.image} alt={slide.label} />)}
      <div className="hero__shade" />
      <div className="hero__information" aria-live="polite">
        <div className="hero__brief"><p>FIELD CONSTRUCTION</p><h1>현장 조건부터 확인하고<br />필요한 공정을 안내합니다</h1><span>작업 위치와 범위, 일정이 정리되면 상담이 더 빠르고 정확해집니다.</span></div>
        <aside className="hero__work-panel" aria-label="주요 시공 범위"><ul>{workAreas.map((area, index) => <li key={area.title}><Link href="/services/scope" className="hero__work-button"><b>0{index + 1}</b><span><strong>{area.title}</strong><small>{area.description}</small></span><ArrowRight size={16} /></Link></li>)}</ul></aside>
      </div>
      <div className="hero__navigation"><div className="hero__dots" role="tablist" aria-label="메인 이미지 선택">{heroSlides.map((slide, index) => <button key={slide.label} type="button" className={index === current ? "is-current" : ""} onClick={() => setCurrent(index)} aria-label={`${index + 1}번 이미지`} aria-selected={index === current} />)}</div><p className="hero__counter"><b>0{current + 1}</b><span>0{heroSlides.length}</span></p></div>
    </section>
  );
}

export function CompanyIntro() {
  const cards = [
    { title: "회사소개", eyebrow: company.name, href: "/company", image: heroSlides[0].image },
    { title: "시공 가능 공정", eyebrow: "WORK SCOPE", href: "/services/scope", image: heroSlides[1].image },
    { title: "현장사례", eyebrow: "FIELD CASES", href: "/gallery", image: heroSlides[2].image },
    { title: "상담 전 확인", eyebrow: "BEFORE INQUIRY", href: "/notices/pre-check", image: heroSlides[0].image },
  ];
  return (
    <section className="company-intro company-intro--hansol">
      <Reveal className="company-intro__heading"><h2>현장에서 필요한 내용을<br /><em>빠르게 확인합니다</em></h2><span>공정 설명과 상담 준비 항목을 복잡하지 않게 정리했습니다.</span></Reveal>
      <div className="service-cards service-cards--panels">{cards.map((card) => <Link href={card.href} className="service-card" key={card.title}><div className="service-card__image"><img src={card.image} alt="" /></div><div className="service-card__shade" /><div className="service-card__body"><span className="service-card__eyebrow">{card.eyebrow}</span><strong>{card.title}</strong><span className="service-card__action"><ChevronRight size={22} /></span></div></Link>)}</div>
    </section>
  );
}

export function ServiceScope() {
  return (
    <section className="home-service-scope" aria-labelledby="home-service-title">
      <Reveal className="home-service-scope__frame">
        <div className="home-service-scope__lead"><p className="eyebrow">WORK AREAS</p><h2 id="home-service-title">필요한 공정을<br /><em>먼저 구분하세요</em></h2><span>현장 상태에 따라 작업 범위는 달라질 수 있습니다. 상담 전 대표 공정을 확인해 주세요.</span><Link href="/services/scope" className="home-service-scope__link">시공 가능 공정 보기 <ArrowRight size={17} /></Link></div>
        <div className="home-service-scope__details"><ol className="home-service-scope__list">{workAreas.map((area, index) => <li key={area.title}><Link href="/services/scope"><span>0{index + 1}</span><div><h3>{area.title}</h3><small>{area.description}</small><p>작업 구간과 주변 조건을 확인한 뒤 필요한 범위를 안내합니다.</p></div><ArrowRight size={18} /></Link></li>)}</ol></div>
      </Reveal>
    </section>
  );
}

export function PromiseBand() {
  const promises = ["현장 위치와 작업 구간을 먼저 확인합니다.", "필요 공정과 제외 범위를 구분합니다.", "일정과 변경 사항은 작업 전에 협의합니다.", "완료 후 요청 범위와 마감 상태를 확인합니다."];
  return <section className="promise-band" aria-labelledby="field-rules-title"><Reveal className="promise-band__frame"><div className="promise-band__lead"><p>FIELD RULES</p><h2 id="field-rules-title">현장 진행 기준</h2><span>상담부터 완료 확인까지 필요한 내용을 단계별로 공유합니다.</span></div><ol className="promise-band__list">{promises.map((promise, index) => <li key={promise}><b>0{index + 1}</b><Check size={17} /><span>{promise}</span></li>)}</ol></Reveal></section>;
}

export function ProcessSteps() {
  return <section className="work-process" aria-labelledby="process-title"><Reveal className="work-process__heading"><p className="eyebrow">WORKFLOW</p><div><h2 id="process-title">문의부터 완료까지<br /><em>진행 순서를 확인하세요</em></h2><span>현장과 공정에 따라 세부 단계는 달라질 수 있습니다.</span></div></Reveal><Reveal className="work-process__reveal" delay={80}><ol className="work-process__track">{processSteps.map((step) => <li className="work-process__item" key={step.index}><Link href={step.href}><span className="work-process__index">{step.index}</span><small>{step.label}</small><h3>{step.title}</h3><p>{step.description}</p><ArrowRight size={18} /></Link></li>)}</ol></Reveal></section>;
}

function NoticePreview() {
  return <section className="mini-panel"><div className="mini-panel__heading"><div><p className="mini-panel__eyebrow">NOTICE</p><h3>공지사항</h3></div><Link href="/notices">전체보기 <ChevronRight size={17} /></Link></div><ul className="notice-list">{notices.map((notice) => <li key={notice.id}><Link href={`/notices/${notice.id}`}><span>{notice.title}</span><small>{notice.category}</small></Link></li>)}</ul></section>;
}

function InquiryPreview() {
  return <section className="mini-panel mini-panel--form"><div className="mini-panel__heading"><div><p className="mini-panel__eyebrow">INQUIRY</p><h3>문의 내용 정리</h3></div><Link href="/consultation">작성하기 <ChevronRight size={17} /></Link></div><div className="inquiry-preview"><ClipboardList size={34} /><p>사이트에 내용을 저장하지 않습니다.</p><span>현장 위치와 공정, 희망 시기를 정리한 뒤 복사하거나 이메일 초안을 만들 수 있습니다.</span><Link href="/consultation" className="form-submit">문의 내용 작성하기</Link></div></section>;
}

function LocationPreview() {
  return <section className="mini-panel mini-panel--map"><div className="mini-panel__heading"><div><p className="mini-panel__eyebrow">VISIT</p><h3>방문 안내</h3></div><Link href="/location">확인하기 <ChevronRight size={17} /></Link></div><div className="location-preview-card"><MapPin size={32} /><strong>방문 상담은 사전 협의 후 안내합니다.</strong><p>확정된 주소가 등록되면 외부 지도 길찾기 버튼이 제공됩니다.</p></div></section>;
}

export function InformationGrid() {
  return <section className="client-desk"><Reveal className="client-desk__frame"><NoticePreview /><InquiryPreview /><LocationPreview /></Reveal></section>;
}

export function TechnologyShowcase() {
  return <section className="technology-showcase"><Reveal className="technology-showcase__heading"><p>FIELD CASES</p><h2><em>현장사례</em></h2><span>현재 자료를 공정별 확인 포인트 중심으로 정리했습니다.</span></Reveal><Reveal className="technology-showcase__reveal" delay={80}><div className="technology-showcase__track production-project-track" role="list">{projectCards.map((project) => <Link href="/gallery" className="technology-card" role="listitem" key={project.title}><div className="technology-card__image"><img src={project.thumbnail} alt={`${project.title} 공정 안내 이미지`} /></div><div className="technology-card__content"><p><i />{project.category}</p><h3>{project.title}</h3><span>{project.description}</span><b><ArrowRight size={18} /></b></div></Link>)}</div><div className="production-project-cta"><Link href="/gallery">현장사례 구조 보기 <ArrowRight size={17} /></Link></div></Reveal></section>;
}
