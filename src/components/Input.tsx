import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  useFormRegister: UseFormRegisterReturn;
  value?: string | number;
  error?: FieldError;
  isHidden?: boolean;
  className?: string;
  defaultValue?: string;
}

const Input = ({
  label = "برچسب",
  placeholder = "متن خود را بنویسید",
  type = "text",
  useFormRegister,
  value,
  error,
  isHidden = false,
  className = "",
  defaultValue,
}: Props) => {
  return (
    <label className={`form-control w-full mb-3 ${className}`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...useFormRegister}
        hidden={isHidden}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`input input-bordered text-sm ${error && "input-error"}`}
      />
    </label>
  );
};

export default Input;
