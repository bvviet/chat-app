import { TextField } from "@mui/material";

const TextInputs = ({
  onChange,
  value = "",
  name,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: { className: "h-10 px-3 py-2" },
        htmlInput: { className: "!p-0" },
      }}
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      error={error}
    />
  );
};
export default TextInputs;
