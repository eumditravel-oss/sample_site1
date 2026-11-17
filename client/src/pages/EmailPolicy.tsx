import { SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { company } from "@/config/company";
import { usePageMeta } from "@/hooks/usePageMeta";
import { MailWarning } from "lucide-react";

export default function EmailPolicy() {
  usePageMeta("이메일무단수집거부", "정보통신망법 제50조의2에 따른 선진건설(주) 웹사이트 이메일 주소 무단수집 거부 고지");

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="EMAIL COLLECTION REFUSAL"
        title="이메일무단수집거부"
        description="정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따른 이메일 무단수집 거부 고지입니다."
        crumbs="법적 고지 / 이메일무단수집거부"
        image="/seonjin-03.jpg"
      />

      <SubLayout section="legal">
        <article className="sj-article sj-legal">
          <div className="sj-legal__summary">
            <div className="sj-legal__summary-head">
              <MailWarning size={20} aria-hidden="true" />
              <strong>이메일 주소 무단수집 거부 공식 고지</strong>
            </div>
            <p>
              본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 <strong>「정보통신망 이용촉진 및 정보보호 등에 관한 법률」</strong>에 의해 형사처벌됨을 유념하시기 바랍니다.
            </p>
          </div>

          <section className="sj-legal__clause">
            <h2>정보통신망법 제50조의2 (전자우편주소의 무단 수집행위 등 금지)</h2>
            <ul>
              <li>누구든지 인터넷 홈페이지 운영자 또는 관리자의 사전 동의 없이 인터넷 홈페이지에서 자동으로 전자우편주소를 수집하는 프로그램이나 그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니 됩니다.</li>
              <li>누구든지 제1항을 위반하여 수집된 전자우편주소를 판매·유통하여서는 아니 됩니다.</li>
              <li>누구든지 제1항과 제2항에 따라 수집·판매 및 유통이 금지된 전자우편주소임을 알면서 이를 정보 전송에 이용하여서는 아니 됩니다.</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>위반 시 벌칙 (정보통신망법 제74조)</h2>
            <p>
              위 규정을 위반하여 전자우편주소를 수집·판매·유통하거나 정보 전송에 이용한 자는 <strong>1년 이하의 징역 또는 1천만원 이하의 벌금</strong>에 처해질 수 있습니다.
            </p>
            <p>
              게시일자: <strong>{company.policyEffectiveDate}</strong> ({company.name})
            </p>
          </section>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
