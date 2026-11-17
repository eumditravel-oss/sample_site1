import { Reveal, SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { company } from "@/config/company";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight, Building2, Clock, Compass, MapPin, Phone, Truck } from "lucide-react";
import { Link } from "wouter";

const facilityTypes = [
  {
    title: "공공 가로 · 보차도 구간",
    desc: "보도 정비, 화강경계석 교체, 횡단보도 낮춤연석 및 점자블록, 도로변 배수 측구 시공",
  },
  {
    title: "공동주택 · 아파트 단지",
    desc: "단지 내 보도블록 침하 보수, 산책로·광장 투수포장, 외곽 옹벽·배수로 및 안전시설 정비",
  },
  {
    title: "산업단지 · 공장 · 물류센터",
    desc: "대형 화물차 진출입구 파손 복구, 야드 중하중 그레이팅 트렌치, 부지 경계 구조물 시공",
  },
  {
    title: "상업 · 업무 · 교육시설",
    desc: "건물 전면 진입광장 정비, 주차장 경계석·스토퍼 설치, 배수 불량 물고임 구간 구배 개선",
  },
];

export default function Location() {
  usePageMeta("오시는길 및 현장 대응 안내", "선진건설(주) 사업장 위치 안내 및 현장 방문 실측·상담 진행 절차");

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="LOCATION & SERVICE COVERAGE"
        title="오시는길"
        description="선진건설(주) 사업장 안내 및 현장 방문 실측·대응 절차를 확인하실 수 있습니다."
        crumbs="회사소개 / 오시는길 · 시공권역"
        image="/seonjin-03.jpg"
      />

      <SubLayout section="company">
        <article className="sj-article">
          <Reveal className="sj-article__header">
            <span className="sj-eyebrow">OFFICE &amp; FIELD COVERAGE</span>
            <h2>
              사업장 안내 및
              <br />
              <em>현장 출장 실측 프로세스</em>
            </h2>
          </Reveal>

          <Reveal className="sj-location-card">
            <div className="sj-location-card__visual" aria-label="선진건설 사업장 위치 안내 모식도">
              <div className="sj-location-card__roads" />
              <div className="sj-location-card__marker">
                <MapPin size={28} />
                <div>
                  <strong>{company.name}</strong>
                  <span>공식 주소지 확인 후 지도 연동 예정</span>
                </div>
              </div>
            </div>

            <div className="sj-location-card__info">
              <dl>
                <div>
                  <dt>
                    <MapPin size={17} /> 사업장 소재지
                  </dt>
                  <dd>{company.address ?? "공식 도로명 주소 확인 후 고시 예정 (임의 주소 미표기 원칙)"}</dd>
                </div>
                <div>
                  <dt>
                    <Phone size={17} /> 대표 연락처
                  </dt>
                  <dd>{company.phone ?? "대표 전화번호 확인 후 고시 예정"}</dd>
                </div>
                <div>
                  <dt>
                    <Clock size={17} /> 상담·업무 시간
                  </dt>
                  <dd>{company.hours}</dd>
                </div>
                <div>
                  <dt>
                    <Truck size={17} /> 주요 대응 권역
                  </dt>
                  <dd>{company.serviceRegion}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal className="sj-section-block">
            <div className="sj-block-head">
              <span>TARGET FACILITIES</span>
              <h3>주요 현장 대응 시설 유형</h3>
            </div>
            <div className="sj-facility-grid">
              {facilityTypes.map((item) => (
                <div key={item.title} className="sj-facility-card">
                  <div className="sj-facility-card__head">
                    <Building2 size={18} />
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="sj-cta-strip">
            <div>
              <strong>
                <Compass size={18} style={{ display: "inline", verticalAlign: "-3px", marginRight: "6px" }} />
                방문 상담보다 현장 출장 실측이 먼저 필요하신가요?
              </strong>
              <p>토목·포장·보수 공사는 현장의 지반·배수·진입폭 확인이 필수입니다. 온라인으로 현장 주소를 남겨주시면 출장 실측 일정을 조율합니다.</p>
            </div>
            <div className="sj-cta-strip__btns">
              <Link href="/consultation" className="sj-btn sj-btn--primary">
                출장 실측 · 상담 요청 <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
