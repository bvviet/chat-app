import FormField from "@components/FormField";
import TextInputs from "@components/FormInputs/TextInputs";
import { Alert, Button } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackBarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading, error, isError, isSuccess, data }] =
    useRegisterMutation();

  const formSchema = yup.object().shape({
    fullName: yup.string().required(),
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
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (formData) => {
    register(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          open: true,
          message: data?.message,
          type: "success",
        }),
      );
      navigate("/login");
    }
  }, [isSuccess, dispatch, navigate, error, isError, data]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 text-center text-2xl font-bold">Register</h1>
        <h2 className="text-[22px] font-medium text-[#4B465C]">
          Adventure starts here 🚀
        </h2>
        <p className="mt-1 text-[14px] text-[#4B465C]">
          Make your app management easy and fun!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          label={"Full name"}
          name={"fullName"}
          control={control}
          placeholder={"john.doe"}
          Component={TextInputs}
          error={errors["fullName"]}
        />

        <FormField
          label={"Email"}
          name={"email"}
          type={"email"}
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
        />
        <Button variant="contained" type="submit">
          {isLoading ? "loading..." : "Sign up"}
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="mt-4">
        Already have an account?
        <Link to={"/login"} className="ml-1 text-[#246AA3]">
          Sign up instead
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
