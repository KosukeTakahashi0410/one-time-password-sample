import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpFormScheme } from "@/validation/formSchemes";
import { pagesPath } from "@/lib/$path";
import { useRouter } from "next/router";

interface OTPInput {
  otp: string;
}

const OTP: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<OTPInput>({
    mode: "onBlur",
    resolver: yupResolver(otpFormScheme),
  });

  /**
   * ワンタイムパスワードを送信する
   * @param inputValue フォームで入力した値
   */
  const submitOTP: SubmitHandler<OTPInput> = async ({ otp }): Promise<void> => {
    try {
      // TODO ここでAPIを呼び出し
      console.log(otp);

      // 入力画面に遷移
      await router.replace(pagesPath.otp.$url());
    } catch (error) {
      // TODO ここでtoastとか出すか
    }
  };

  return (
    <div>
      <h1>ワンタイムパスワードを入力する</h1>
      <section>
        <form>
          <div>
            <label onSubmit={handleSubmit(submitOTP)}>携帯電話番号</label>
            <input
              {...register("otp")}
              placeholder="半角英数字で入力してください"
            />
            <p>例）08000000000</p>
            {errors.otp != null && <p>{errors.otp.message}</p>}
          </div>
          <button type="submit" disabled={!isValid || isSubmitting}>
            送信
          </button>
        </form>
      </section>
    </div>
  );
};

export default OTP;
