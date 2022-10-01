import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpFormScheme } from "@/validation/formSchemes";

interface PhoneInput {
  phoneNumber: string;
}

const OTP: NextPage = () => {
  const {
    register,
    formState: { isValid, isSubmitting, errors },
  } = useForm<PhoneInput>({
    mode: "onBlur",
    resolver: yupResolver(otpFormScheme),
  });

  return (
    <div>
      <h1>トップ</h1>
      <section>
        {/* FIXME: action */}
        <form>
          <div>
            <label htmlFor="">携帯電話番号</label>
            <input
              {...register("phoneNumber")}
              placeholder="半角英数字で入力してください"
            />
            <p>例）08000000000</p>
            {errors.phoneNumber != null && <p>{errors.phoneNumber.message}</p>}
          </div>
          <button disabled={!isValid || isSubmitting}>送信</button>
        </form>
      </section>
    </div>
  );
};

export default OTP;
