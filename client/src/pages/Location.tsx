import { company } from "@/config/company";
import { assetUrl } from "@/lib/siteAssets";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const mapUrl = company.address ? `https://map.naver.com/p/search/${encodeURIComponent(company.address)}` : null;

export default function Location() {
  return (
    <SiteFrame>
      <PageTitle title="오시는길" subtitle="VISIT" crumbs="회사소개 / 오시는길" image={assetUrl("/media/construction-hero_9277bcc5.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="company" />
        <article className="sub-content location-content">
          <div className="production-visit-card"><MapPin size={38} /><p className="content-kicker">VISIT INFORMATION</p><h2>방문 상담은<br />사전 협의 후 안내합니다.</h2><p>확정되지 않은 주소를 지도처럼 표시하지 않습니다. 사업장 주소가 회사 설정에 등록되면 외부 길찾기 버튼이 자동으로 제공됩니다.</p>{mapUrl && <a href={mapUrl} target="_blank" rel="noreferrer">네이버지도에서 보기 <ExternalLink size={16} /></a>}</div>
          <div className="location-details">
            {company.address && <div><MapPin size={22} /><span><b>주소</b> {company.address}</span></div>}
            {company.phone && <div><Phone size={21} /><span><b>연락처</b> <a href={`tel:${company.phone}`}>{company.phone}</a></span></div>}
            {company.email && <div><Mail size={21} /><span><b>이메일</b> <a href={`mailto:${company.email}`}>{company.email}</a></span></div>}
            {!company.address && !company.phone && !company.email && <div><MapPin size={22} /><span><b>안내</b> 방문 장소와 연락 채널은 실제 정보가 확정된 뒤 이 페이지에 표시됩니다.</span></div>}
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}
