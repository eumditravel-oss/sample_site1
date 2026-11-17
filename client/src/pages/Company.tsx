import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { company } from "@/config/company";
import { usePageMeta } from "@/hooks/usePageMeta";
import { assetPath } from "@/lib/assets";
import { ArrowRight, Award, CheckCircle2, Compass, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const coreStrengths = [
  {
    icon: Compass,
    title: "현장 조건 선제 진단",
    desc: "도면만으로 알기 어려운 배수 흐름, 지반 침하 원인, 장비 진입폭과 인접 매설물을 착공 전 현장에서 직접 실측하여 정확한 물량과 공법을 도출합니다.",
  },
  {
    icon: Award,
    title: "기초·기층부터 정직한 시공",
    desc: "경계석 하부 기초·뒷채움 콘크리트, 보도블록 보조기층 다짐, 측구 구배 레벨 등 완공 후 내구성을 좌우하는 기본 공정을 시방 기준대로 준수합니다.",
  },
  {
    icon: ShieldCheck,
    title: "안전 통제 및 투명한 소통",
    desc: "보행자와 차량이 오가는 현장에서도 철저한 안전 구획과 당일 정돈을 실천하며, 작업 전·중·후 과정을 발주처와 투명하게 공유합니다.",
  },
];

export default function Company() {
  usePageMeta("회사소개", "현장 조건을 먼저 진단하고 시방 기준에 맞춰 정밀 시공하는 선진건설(주) 기업 소개 및 개요");

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="COMPANY INTRODUCTION"
        title="회사소개"
        description="현장을 먼저 이해하고 기초부터 마감까지 흔들림 없는 시공 기준을 세웁니다."
        crumbs="회사소개 / 인사말 · 기업개요"
        image="/seonjin-06.jpg"
      />

      <SubLayout section="company">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">GREETING &amp; VISION</span>
            <h2>
              원칙을 지키는 정밀 시공으로
              <br />
              <em>안전하고 오래가는 도시 기반</em>을 만듭니다.
            </h2>
          </Reveal>

          <Reveal className="sj-greeting-box">
            <div className="sj-greeting-box__media">
              <img src={assetPath("seonjin-06.jpg")} alt="광파기로 도로 경계석과 보행로 선형을 정밀 측량하는 현장 기술자" />
            </div>
            <div className="sj-greeting-box__text">
              <p>
                안녕하십니까. <strong>{company.name}</strong> 홈페이지를 방문해 주셔서 감사합니다.
              </p>
              <p>
                도로의 경계를 잡아주는 연석 하나, 매일 시민이 걷는 보도블록 한 장, 비 오는 날 침수를 막아주는 배수 측구 한 구간은 모두 눈에 잘 띄지 않는 하부 기초와 정밀한 구배 설계 위에서 완성됩니다.
              </p>
              <p>
                {company.name}은 도로·경계 구조물 시공, 보행환경 및 블록 포장 정비, 우수·배수관로 부대토목, 외부 기반시설 유지보수 분야에서 현장 여건을 가장 먼저 살피는 실무 중심 건설기업입니다.
              </p>
              <p>
                무리한 공기 단축이나 임의 시공을 지양하고, 착공 전 정밀 실측부터 포함·별도 범위의 명확한 안내, 안전한 현장 관리와 준공 후 합동 검측까지 맡겨주신 현장에 끝까지 책임으로 보답하겠습니다.
              </p>
              <div className="sj-greeting-box__sign">
                <span>{company.legalName} 임직원 일동</span>
                <strong>{company.name}</strong>
              </div>
            </div>
          </Reveal>

          <Reveal className="sj-section-block">
            <div className="sj-block-head">
              <span>CORPORATE PROFILE</span>
              <h3>기업 개요</h3>
            </div>
            <div className="sj-table-wrap">
              <table className="sj-spec-table">
                <caption>선진건설(주) 기업 기본 정보</caption>
                <tbody>
                  <tr>
                    <th scope="row">상호 (법인명)</th>
                    <td>{company.legalName} ({company.name})</td>
                    <th scope="row">영문 상호</th>
                    <td>{company.nameEn}</td>
                  </tr>
                  <tr>
                    <th scope="row">대표자</th>
                    <td>{company.ceo ?? "업체 확인 후 고시"}</td>
                    <th scope="row">사업자등록번호</th>
                    <td>{company.businessNumber ?? "업체 확인 후 고시"}</td>
                  </tr>
                  <tr>
                    <th scope="row">주력 시공분야</th>
                    <td colSpan={3}>
                      경계·도로 구조물 시공 / 보행로·투수·점자블록 포장 / 우수·배수로(U형 측구·그레이팅) 정비 / 보강토 옹벽·석축 및 외부시설 유지보수
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">건설업 등록현황</th>
                    <td colSpan={3}>{company.licenseInfo ?? "보유 전문건설업 등록증 확인 후 고시 예정"}</td>
                  </tr>
                  <tr>
                    <th scope="row">사업장 소재지</th>
                    <td colSpan={3}>{company.address ?? "본사 도로명 주소 확인 후 고시 예정"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="sj-section-block">
            <div className="sj-block-head">
              <span>CORE COMPETENCY</span>
              <h3>선진건설 3대 핵심 역량</h3>
            </div>
            <div className="sj-strength-grid">
              {coreStrengths.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="sj-strength-card">
                    <div className="sj-strength-card__icon">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="sj-cta-strip">
            <div>
              <strong>현장 여건에 맞는 시공 범위와 실측 일정이 궁금하신가요?</strong>
              <p>위치와 필요 공정을 알려주시면 담당 기술진이 검토 기준을 안내해 드립니다.</p>
            </div>
            <div className="sj-cta-strip__btns">
              <Link href="/services/scope" className="sj-btn sj-btn--outline">
                <CheckCircle2 size={16} /> 공정 범위 확인
              </Link>
              <Link href="/consultation" className="sj-btn sj-btn--primary">
                온라인 상담 신청 <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
