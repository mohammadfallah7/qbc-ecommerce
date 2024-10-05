import { ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  children: ReactNode;
  useFormRegister: UseFormRegisterReturn;
  label?: string;
  error?: FieldError;
  defaultValue?: string | number;
}

const Select = ({
  children,
  label = "برچسب",
  useFormRegister,
  error,

  defaultValue,
}: Props) => {
  return (
    <label className="form-control w-full mb-3">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        {...useFormRegister}
        defaultValue={defaultValue}
        className={`select select-bordered text-sm ${error && "select-error"}`}
      >
        {children}
      </select>
    </label>
  );
};

export default Select;
