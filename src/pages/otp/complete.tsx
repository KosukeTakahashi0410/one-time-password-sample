import type { NextPage } from "next";
import Link from "next/link";
import { pagesPath } from "@/lib/$path";

const OTPComplete: NextPage = () => {
  return (
    <div className="mt-8 pl-4 pr-4">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-lg font-bold">設定完了！</h1>
        <Link href={pagesPath.otp.$url()} className="mt-8">
          トップへ
        </Link>
      </div>
    </div>
  );
};

export default OTPComplete;
