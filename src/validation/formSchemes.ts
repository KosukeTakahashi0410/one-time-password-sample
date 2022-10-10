import * as yup from "yup";
import { phoneNumberRegexp, numberRegex } from "./regex";

/** 携帯電話番号フォームバリデーションスキーマ */
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
  password: yup
    .string()
    .required("パスワードは必須項目です。")
    .matches(/(?=.*[a-z])/, "小文字を含めてください。")
    .matches(/(?=.*[A-Z])/, "大文字を含めてください。")
    .matches(/(?=.*[0-9])/, "数字を含めてください。")
    .min(8, "最低８文字含めてください。"),
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
