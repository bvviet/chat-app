import FormField from "@components/FormField";
import TextInputs from "@components/FormInputs/TextInputs";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import backIcon from "../../../public/icons/backIcon.svg";

const ResetPassword = () => {
  const formSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(8, "New Password must be at least 8 characters long")
      .required(),

    confirmPassword: yup
      .string()
      .min(8, "Confirm Password must be at least 8 characters long")
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
      <p className="mb-5 text-center text-2xl font-bold">Reset Password 🔒</p>
      <p>
        {location?.state?.email ? "for" + location?.state?.email : ""}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          label={"New Password"}
          name={"newPassword"}
          type={"password"}
          control={control}
          placeholder={"············"}
          Component={TextInputs}
          error={errors["newPassword"]}
        />

        <FormField
          label={"Confirm Password"}
          name={"confirmPassword"}
          type={"password"}
          control={control}
          placeholder={"············"}
          Component={TextInputs}
          error={errors["confirmPassword"]}
        />

        <Button variant="contained" type="submit">
          Set New Password
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
export default ResetPassword;
