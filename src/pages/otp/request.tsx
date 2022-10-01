import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneNumberFormScheme } from "@/validation/formSchemes";
import { useRouter } from "next/router";
import { pagesPath } from "@/lib/$path";

interface PhoneInput {
  phoneNumber: string;
}

const OTPRequest: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<PhoneInput>({
    mode: "onBlur",
    resolver: yupResolver(phoneNumberFormScheme),
  });

  /**
   * 電話を送信する
   * @param inputValue フォームで入力した値
   */
  const submitPhone: SubmitHandler<PhoneInput> = async ({
    phoneNumber,
  }): Promise<void> => {
    try {
      // TODO ここでAPIを呼び出し
      console.log(phoneNumber);

      // 入力画面に遷移
      await router.push(pagesPath.otp.$url());
    } catch (error) {
      // TODO ここでtoastとか出すか
    }
  };

  return (
    <div>
      <h1>2段階認証を行う</h1>
      <section>
        <form onSubmit={handleSubmit(submitPhone)}>
          <div>
            <label htmlFor="">携帯電話番号</label>
            <input
              {...register("phoneNumber")}
              placeholder="半角英数字で入力してください"
            />
            <p>例）08000000000</p>
            {errors.phoneNumber != null && <p>{errors.phoneNumber.message}</p>}
          </div>
          <button disabled={!isValid || isSubmitting}>SNSを送信</button>
        </form>
      </section>
    </div>
  );
};

export default OTPRequest;
