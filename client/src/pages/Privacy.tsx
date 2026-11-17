import { SiteFrame, SubLayout, SubPageBanner } from "@/components/SiteShell";
import { company } from "@/config/company";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ShieldCheck } from "lucide-react";

export default function Privacy() {
  usePageMeta("개인정보처리방침", "개인정보 보호법 제30조에 따른 선진건설(주) 웹사이트 개인정보처리방침 법정 고시");

  return (
    <SiteFrame>
      <SubPageBanner
        eyebrow="PRIVACY POLICY"
        title="개인정보처리방침"
        description="개인정보 보호법 제30조에 따라 정보주체의 개인정보 처리 기준과 권익 보호 절차를 투명하게 고시합니다."
        crumbs="법적 고지 / 개인정보처리방침"
        image="/seonjin-03.jpg"
      />

      <SubLayout section="legal">
        <article className="sj-article sj-legal">
          <div className="sj-legal__summary">
            <div className="sj-legal__summary-head">
              <ShieldCheck size={20} aria-hidden="true" />
              <strong>주요 개인정보 처리 표시 (라벨링 요약)</strong>
            </div>
            <p>
              <strong>{company.legalName}</strong>(이하 &ldquo;회사&rdquo;)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 관련 고충을 신속히 처리하기 위하여 아래와 같이 개인정보처리방침을 수립·공개합니다.
            </p>
            <div className="sj-legal__summary-cards">
              <div>
                <span>개인정보 처리 목적</span>
                <strong>시공·견적 상담 검토 및 회신</strong>
              </div>
              <div>
                <span>웹사이트 서버 저장</span>
                <strong>미저장 (이메일 초안 전달형)</strong>
              </div>
              <div>
                <span>보유 및 파기 기준</span>
                <strong>상담 종결 후 지체 없이 파기</strong>
              </div>
            </div>
          </div>

          <section className="sj-legal__clause">
            <h2>제1조 (개인정보의 처리 목적)</h2>
            <p>
              회사는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하고 있는 개인정보는 아래 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.
            </p>
            <ul>
              <li>도로경계·보행포장·배수로·외부시설 정비 등 온라인 시공 상담 및 견적 문의 검토</li>
              <li>현장 방문 실측 일정 협의 및 문의 사항에 대한 유선·이메일 회신</li>
              <li>시공 관련 민원 사항의 사실관계 확인 및 처리 결과 안내</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>제2조 (개인정보의 처리 및 보유 기간)</h2>
            <p>
              ① 본 웹사이트는 별도의 회원제나 데이터베이스(DB) 서버를 운영하지 않으며, 온라인상담 화면에 입력하신 내용은 웹사이트 서버나 브라우저 영구저장소(localStorage 등)에 저장되지 않습니다.
            </p>
            <p>
              ② 이용자가 본인의 이메일 프로그램을 통해 회사 수신처로 직접 발송한 상담 메일은 <strong>상담 및 견적 안내 목적 달성 시(또는 접수일로부터 최대 1년 이내 상담 종료 시)까지 보유 후 지체 없이 파기</strong>합니다. 단, 정식 공사 계약 체결로 이어지거나 관계 법령에 의해 보존할 필요가 있는 경우에는 법정 보존기간 동안 보관합니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제3조 (처리하는 개인정보의 항목 및 수집 방법)</h2>
            <div className="sj-table-wrap">
              <table className="sj-spec-table">
                <caption>처리하는 개인정보 항목 및 수집 방법</caption>
                <thead>
                  <tr>
                    <th scope="col">구분</th>
                    <th scope="col">처리 항목</th>
                    <th scope="col">수집 방법</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>온라인 시공 상담</td>
                    <td>성함(업체·단지명), 연락처, 현장 위치, 희망 공정·시기, 상담 제목·내용, 발신 이메일 주소</td>
                    <td>이용자가 온라인상담 양식 작성 후 본인의 이메일 프로그램으로 직접 발송</td>
                  </tr>
                  <tr>
                    <td>서비스 접속 보안로그</td>
                    <td>접속 IP 주소, 브라우저·OS 종류, 접속 일시</td>
                    <td>정적 웹 호스팅 인프라(GitHub Pages) 보안 정책에 따라 자동 생성</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="sj-legal__clause">
            <h2>제4조 (개인정보의 제3자 제공)</h2>
            <p>
              회사는 정보주체의 개인정보를 제1조에서 명시한 목적 범위 내에서만 처리하며, 정보주체의 사전 동의 또는 법령의 특별한 규정에 해당하는 경우를 제외하고는 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제5조 (개인정보 처리의 위탁)</h2>
            <p>
              회사는 웹사이트 자체 DB를 통한 개인정보 저장·수집을 수행하지 않으므로 외부 수탁사에 고객 개인정보 처리를 위탁하고 있지 않습니다. 추후 업무 위탁이 발생할 경우 지체 없이 본 방침을 통해 수탁자와 위탁 업무를 고지하겠습니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제6조 (개인정보의 파기 절차 및 방법)</h2>
            <ul>
              <li><strong>파기 절차:</strong> 보유기간이 경과하거나 상담 목적이 달성된 수신 이메일 및 첨부 자료는 내부 검토 완료 후 지체 없이 삭제합니다.</li>
              <li><strong>파기 방법:</strong> 전자적 파일 형태(이메일 및 첨부 사진·도면)는 복원이 불가능한 방법으로 영구 삭제하며, 출력물은 분쇄 또는 소각하여 파기합니다.</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>제7조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h2>
            <p>
              정보주체는 언제든지 회사에 발송한 문의 메일 내 개인정보에 대해 열람·정정·삭제·처리정지를 요구할 수 있으며, 서면·유선·전자우편을 통해 요청 시 본인 확인 절차를 거쳐 지체 없이 조치합니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제8조 (개인정보의 안전성 확보조치)</h2>
            <ul>
              <li><strong>무서버(Zero-Storage) 설계:</strong> 웹사이트 서버 내 고객 DB 미보관으로 웹 취약점을 통한 개인정보 유출 위험 원천 차단</li>
              <li><strong>암호화 통신:</strong> 웹사이트 전 구간 HTTPS(SSL/TLS) 암호화 전송 적용</li>
              <li><strong>접근 통제:</strong> 공식 상담 이메일 계정의 담당자 외 접근 제한 및 주기적 보안 점검</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>제9조 (쿠키 등 자동 수집 장치의 설치·운영 및 거부)</h2>
            <p>
              회사는 이용자의 행태정보를 추적·저장하는 맞춤형 광고 쿠키(Cookie)를 사용하지 않습니다. 이용자는 웹 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다.
            </p>
          </section>

          <section className="sj-legal__clause">
            <h2>제10조 (개인정보 보호책임자 및 담당부서)</h2>
            <div className="sj-table-wrap">
              <table className="sj-spec-table">
                <caption>개인정보 보호책임자 안내</caption>
                <tbody>
                  <tr>
                    <th scope="row">개인정보 보호책임자</th>
                    <td>{company.privacyOfficer ?? "업체 확인 후 고시 예정 (대표자 또는 관리책임자 지정 즉시 반영)"}</td>
                  </tr>
                  <tr>
                    <th scope="row">담당부서</th>
                    <td>{company.privacyDepartment}</td>
                  </tr>
                  <tr>
                    <th scope="row">연락처 / 이메일</th>
                    <td>전화: {company.phone ?? "대표번호 등록 준비 중"} / 이메일: {company.email ?? "대표 이메일 등록 준비 중"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="sj-legal__clause">
            <h2>제11조 (권익침해 구제방법)</h2>
            <p>개인정보침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다.</p>
            <ul>
              <li>개인정보침해신고센터 (한국인터넷진흥원): (국번없이) 118 / privacy.kisa.or.kr</li>
              <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 / www.kopico.go.kr</li>
              <li>대검찰청 사이버수사과: (국번없이) 1301 / www.spo.go.kr</li>
              <li>경찰청 사이버수사국: (국번없이) 182 / ecrm.police.go.kr</li>
            </ul>
          </section>

          <section className="sj-legal__clause">
            <h2>제12조 (시행일 및 변경 고지)</h2>
            <p>본 개인정보처리방침은 <strong>{company.policyEffectiveDate}</strong>부터 시행됩니다.</p>
          </section>
        </article>
      </SubLayout>
    </SiteFrame>
  );
}
