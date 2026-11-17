import { Reveal, SiteFrame } from "@/components/SiteShell";
import { useConsultationDraft } from "@/context/ConsultationDraft";
import { civilScopes, seonjinNotices, techArchiveItems, type CivilScopeItem } from "@/data/civilData";
import { usePageMeta } from "@/hooks/usePageMeta";
import { assetPath } from "@/lib/assets";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Compass,
  MapPin,
  Pause,
  Play,
  Ruler,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";

const heroVisuals = [
  {
    image: "/seonjin-01.jpg",
    kicker: "PRECISION CIVIL CONSTRUCTION",
    subtitle: "화강경계석 · 도로 선형 · 기초 콘크리트 정밀 시공",
  },
  {
    image: "/seonjin-04.jpg",
    kicker: "DRAINAGE & INFRASTRUCTURE",
    subtitle: "U형 측구 · 스틸그레이팅 · 우수 배수 구배 구축",
  },
  {
    image: "/seonjin-02.jpg",
    kicker: "PEDESTRIAN ENVIRONMENT",
    subtitle: "투수·인터로킹 블록 포장 및 무장애(BF) 단차 정비",
  },
];

const fieldStandards = [
  {
    num: "01",
    title: "사전 측량 및 지반·매설물 확인",
    desc: "착공 전 원지반 레벨, 우수 유입 방향, 장비 진입폭과 기존 지하 매설물 간섭 여부를 먼저 점검합니다.",
  },
  {
    num: "02",
    title: "표준 단면·기초 다짐 원칙 준수",
    desc: "눈에 보이지 않는 보조기층 다짐과 기초·뒷채움 콘크리트 두께를 시방 기준대로 정직하게 시공합니다.",
  },
  {
    num: "03",
    title: "보행자·차량 통행 안전 분리",
    desc: "운영 중인 단지·도로변 작업 시 방호울·안전표지 설치와 일일 현장 정돈으로 안전사고와 민원을 예방합니다.",
  },
  {
    num: "04",
    title: "수치 검측 및 완료 상태 합동 확인",
    desc: "마감 선형과 배수 구배, 블록 평탄도를 계측 장비로 재확인하고 작업 전·중·후 기록을 투명하게 공유합니다.",
  },
];

const workflowSteps = [
  {
    step: "STEP 01",
    en: "INQUIRY",
    title: "온라인·유선 상담 접수",
    desc: "현장 위치, 필요 공정, 개략 수량과 희망 일정을 남겨주시면 검토를 시작합니다.",
    href: "/consultation",
  },
  {
    step: "STEP 02",
    en: "SURVEY",
    title: "현장 방문 및 정밀 실측",
    desc: "지반 상태, 배수 방향, 장비 진입 여건과 기존 구조물 철거 범위를 현장에서 확인합니다.",
    href: "/notices/pre-check",
  },
  {
    step: "STEP 03",
    en: "ESTIMATE",
    title: "공정·내역 기준 안내",
    desc: "자재 규격, 포함·별도 공정, 예상 작업 일정을 명확히 구분해 견적을 안내합니다.",
    href: "/services/scope",
  },
  {
    step: "STEP 04",
    en: "EXECUTION",
    title: "안전·표준 정밀 시공",
    desc: "안전 구획 설치 후 기초·기층부터 마감 줄눈까지 공정 순서에 맞춰 시공합니다.",
    href: "/services/promise",
  },
  {
    step: "STEP 05",
    en: "INSPECTION",
    title: "완료 검측 및 현장 인계",
    desc: "단차·물고임·마감 상태를 발주처와 합동 점검하고 주변 정리 후 인계합니다.",
    href: "/gallery",
  },
];

