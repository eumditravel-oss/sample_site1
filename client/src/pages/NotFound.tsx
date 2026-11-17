import { SiteFrame } from "@/components/SiteShell";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  usePageMeta("페이지를 찾을 수 없습니다", "요청하신 페이지 주소가 변경되었거나 존재하지 않습니다.");

  return (
    <SiteFrame>
      <section className="sj-not-found">
        <div className="sj-not-found__box">
          <span>404 ERROR</span>
          <h1>요청한 페이지를 찾을 수 없습니다.</h1>
          <p>입력하신 주소가 정확한지 다시 확인해 주시거나 아래 버튼을 통해 메인 화면으로 이동해 주세요.</p>
          <Link href="/" className="sj-btn sj-btn--primary">
            <ArrowLeft size={16} /> 홈 화면으로 돌아가기
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
