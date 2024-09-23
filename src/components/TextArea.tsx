import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label?: string;
  placeholder?: string;
  useFormRegister: UseFormRegisterReturn;
  error?: FieldError;
  isFullWidth?: boolean;
}

const TextArea = ({
  label = "برچسب",
  placeholder = "متن خود را بنویسید",
  useFormRegister,
  error,
  isFullWidth = true,
}: Props) => {
  return (
    <label className={`form-control w-full mb-3 ${!isFullWidth && "max-w-xl"}`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        {...useFormRegister}
        className={`textarea textarea-bordered h-24 resize-none ${
          error && "textarea-error"
        } `}
        placeholder={placeholder}
      ></textarea>
    </label>
  );
};

export default TextArea;