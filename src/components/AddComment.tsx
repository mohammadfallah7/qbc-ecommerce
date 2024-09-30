import { useForm } from "react-hook-form";
import TextArea from "./TextArea";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

type FormData = {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
};
interface IAddCommentProps {
  id: string | undefined;
}

const AddComment: React.FC<IAddCommentProps> = ({ id }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate } = useMutation({
    mutationKey: ["create-review"],
    mutationFn: (data: FormData) =>
      apiClient.post(`/products/${id}/reviews`, data),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
        reset();
      })}
    >
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
