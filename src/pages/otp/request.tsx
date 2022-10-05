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
    mode: "onChange",
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
    <div className="mt-8 pl-4 pr-4">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-lg font-bold">2段階認証を行う</h1>
        <section>
          <form
            onSubmit={handleSubmit(submitPhone)}
            className="flex mt-2 flex-col justify-center"
          >
            <label className="form-label mt-2 text-gray-700">
              携帯電話番号
            </label>
            <input
              {...register("phoneNumber")}
              placeholder="半角英数字で入力してください"
              className="
                  form-control
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
                  mt-2
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            <p className="mt-2 text-sm">例）08000000000</p>
            {errors.phoneNumber != null && (
              <p className="mt-2 text-red-600" role="alert">
                {errors.phoneNumber.message}
              </p>
            )}
            <button
              disabled={!isValid || isSubmitting}
              className="mt-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-500 text-white rounded px-4 py-2"
            >
              SNSを送信
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OTPRequest;
