import { privacyPolicy } from "@/data/legal";
import { PageTitle, SiteFrame } from "@/components/SiteShell";

export default function Privacy() {
  return (
    <SiteFrame>
      <PageTitle title={privacyPolicy.title} subtitle="PRIVACY" />
      <section className="production-policy">
        <div className="production-policy__intro"><p>이 방침은 현재 GitHub Pages 정적 사이트의 실제 동작을 기준으로 작성되었습니다.</p>{privacyPolicy.effectiveDate && <time>{privacyPolicy.effectiveDate}</time>}</div>
        {privacyPolicy.sections.map((section, index) => <section key={section.heading}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}
      </section>
    </SiteFrame>
  );
}
