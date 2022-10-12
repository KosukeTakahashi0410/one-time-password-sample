import * as yup from "yup";
import { phoneNumberRegexp, numberRegex } from "./regex";

/** サインアップフォームバリデーションスキーマ */
export const signupFormScheme = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("必須項目です")
    .matches(numberRegex, {
      message: "半角英数字のみが入力できます",
    })
    .matches(phoneNumberRegexp, {
      message: "携帯電話番号の形式で入力してください",
    }),
});

/** ワンタイムパスワードフォームバリデーションスキーマ */
export const otpFormScheme = yup.object().shape({
  otp: yup
    .string()
    .required("必須項目です")
    .matches(numberRegex, {
      message: "半角英数字のみが入力できます",
    })
    .length(6, "6桁で入力してください"),
});
