import * as yup from "yup";
import { phoneNumberRegexp } from "./regex";

export const phoneNumberScheme = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("必須項目です")
    .matches(phoneNumberRegexp, {
      message: "携帯電話番号の形式で入力してください",
    }),
});
