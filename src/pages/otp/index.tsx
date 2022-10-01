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
    mode: "onBlur",
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
        await router.replace(pagesPath.otp.$url());
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
    <div>
      <h1>ワンタイムパスワードを入力する</h1>
      <section>
        <form>
          <div>
            <label onSubmit={handleSubmit(submitOTP)}>携帯電話番号</label>
            <input
              {...register("otp")}
              placeholder="半角英数字で入力してください"
              autoComplete="one-time-code"
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
