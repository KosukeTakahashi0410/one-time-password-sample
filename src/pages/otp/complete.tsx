import type { NextPage } from "next";
import Link from "next/link";
import { pagesPath } from "@/lib/$path";

const OTPComplete: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Confirmed!</h1>
      <Link href={pagesPath.otp.$url()}>To OTP TOP</Link>
    </div>
  );
};

export default OTPComplete;
