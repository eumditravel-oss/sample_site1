import { SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { company } from "@/config/company";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Terms() {
  usePageMeta("이용약관", "선진건설(주) 웹사이트 이용 조건, 권리·의무 및 면책 기준을 규정한 이용약관");

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="TERMS OF USE"
        title="이용약관"
        description="선진건설(주) 공식 웹사이트 이용에 관한 기본 조건과 권리·책임 사항을 안내합니다."
        crumbs="법적 고지 / 이용약관"
        image="/seonjin-03.jpg"
      />

      <SubLayout section="legal">
        <article className="sj-article sj-legal">
          <section className="sj-legal__clause">
            <h2>제1조 (목적)</h2>
            <p>
              본 약관은 {company.legalName}(이하 &ldquo;회사&rdquo;)이 운영하는 공식 웹사이트에서 제공하는 시공 분야 소개, 기술 아카이브 열람 및 온라인 상담 연결 서비스(이하 &ldquo;서비스&rdquo;)의 이용 조건 및 절차를 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제2조 (약관의 효력 및 개정)</h2>
            <p>
              ① 본 약관은 웹사이트 내에 게시하여 공지함으로써 효력이 발생합니다.<br />
              ② 회사는 관계 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 개정 시 시행일자와 변경 사유를 웹사이트 공지사항에 고지합니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제3조 (제공 서비스의 범위)</h2>
            <ul>
              <li>회사 소개, 오시는 길 및 주요 시공 대응 권역 안내</li>
              <li>도로경계·보행포장·배수로·외부시설 보수 등 전문 공정 범위 및 기술 기준 안내</li>
              <li>상담 전 자가 체크리스트 및 이메일·클립보드 기반 온라인 상담 초안 작성 도구 제공</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>제4조 (현장 실측 및 공사계약의 우선 효력)</h2>
            <p>
              ① 웹사이트에 수록된 시공 설명, 공정 순서 및 검측 기준은 고객의 이해를 돕기 위한 표준 안내 자료입니다.<br />
              ② 실제 공사의 물량, 단가, 포함·별도 범위, 공사 기간 및 하자보수 조건은 현장 방문 실측 후 <strong>양 당사자가 서면 합의한 최종 견적서 및 공사도급계약서</strong>에 의하여 확정됩니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제5조 (저작권의 귀속 및 무단 사용 금지)</h2>
            <p>
              본 웹사이트에 게시된 회사의 상호, 로고(CI), 문안, 현장 사진, 도표 및 편집 구성물에 대한 저작권은 회사에 귀속되며, 회사의 사전 서면 동의 없이 무단 복제, 전재, 배포하거나 상업적 목적으로 사용할 수 없습니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제6조 (이용자의 의무)</h2>
            <ul>
              <li>타인의 성명이나 연락처를 도용하여 허위 상담을 작성·발송하는 행위를 금합니다.</li>
              <li>웹사이트의 보안 기능을 훼손하거나 비정상적인 트래픽을 유발하는 행위를 금합니다.</li>
              <li>게시된 연락처·이메일 정보를 영리 목적 광고 전송이나 무단 수집에 이용하는 행위를 금합니다.</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>제7조 (면책사항)</h2>
            <p>
              회사는 천재지변, 통신망·호스팅 설비 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않으며, 이용자 기기의 외부 이메일 클라이언트 설정 오류로 인한 메일 미발송에 대해서는 이용자 본인의 발송 확인이 필요합니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제8조 (준거법 및 관할)</h2>
            <p>
              본 웹사이트 이용과 관련한 분쟁에는 대한민국 법률을 적용하며, 소송이 필요한 경우 민사소송법상 관할법원을 제1심 법원으로 합니다.<br />
              시행일자: <strong>{company.policyEffectiveDate}</strong>
            </p>
          </section>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
