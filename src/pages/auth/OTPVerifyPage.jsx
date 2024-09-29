import FormField from "@components/FormField";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useVerityOtpMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackBarSlice";

const OTPVerifyPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const [verityOtp, { data, error, isError, isLoading, isSuccess }] =
    useVerityOtpMutation();

  const onSubmit = (formData) => {
    verityOtp({ otp: formData.otp, email: location?.state?.email });
  };
  console.log({ data, isError, isLoading });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        login({
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        }),
      );
      dispatch(
        openSnackbar({
          type: "success",
          message: "Verity OTP successfully",
          open: true,
        }),
      );
      navigate("/");
    }
    if (isError) {
      dispatch(
        openSnackbar({
          type: "error",
          message: error?.data?.message,
          open: true,
        }),
      );
    }
  }, [
    isSuccess,
    data?.accessToken,
    data?.refreshToken,
    dispatch,
    data?.message,
    navigate,
    isError,
    error,
  ]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification 💬
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          label={"Type your 6 digit security code"}
          name={"otp"}
          control={control}
          placeholder={""}
          Component={OTPInput}
        />
        <Button variant="contained" type="submit">
          {isLoading ? "Loading..." : " Verify my account"}
        </Button>
      </form>
      <p className="mt-4">
        Didn&apos;t get the code?
        <Link to={"/login"} className="ml-1 text-[#246AA3]">
          Resend
        </Link>
      </p>
    </div>
  );
};
export default OTPVerifyPage;
