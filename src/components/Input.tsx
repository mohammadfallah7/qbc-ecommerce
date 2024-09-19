import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  useFormRegister: UseFormRegisterReturn;
  value?: string | number;
  error?: FieldError;
}

const Input = ({
  label = "برچسب",
  placeholder = "متن خود را بنویسید",
  type = "text",
  useFormRegister,
  value,
  error,
}: Props) => {
  return (
    <label className="form-control w-full mb-3">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...useFormRegister}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`input input-bordered text-sm ${error && "input-error"}`}
      />
    </label>
  );
};

export default Input;
