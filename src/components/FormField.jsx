import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const FormField = ({
  control,
  label,
  name,
  Component,
  type,
  placeholder,
  error,
  passWordLogin = false,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="mb-1 text-sm font-bold text-dark-100">{label}</p>
        {passWordLogin && (
          <Link to={"/forgot-password"} className="text-[13px] text-[#246AA3]">
            Forgot Password?
          </Link>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              placeholder={placeholder}
              error={error}
            />
          );
        }}
      />
      {error && (
        <FormHelperText
          error={true}
          sx={{ fontSize: "14px", fontWeight: "500" }}
        >
          {error.message}
        </FormHelperText>
      )}
    </div>
  );
};
export default FormField;
