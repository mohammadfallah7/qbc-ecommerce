import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  useFormRegister: UseFormRegisterReturn;
  value: string | number;
  title: string;
  error?: FieldError;
}

const Radio = ({ useFormRegister, value, error, title }: Props) => {
  return (
    <label className="form-control w-full flex-row items-center gap-1 mt-3">
      <input
        {...useFormRegister}
        type="radio"
        value={value}
        className={`radio radio-sm ${error && "radio-error"}`}
      />
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
    </label>
  );
};

export default Radio;