export default function Home() {
  usePageMeta(
    "도시기반·도로경계·보행포장·배수관로 정밀시공 전문기업",
    "기초 측량부터 마감 검측까지 현장 기준을 지키는 도로경계·보행로 정비·배수관로·부대토목 전문 선진건설(주)",
  );

  const [, setLocation] = useLocation();
  const { draft, setDraft } = useConsultationDraft();
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalScope, setModalScope] = useState<CivilScopeItem | null>(null);
  const [quickNotice, setQuickNotice] = useState("");
  const archiveTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || modalScope) return;
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroVisuals.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [paused, modalScope]);

  useEffect(() => {
    if (!modalScope) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalScope(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalScope]);

  const scrollArchive = (dir: number) => {
    const el = archiveTrackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  const handleQuickConsult = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.agreed) {
      setQuickNotice("개인정보 수집·이용 안내 확인에 체크해 주세요.");
      return;
    }
    setLocation("/consultation");
  };

  return (
    <SiteFrame>
      {/* 1. Split Briefing Hero */}
      <section className="sj-hero" aria-label="메인 시공 브리핑 비주얼">
        <div className="sj-hero__media">
          {heroVisuals.map((item, idx) => (
            <img
              key={item.image}
              src={assetPath(item.image)}
              alt={`${item.subtitle} — 선진건설(주) 현장 시공 비주얼`}
              className={idx === slideIdx ? "is-active" : ""}
              aria-hidden={idx !== slideIdx}
              fetchPriority={idx === 0 ? "high" : "auto"}
              decoding="async"
            />
          ))}
        </div>
        <div className="sj-hero__overlay" />

        <div className="sj-hero__inner">
          <div className="sj-hero__copy" aria-live="polite">
            <span className="sj-hero__kicker">{heroVisuals[slideIdx].kicker}</span>
            <h1>
              기초부터 마감선까지
              <br />
              현장 기준을 지키는 정밀 시공
            </h1>
            <p className="sj-hero__lead">
              도로경계 구조물, 보행로 블록 포장, 우수·배수 측구부터 단지 외부시설 보수까지 — 현장 여건을 먼저 실측하고 표준 시방에 맞춰 책임 시공합니다.
            </p>
            <p className="sj-hero__subcaption">{heroVisuals[slideIdx].subtitle}</p>

            <div className="sj-hero__actions">
              <Link href="/consultation" className="sj-btn sj-btn--primary">
                <span>온라인 견적·상담 신청</span>
                <ArrowRight size={17} />
              </Link>
              <Link href="/services/scope" className="sj-btn sj-btn--ghost">
                <span>전문 공정 범위 보기</span>
              </Link>
            </div>

            <div className="sj-hero__controls sj-js-only" aria-label="슬라이드 제어">
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev - 1 + heroVisuals.length) % heroVisuals.length)}
                aria-label="이전 배경 화면"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="sj-hero__dots">
                {heroVisuals.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={idx === slideIdx ? "is-active" : ""}
                    onClick={() => setSlideIdx(idx)}
                    aria-label={`${idx + 1}번 비주얼 보기`}
                  />
                ))}
              </div>
              <span className="sj-hero__count">
                <b>0{slideIdx + 1}</b> / 0{heroVisuals.length}
              </span>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev + 1) % heroVisuals.length)}
                aria-label="다음 배경 화면"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="sj-hero__pause"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? "슬라이드 자동재생 시작" : "슬라이드 자동재생 일시정지"}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
                <span>{paused ? "재생" : "정지"}</span>
              </button>
            </div>
          </div>

          <aside className="sj-hero__panel" aria-label="4대 주력 시공분야 빠른 브리핑">
            <div className="sj-hero__panel-head">
              <span>CORE WORK SCOPES</span>
              <strong>주력 시공 공정 브리핑</strong>
            </div>
            <ul>
              {civilScopes.map((scope, idx) => (
                <li key={scope.slug}>
                  <button
                    type="button"
                    onClick={() => setModalScope(scope)}
                    aria-haspopup="dialog"
                  >
                    <b className="sj-hero__panel-num">0{idx + 1}</b>
                    <div>
                      <strong>{scope.title}</strong>
                      <small>{scope.shortDesc}</small>
                    </div>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="sj-hero__panel-foot">각 공정을 선택하면 현장 검측 항목을 바로 확인할 수 있습니다.</p>
          </aside>
        </div>
      </section>

      {/* Hero Scope Detail Modal */}
      {modalScope && (
        <div
          className="sj-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sj-scope-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalScope(null);
          }}
        >
          <div className="sj-modal">
            <div className="sj-modal__media">
              <img src={assetPath(modalScope.image)} alt={`${modalScope.title} 세부 공정 안내`} decoding="async" />
              <span>{modalScope.code}</span>
            </div>
            <div className="sj-modal__body">
              <div className="sj-modal__top">
                <span>{modalScope.category} · 공정 브리핑</span>
                <button type="button" onClick={() => setModalScope(null)} aria-label="상세 창 닫기">
                  <X size={20} />
                </button>
              </div>
              <h2 id="sj-scope-modal-title">{modalScope.title}</h2>
              <p>{modalScope.summary}</p>
              <div className="sj-modal__box">
                <strong>중점 품질·검측 포인트</strong>
                <ul>
                  {modalScope.checkPoints.map((pt) => (
                    <li key={pt}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sj-modal__actions">
                <Link
                  href="/consultation"
                  className="sj-btn sj-btn--primary"
                  onClick={() => {
                    setDraft((prev) => ({ ...prev, workType: modalScope.title }));
                    setModalScope(null);
                  }}
                >
                  이 공정으로 상담 신청하기 <ArrowRight size={16} />
                </Link>
                <Link href="/services/scope" className="sj-btn sj-btn--outline" onClick={() => setModalScope(null)}>
                  전체 공정 범위 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Field Execution Standards */}
      <section className="sj-standards" aria-labelledby="sj-standards-heading">
        <div className="sj-container">
          <Reveal className="sj-section-head sj-section-head--split">
            <div>
              <span className="sj-eyebrow">FIELD EXECUTION STANDARD</span>
              <h2 id="sj-standards-heading">
                완성도는 마감 표면이 아니라
                <br />
                <em>기초와 연결 공정</em>에서 결정됩니다.
              </h2>
            </div>
            <div>
              <p>
                선진건설(주)은 소규모 보수부터 단지 기반 정비까지 모든 현장에 동일한 측량·기초·안전 기준을 적용하여 침하와 하자 없는 결과를 만듭니다.
              </p>
              <Link href="/company" className="sj-inline-link">
                회사소개 및 시공 역량 보기 <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="sj-standards__grid">
            {fieldStandards.map((item) => (
              <Reveal key={item.num} className="sj-standard-card">
                <div className="sj-standard-card__top">
                  <span>PRINCIPLE {item.num}</span>
                  <Ruler size={18} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Specialized Civil Scopes Grid */}
      <section className="sj-scopes-home" aria-labelledby="sj-scopes-heading">
        <div className="sj-container">
          <Reveal className="sj-section-head">
            <span className="sj-eyebrow">SPECIALIZED WORK AREAS</span>
            <h2 id="sj-scopes-heading">4대 전문 시공 분야</h2>
            <p>현장 목적과 통행 하중, 배수 환경에 맞춘 최적의 자재와 공법을 제안합니다.</p>
          </Reveal>

          <div className="sj-scopes-home__grid">
            {civilScopes.map((scope) => (
              <Reveal key={scope.slug} className="sj-scope-card">
                <div className="sj-scope-card__img">
                  <img
                    src={assetPath(scope.image)}
                    alt={`${scope.title} (${scope.shortDesc}) 시공 현장`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{scope.code}</span>
                </div>
                <div className="sj-scope-card__body">
                  <small>{scope.shortDesc}</small>
                  <h3>{scope.title}</h3>
                  <p>{scope.summary}</p>
                  <ul>
                    {scope.subWorks.slice(0, 3).map((work) => (
                      <li key={work}>{work}</li>
                    ))}
                  </ul>
                  <Link href="/services/scope" className="sj-scope-card__link">
                    세부 시공 기준 보기 <ChevronRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 5-Step Workflow Track */}
      <section className="sj-workflow" aria-labelledby="sj-workflow-heading">
        <div className="sj-container">
          <Reveal className="sj-section-head sj-section-head--light">
            <span className="sj-eyebrow">STANDARD WORKFLOW</span>
            <h2 id="sj-workflow-heading">상담부터 완료 인계까지 5단계 진행 절차</h2>
            <p>각 단계마다 발주처와 확인할 기준을 투명하게 공유하여 일정 지연과 오해를 줄입니다.</p>
          </Reveal>

          <ol className="sj-workflow__track">
            {workflowSteps.map((item) => (
              <li key={item.step} className="sj-workflow__item">
                <Link href={item.href}>
                  <div className="sj-workflow__badge">
                    <span>{item.step}</span>
                    <small>{item.en}</small>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="sj-workflow__more">
                    자세히 보기 <ArrowRight size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Technical Field Archive */}
      <section className="sj-archive-home" aria-labelledby="sj-archive-heading">
        <div className="sj-container">
          <Reveal className="sj-archive-home__head">
            <div>
              <span className="sj-eyebrow">TECHNICAL ARCHIVE</span>
              <h2 id="sj-archive-heading">공종별 핵심 기술 및 시공 디테일</h2>
              <p>현장 조건별로 중점 관리하는 기초·구배·단차 시공 기준을 확인하세요.</p>
            </div>
            <div className="sj-archive-home__btns sj-js-only">
              <button type="button" onClick={() => scrollArchive(-1)} aria-label="이전 기술 카드">
                <ArrowLeft size={18} />
              </button>
              <button type="button" onClick={() => scrollArchive(1)} aria-label="다음 기술 카드">
                <ArrowRight size={18} />
              </button>
              <Link href="/gallery" className="sj-btn sj-btn--outline">
                전체 기술 소개 <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="sj-archive-home__track" ref={archiveTrackRef}>
            {techArchiveItems.map((item) => (
              <Link href="/gallery" key={item.id} className="sj-tech-card">
                <div className="sj-tech-card__img">
                  <img
                    src={assetPath(item.image)}
                    alt={`${item.title} — ${item.subtitle}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{item.category}</span>
                </div>
                <div className="sj-tech-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="sj-tech-card__cta">
                    검측 기준 확인 <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 3-Column Client Support Desk */}
      <section className="sj-desk" aria-label="고객 지원 데스크">
        <div className="sj-container">
          <div className="sj-desk__grid">
            {/* Notice Panel */}
            <div className="sj-desk-panel">
              <div className="sj-desk-panel__head">
                <div>
                  <span>NOTICE &amp; GUIDE</span>
                  <h3>공지 및 시공 안내</h3>
                </div>
                <Link href="/notices">
                  전체보기 <ChevronRight size={16} />
                </Link>
              </div>
              <ul className="sj-desk-notices">
                {seonjinNotices.map((post) => (
                  <li key={post.id}>
                    <Link href="/notices">
                      <span className="sj-desk-notices__badge">{post.badge}</span>
                      <strong>{post.title}</strong>
                      <time>{post.date.slice(5)}</time>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Consultation Panel */}
            <div className="sj-desk-panel sj-desk-panel--accent">
              <div className="sj-desk-panel__head">
                <div>
                  <span>QUICK INQUIRY</span>
                  <h3>간편 온라인 상담 연결</h3>
                </div>
                <Link href="/consultation">
                  상세양식 <ChevronRight size={16} />
                </Link>
              </div>
              <p className="sj-desk-panel__desc">
                기초 항목을 입력하시면 상세 온라인상담 화면으로 자동 연동되어 바로 이메일 초안 또는 복사를 진행할 수 있습니다.
              </p>
              <form className="sj-quick-form sj-js-only" onSubmit={handleQuickConsult}>
                <div>
                  <label htmlFor="quick-name">성함 / 업체명 *</label>
                  <input
                    id="quick-name"
                    required
                    placeholder="예: 김선진 / OO관리사무소"
                    value={draft.applicantName}
                    onChange={(e) => setDraft((p) => ({ ...p, applicantName: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="quick-phone">회신 연락처 *</label>
                  <input
                    id="quick-phone"
                    type="tel"
                    required
                    placeholder="연락 가능한 전화번호"
                    value={draft.phone}
                    onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="quick-loc">현장 위치 *</label>
                  <input
                    id="quick-loc"
                    required
                    placeholder="시·군·구 또는 현장 주소"
                    value={draft.location}
                    onChange={(e) => setDraft((p) => ({ ...p, location: e.target.value }))}
                  />
                </div>
                <label className="sj-quick-form__agree">
                  <input
                    type="checkbox"
                    checked={draft.agreed}
                    onChange={(e) => {
                      setQuickNotice("");
                      setDraft((p) => ({ ...p, agreed: e.target.checked }));
                    }}
                  />
                  <span>[필수] 상담 연결을 위한 개인정보 처리 안내 확인 (서버 미저장)</span>
                </label>
                {quickNotice && <p className="sj-quick-form__msg">{quickNotice}</p>}
                <button type="submit" className="sj-btn sj-btn--primary sj-btn--full">
                  <Send size={15} /> 상세 상담 내용 이어쓰기
                </button>
              </form>
              <noscript>
                <p className="sj-desk-panel__desc">온라인 상담 양식은 온라인상담 페이지에서 확인하실 수 있습니다.</p>
              </noscript>
            </div>

            {/* Location & Pre-check Panel */}
            <div className="sj-desk-panel">
              <div className="sj-desk-panel__head">
                <div>
                  <span>LOCATION &amp; CHECKLIST</span>
                  <h3>현장 실측 및 상담 준비</h3>
                </div>
                <Link href="/location">
                  오시는길 <ChevronRight size={16} />
                </Link>
              </div>
              <div className="sj-desk-map">
                <div className="sj-desk-map__grid" />
                <div className="sj-desk-map__pin">
                  <MapPin size={22} />
                  <strong>선진건설(주) 현장대응팀</strong>
                </div>
              </div>
              <div className="sj-desk-guide">
                <div>
                  <Compass size={16} />
                  <span>출장 실측: 현장 위치·연장 확인 후 방문 일정 조율</span>
                </div>
                <div>
                  <ShieldCheck size={16} />
                  <span>대응 대상: 공공도로·단지·공장·상업시설 외부 기반</span>
                </div>
              </div>
              <Link href="/notices/pre-check" className="sj-btn sj-btn--outline sj-btn--full">
                상담 전 자가 체크리스트 열기 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
