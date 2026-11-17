import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, CheckCircle2, HardHat, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

const customerPromises = [
  {
    num: "01",
    title: "현장 확인 없는 주먹구구식 견적을 지양합니다.",
    desc: "작업 연장·면적, 장비 진입폭, 배수 방향과 철거 물량을 먼저 확인하여 착공 후 불필요한 설계 변경과 분쟁을 예방합니다.",
  },
  {
    num: "02",
    title: "포함 공정과 별도 협의 사항을 문서로 명확히 안내합니다.",
    desc: "자재 규격, 기층 두께, 폐기물 반출 여부 및 예정 작업 일수를 사전에 투명하게 구분해 설명드립니다.",
  },
  {
    num: "03",
    title: "현장 변수 발생 시 임의 시공하지 않고 즉시 협의합니다.",
    desc: "굴착 중 예상치 못한 지하 지장물이나 연약지반이 발견될 경우 작업을 멈추고 발주처에 현장 사진과 대안을 먼저 공유합니다.",
  },
  {
    num: "04",
    title: "완료 후 마감 선형·단차·주변 정리까지 합동 확인합니다.",
    desc: "시공 완료 후 보행 단차, 배수 흐름 및 현장 청소 상태를 발주처 담당자와 함께 점검하고 인계합니다.",
  },
];

const siteSafetyRules = [
  "작업 구간 외곽 안전펜스·라바콘·안내표지판 선(先) 설치 후 작업 개시",
  "보행자 우회 통로 확보 및 교차 구간 신호수·유도자 배치",
  "굴착기·소형 로더·절단기 작업 시 안전모·안전화·방진마스크 필수 착용",
  "절단(커팅) 작업 시 습식 살수 병행으로 비산먼지 및 소음 최소화",
  "당일 작업 종료 시 개구부·단차부 안전 덮개 설치 및 자재·잔재물 정돈",
];

export default function ServicePromise() {
  usePageMeta(
    "고객과의 약속 및 안전기준",
    "투명한 견적 기준, 통행 안전 보호 및 단계별 마감 검측을 실천하는 선진건설(주) 운영 원칙",
  );

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="OUR PROMISE & SAFETY"
        title="고객과의 약속"
        description="상담부터 준공 검측까지, 현장에서 반드시 지키는 4대 고객 약속과 통행 안전 기준입니다."
        crumbs="시공분야 / 고객과의 약속 · 안전수칙"
        image="/seonjin-04.jpg"
      />

      <SubLayout section="services">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">TRUST &amp; RESPONSIBILITY</span>
            <h2>
              분명한 사전 안내와
              <br />
              <em>안전한 현장 관리</em>를 약속합니다.
            </h2>
          </Reveal>

          <div className="sj-promise-grid">
            {customerPromises.map((item) => (
              <Reveal key={item.num} className="sj-promise-card">
                <span>PROMISE {item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="sj-section-block">
            <div className="sj-block-head">
              <span>
                <HardHat size={15} style={{ display: "inline", verticalAlign: "-2px", marginRight: "5px" }} />
                SITE SAFETY &amp; MANNER
              </span>
              <h3>도심지 · 운영 단지 내 시공 안전 5대 수칙</h3>
            </div>
            <div className="sj-safety-box">
              <div className="sj-safety-box__intro">
                <ShieldAlert size={22} />
                <p>
                  입주민과 보행자, 물류 차량이 상시 이동하는 현장일수록 안전 구획과 정돈 상태가 곧 시공 품질입니다. 선진건설(주)은 아래 5대 현장 안전 수칙을 기본 작업 표준으로 이행합니다.
                </p>
              </div>
              <ul className="sj-safety-box__list">
                {siteSafetyRules.map((rule) => (
                  <li key={rule}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="sj-cta-strip">
            <div>
              <strong>상담 전 어떤 항목을 미리 확인하면 좋을지 정리해 두었습니다.</strong>
              <p>사전 체크리스트를 통해 현장 조건을 선택하시면 온라인 상담 양식에 자동으로 연동됩니다.</p>
            </div>
            <div className="sj-cta-strip__btns">
              <Link href="/notices/pre-check" className="sj-btn sj-btn--primary">
                상담 전 확인사항 바로가기 <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
