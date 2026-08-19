/**
 * GitHub Pages static edition: the original consultation board depended on
 * tRPC, authentication, a database, and object storage. Those services do not
 * run on GitHub Pages, so this route remains visible without making failed API
 * requests or pretending that data was actually submitted.
 */
import { Info, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { assetUrl } from "@/lib/siteAssets";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

export default function ConsultationList() {
  return (
    <SiteFrame>
      <PageTitle
        title="상담 리스트"
        subtitle="CONSULTATION LIST"
        crumbs="상담 리스트"
        image={assetUrl("/manus-storage/construction-hero-2_76fd72ca.jpg")}
      />
      <section className="sub-layout">
        <SubNavigation section="consultation" />
        <article className="sub-content board-content consultation-list-only">
          <div className="board-empty-state" style={{ padding: "44px 28px", lineHeight: 1.8 }}>
            <Info size={28} style={{ margin: "0 auto 14px" }} />
            <strong style={{ display: "block", marginBottom: 8, color: "#31475c" }}>
              정적 미리보기에서는 상담 게시판 저장 기능을 사용하지 않습니다.
            </strong>
            <p>
              기존 게시판은 서버·DB·로그인 기능을 사용하므로 GitHub Pages에서는 제공할 수 없습니다.
              실제 상담은 대표 연락처를 이용해 주세요.
            </p>
            <div style={{ marginTop: 22, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="primary-button" href="tel:010-0000-0000" style={{ marginTop: 0 }}>
                <Phone size={15} /> 010-0000-0000
              </a>
              <a className="primary-button" href="mailto:contact@oo-construction.co.kr" style={{ marginTop: 0 }}>
                <Mail size={15} /> 이메일 문의
              </a>
              <Link className="primary-button" href="/consultation" style={{ marginTop: 0 }}>
                상담 안내로 돌아가기
              </Link>
            </div>
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}
