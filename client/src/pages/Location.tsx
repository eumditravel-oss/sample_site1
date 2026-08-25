import { company, contentMode, sampleCompany } from "@/config/company";
import { assetUrl } from "@/lib/siteAssets";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const mapUrl = company.address ? `https://map.naver.com/p/search/${encodeURIComponent(company.address)}` : null;

export default function Location() {
  return (
    <SiteFrame>
      <PageTitle title="오시는길" subtitle="VISIT" crumbs="회사소개 / 오시는길" image={assetUrl("/media/construction-hero_9277bcc5.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="company" />
        <article className="sub-content location-content">
          <div className="production-visit-card"><MapPin size={38} /><p className="content-kicker">VISIT INFORMATION</p><h2>방문 상담은<br />사전 협의 후 안내합니다.</h2><p>{company.address ? "등록된 사업장 주소를 기준으로 외부 길찾기를 제공합니다." : "실제 주소를 받기 전에는 기존 화면 구성을 확인할 수 있도록 샘플 주소를 표시합니다. 샘플 주소로는 길찾기 링크를 제공하지 않습니다."}</p>{mapUrl && <a href={mapUrl} target="_blank" rel="noreferrer">네이버지도에서 보기 <ExternalLink size={16} /></a>}</div>
          <div className="location-details">
            {company.address && <div><MapPin size={22} /><span><b>주소</b> {company.address}</span></div>}
            {company.phone && <div><Phone size={21} /><span><b>연락처</b> <a href={`tel:${company.phone}`}>{company.phone}</a></span></div>}
            {company.email && <div><Mail size={21} /><span><b>이메일</b> <a href={`mailto:${company.email}`}>{company.email}</a></span></div>}
            {company.businessHours && <div><Clock size={21} /><span><b>상담 시간</b> {company.businessHours}</span></div>}
            {contentMode === "sample" && !company.address && <div className="sample-data"><MapPin size={22} /><span><b>주소 예시</b> {sampleCompany.address} <small>샘플</small></span></div>}
            {contentMode === "sample" && !company.phone && <div className="sample-data"><Phone size={21} /><span><b>연락처 예시</b> {sampleCompany.phone} <small>샘플 · 연결되지 않음</small></span></div>}
            {contentMode === "sample" && !company.email && <div className="sample-data"><Mail size={21} /><span><b>이메일 예시</b> {sampleCompany.email} <small>샘플 · 전송되지 않음</small></span></div>}
            {contentMode === "sample" && !company.businessHours && <div className="sample-data"><Clock size={21} /><span><b>상담 시간 예시</b> {sampleCompany.businessHours} <small>샘플</small></span></div>}
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}
