import * as yup from "yup";
import { phoneNumberRegexp, numberRegex } from "./regex";

/** 携帯電話番号フォームバリデーションスキーマ */
export const phoneNumberFormScheme = yup.object().shape({
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
    .max(6, { message: "6桁以下で入力してください" }),
});
