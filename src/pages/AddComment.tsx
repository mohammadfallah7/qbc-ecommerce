import { useForm } from "react-hook-form";
import useComments from "../stores/comment-store";

type FormData = {
  rate: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

const AddComment = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const addComment = useComments((state) => state.addComment);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addComment({
          id: Date.now(),
          rate: data.rate,
          title: data.comment,
          date: new Date(),
          author: "محمد فلاح",
        });

        reset();
      })}
    >
      <label className="form-control w-full max-w-xl my-5">
        <div className="label">
          <span className="label-text">امتیاز</span>
        </div>
        <select
          {...register("rate", { valueAsNumber: true, required: true })}
          className="select select-bordered"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      <label className="form-control w-full max-w-xl my-5">
        <div className="label">
          <span className="label-text">نظر</span>
        </div>
        <textarea
          {...register("comment", { required: true })}
          className="textarea textarea-bordered h-24 resize-none"
          placeholder="نظر خود را وارد نمایید"
        ></textarea>
      </label>
      <button type="submit" className="btn btn-secondary btn-sm text-xs">
        ثبت نظر
      </button>
    </form>
  );
};

export default AddComment;
