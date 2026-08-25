import { ArrowLeft, Home } from "lucide-react";
import { Link } from "wouter";
import { SiteFrame } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteFrame>
      <section className="production-not-found"><span>404</span><p>PAGE NOT FOUND</p><h1>요청한 페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 존재하지 않는 경로입니다.</p><div><Link href="/"><Home size={17} /> 홈으로 이동</Link><Link href="/notices"><ArrowLeft size={17} /> 공지사항 보기</Link></div></section>
    </SiteFrame>
  );
}
