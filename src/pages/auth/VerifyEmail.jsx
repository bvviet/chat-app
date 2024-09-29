import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Verify your email ✉️
      </p>
      <p className="mb-6 text-[15px] text-[#4B465C]">
        Account activation link sent to your email address: hello@example.com
        Please follow the link inside to continue.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Button variant="contained" type="submit">
          Skip for now
        </Button>
      </form>

      <p className="mt-4">
        Didn&apos;t get the mail?
        <Link to={"#"} className="ml-1 text-[#246AA3]">
          Resend
        </Link>
      </p>
    </div>
  );
};
export default VerifyEmail;
