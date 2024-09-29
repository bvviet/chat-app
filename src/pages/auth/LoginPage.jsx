import FormField from "@components/FormField";
import TextInputs from "@components/FormInputs/TextInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useLoginMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { openSnackbar } from "@redux/slices/snackBarSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess, error, isError, data }] =
    useLoginMutation();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
      .required(),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (formData) => {
    login(formData);
  };
  console.log({ email: getValues("email") });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          open: true,
          message: data?.message,
          type: "success",
        }),
      );
      navigate("/verity-otp", {
        state: {
          email: getValues("email"),
        },
      });
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
  }, [dispatch, error?.data, isSuccess, isError, data, getValues, navigate]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 text-center text-2xl font-bold">Login</h1>
        <h2 className="text-[22px] font-medium text-[#4B465C]">
          Welcome to WeConnect! 👋
        </h2>
        <p className="mt-1 text-[14px] text-[#4B465C]">
          Please sign in to your account and start the adventure
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          label={"Email"}
          name={"email"}
          control={control}
          placeholder={"john.doe@gmail.com"}
          Component={TextInputs}
          error={errors["email"]}
        />

        <FormField
          label={"PassWord"}
          name={"password"}
          control={control}
          type={"password"}
          placeholder={"············"}
          Component={TextInputs}
          error={errors["password"]}
          passWordLogin={true}
        />
        <Button variant="contained" type="submit">
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-4">
        new on our platform?
        <Link to={"/register"} className="ml-1 text-[#246AA3]">
          Create an account
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
