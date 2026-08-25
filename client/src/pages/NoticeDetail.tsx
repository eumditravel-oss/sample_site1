import { getNotice } from "@/data/notices";
import { assetUrl } from "@/lib/siteAssets";
import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";
import NotFound from "./NotFound";

export default function NoticeDetail() {
  const [, params] = useRoute("/notices/:id");
  const notice = getNotice(params?.id ?? "");
  if (!notice) return <NotFound />;
  return (
    <SiteFrame>
      <PageTitle title="공지사항" subtitle="NOTICE" crumbs="공지사항 / 상세" image={assetUrl("/media/construction-hero-3_cc7a91dc.jpg")} />
      <section className="sub-layout"><SubNavigation section="notices" /><article className="sub-content production-notice-detail"><header><span>{notice.category}</span><h2>{notice.title}</h2><p>{notice.summary}</p></header><div>{notice.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link href="/notices"><ArrowLeft size={16} /> 목록으로 돌아가기</Link></article></section>
    </SiteFrame>
  );
}
