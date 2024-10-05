import { useForm } from "react-hook-form";
import UploadImage from "../components/UploadImage";
import useUploadImage from "../hooks/useUploadImage";
import Input from "../components/Input";
import useCategories from "../hooks/useCategories";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

type CreateProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
};

const TestPage = () => {
  const { mutate: uploadImage, data: uploadedImage } = useUploadImage();
  const { register, handleSubmit } = useForm<CreateProductFormData>();
  const { data: categories } = useCategories();
  const { mutate } = useMutation({
    mutationKey: ["my-new-product"],
    mutationFn: (data: CreateProductFormData) =>
      apiClient.post("/products", {
        ...data,
        image: uploadedImage?.image,
      }),
  });

  return (
    <div>
      <UploadImage onUploadImage={(file) => uploadImage(file)} />
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <Input useFormRegister={register("name")} label="نام" />
        <Input useFormRegister={register("description")} label="توضیحات" />
        <Input
          type="number"
          useFormRegister={register("price", { valueAsNumber: true })}
          label="قیمت"
        />
        <div className="w-full mt-2 flex flex-col gap-2">
          <label htmlFor="category" className="label-text">
            دسته‌بندی
          </label>
          <select
            id="category"
            className="form-select select select-bordered block w-full"
            {...register("category")}
          >
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <Input
            type="number"
            useFormRegister={register("quantity", { valueAsNumber: true })}
            label="موجودی"
          />
        </div>
        <button type="submit" className="btn">
          ساخت محصول
        </button>
      </form>
    </div>
  );
};

export default TestPage;
