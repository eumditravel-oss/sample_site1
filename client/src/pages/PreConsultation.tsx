import { assetUrl } from "@/lib/siteAssets";
import { useState } from "react";
import { Link } from "wouter";
import { PageTitle, SiteFrame, SubNavigation } from "@/components/SiteShell";

const workOptions = ["경계 구조 시공", "보행로·블록 정비", "외부 시설 보수", "현장 부대 공정", "확인 필요"];
const scheduleOptions = ["1주 이내", "1개월 이내", "일정 협의"];

export default function PreConsultation() {
  const [locationReady, setLocationReady] = useState(false);
  const [photoReady, setPhotoReady] = useState(false);
  const [workType, setWorkType] = useState("");
  const [schedule, setSchedule] = useState("");
  const params = new URLSearchParams();
  if (workType) params.set("workType", workType);
  if (schedule) params.set("schedule", schedule);
  const ready = locationReady && photoReady && Boolean(workType) && Boolean(schedule);

  return (
    <SiteFrame>
      <PageTitle title="상담 전 확인사항" subtitle="BEFORE INQUIRY" crumbs="상담안내 / 상담 전 확인사항" image={assetUrl("/media/construction-hero-3_cc7a91dc.jpg")} />
      <section className="sub-layout">
        <SubNavigation section="consultation" />
        <article className="sub-content precheck-content">
          <div className="precheck-content__lead"><p className="content-kicker">CHECK FOUR ITEMS</p><h2>네 가지를 준비하면<br /><em>문의 작성이 빨라집니다.</em></h2><p>선택한 공정과 희망 시기는 문의 화면에 이어서 반영됩니다.</p></div>
          <ol className="precheck-content__list">
            <li><span>01</span><div><h3>현장 위치</h3><p>현장 주소 또는 작업 구간을 확인해 주세요.</p><button type="button" className={locationReady ? "is-selected" : ""} onClick={() => setLocationReady((value) => !value)}>{locationReady ? "위치 확인 완료" : "현장 위치 확인"}</button></div></li>
            <li><span>02</span><div><h3>필요 공정</h3><p>가장 가까운 공정을 선택해 주세요.</p><div className="precheck-options">{workOptions.map((option) => <button type="button" key={option} className={workType === option ? "is-selected" : ""} onClick={() => setWorkType(option)}>{option}</button>)}</div></div></li>
            <li><span>03</span><div><h3>희망 시기</h3><p>상담을 위한 참고 시기를 선택해 주세요.</p><div className="precheck-options">{scheduleOptions.map((option) => <button type="button" key={option} className={schedule === option ? "is-selected" : ""} onClick={() => setSchedule(option)}>{option}</button>)}</div></div></li>
            <li><span>04</span><div><h3>사진·도면</h3><p>현장 사진은 이메일 앱에서 직접 첨부합니다.</p><button type="button" className={photoReady ? "is-selected" : ""} onClick={() => setPhotoReady((value) => !value)}>{photoReady ? "자료 준비 완료" : "사진·도면 준비"}</button></div></li>
          </ol>
          <div className={`precheck-content__cta ${ready ? "is-ready" : ""}`}><p>{ready ? "준비 항목을 모두 확인했습니다." : "네 항목을 확인하면 문의 내용을 빠르게 작성할 수 있습니다."}</p><Link href={`/consultation${params.size ? `?${params.toString()}` : ""}`}>문의 내용 작성하기</Link></div>
        </article>
      </section>
    </SiteFrame>
  );
}
