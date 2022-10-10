import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpFormScheme } from "@/validation/formSchemes";
import { pagesPath } from "@/lib/$path";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

interface OTPInput {
  otp: string;
}

const OTP: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { isValid, isSubmitting, errors },
  } = useForm<OTPInput>({
    mode: "onChange",
    resolver: yupResolver(otpFormScheme),
  });

  /**
   * ワンタイムパスワードを送信する
   * @param inputValue フォームで入力した値
   */
  const submitOTP: SubmitHandler<OTPInput> = useCallback(
    async ({ otp }): Promise<void> => {
      try {
        // TODO ここでAPIを呼び出し
        console.log(otp);

        // 入力画面に遷移
        await router.replace(pagesPath.otp.complete.$url());
      } catch (error) {
        // TODO ここでtoastとか出すか
      }
    },
    [router]
  );

  /** OTP Credential API処理 */
  useEffect(() => {
    // OTP Credential APIが使用可能かどうか
    if (!("OTPCredential" in window)) {
      return;
    }

    const input = document.querySelector('input[autocomplete="one-time-code"]');

    if (input == null) {
      return;
    }

    const form = input.closest("form");
    const ac = new AbortController();
    const abort = (): void => ac.abort();

    if (form != null) {
      // ユーザー操作で送信したらabort
      form.addEventListener("submit", abort);
    }

    // OTP処理
    navigator.credentials
      .get({
        // @ts-expect-error
        otp: { transport: ["sms"] },
        signal: ac.signal,
      })
      .then(async (otp) => {
        // MEMO: hook formを使ってsetValue/trigger
        // @ts-expect-error
        setValue("otp", otp?.code ?? "");
        await trigger("otp");

        // バリデーションを満たしている
        if (isValid) {
          submitOTP({ otp: getValues("otp") });
        }
      })
      .catch((error) => {
        // 本来ならばここでできることはないが、便宜上エラーログを出すように
        console.log(error);
      });

    // クリーンアップ処理でlistenerをremove
    return () => {
      if (form != null) {
        form?.removeEventListener("submit", abort);
      }
    };
  }, [getValues, isValid, setValue, submitOTP, trigger]);

  return (
    <div className="mt-8 pl-4 pr-4">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-lg font-bold">ワンタイムパスワードを入力する</h1>
        <section>
          <form
            onSubmit={handleSubmit(submitOTP)}
            className="flex mt-2 flex-col justify-center"
          >
            <label className="form-label mt-2 text-gray-700">
              ワンタイムパスワード
            </label>
            <input
              {...register("otp")}
              placeholder="半角英数字で入力してください"
              autoComplete="one-time-code"
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
            {errors.otp != null && (
              <p className="mt-2 text-red-600" role="alert">
                {errors.otp.message}
              </p>
            )}
            <button
              disabled={!isValid || isSubmitting}
              className="mt-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-500 text-white rounded px-4 py-2"
            >
              送信
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OTP;
