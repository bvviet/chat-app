import FormField from "@components/FormField";
import TextInputs from "@components/FormInputs/TextInputs";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import backIcon from "../../../public/icons/backIcon.svg";

const ForgotPassword = () => {
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
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
    console.log(formData);
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Forgot Password? 🔒</p>
      <p className="mb-6 text-[15px] text-[#4B465C]">
        Enter your email, and we&apos;ll send you instructions to reset your
        password
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          label={"Email"}
          name={"email"}
          type={"email"}
          control={control}
          placeholder={"john.doe@gmail.com"}
          Component={TextInputs}
          error={errors["email"]}
        />

        <Button variant="contained" type="submit">
          Send Reset Link
        </Button>
      </form>
      <div className="mt-4">
        <Link
          to={"/login"}
          className="ml-1 flex items-center justify-center text-[#246AA3]"
        >
          <img src={backIcon} alt="back" />
          <p>Back to log in</p>
        </Link>
      </div>
    </div>
  );
};
export default ForgotPassword;
