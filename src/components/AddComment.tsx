import { useForm } from "react-hook-form";
import TextArea from "./TextArea";
import useCreateReview from "../hooks/useCreateReview";

export type AddCommentFormData = {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

const AddComment = () => {
  const { register, handleSubmit, reset } = useForm<AddCommentFormData>();
  const { mutate, error } = useCreateReview();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
        reset();
      })}
    >
      {error && <p className="text-sm text-warning">{error.message}</p>}
      <label className="form-control w-full max-w-xl my-5">
        <div className="label">
          <span className="label-text">امتیاز</span>
        </div>
        <select
          {...register("rating", { valueAsNumber: true, required: true })}
          className="select select-bordered"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      <TextArea
        isFullWidth={false}
        label="نظر"
        placeholder="نظر خود را وارد نمایید"
        useFormRegister={register("comment", { required: true })}
      />
      <button type="submit" className="btn btn-secondary btn-sm text-xs">
        ثبت نظر
      </button>
    </form>
  );
};

export default AddComment;
