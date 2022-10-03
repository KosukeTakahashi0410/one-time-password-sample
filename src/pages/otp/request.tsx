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
    <div className="flex-col justify-center max-w-full my-6">
      <div className="max-w-screen-md mx-auto">
        <h1>2段階認証を行う</h1>
        <section>
          <form onSubmit={handleSubmit(submitPhone)}>
            <div className="flex-col  justify-center">
              <label className="form-label inline-block mb-2 text-gray-700">
                携帯電話番号
              </label>
              <input
                {...register("phoneNumber")}
                placeholder="半角英数字で入力してください"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <p className="mb-2 text-sm">例）08000000000</p>
              {errors.phoneNumber != null && (
                <p>{errors.phoneNumber.message}</p>
              )}
            </div>
            <button disabled={!isValid || isSubmitting}>SNSを送信</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OTPRequest;
