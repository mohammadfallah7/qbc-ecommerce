import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { CategoryModel } from "../types/category.model";
import useSingleProduct from "../hooks/useSingleProduct";
import { useParams } from "react-router-dom";

type EditProductFormData = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  image: FileList;
};

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductFormData>();
  const [fileState, setFileState] = useState<string>("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileState(URL.createObjectURL(e.target.files[0]));
    }
  };

  const { id } = useParams();

  const { data: product } = useSingleProduct(id!);

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      apiClient
        .get<CategoryModel[]>("/category/categories")
        .then((res) => res.data),
  });

  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationKey: ["new-product"],
    mutationFn: (newProduct: EditProductFormData) => {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", String(newProduct.price));
      if (typeof newProduct.category === "string") {
        formData.append("category", newProduct.category);
      }
      formData.append("description", newProduct.description);
      formData.append("quantity", String(newProduct.quantity));
      if (newProduct.image && newProduct.image.length > 0) {
        formData.append("image", newProduct.image[0].name);
      }

      return apiClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      reset();
      setFileState("");
    },
  });

  const onSubmit = (data: EditProductFormData) => {
    mutate(data);
  };
  return (
    <div className="w-2/3">
      {isPending && <p>در حال ارسال...</p>}
      {isSuccess && <p className="text-success">محصول با موفقیت ساخته شد</p>}
      {isError && (
        <p className="text-error">خطا در ساخت محصول: {error.message}</p>
      )}

      <form className="grid grid-cols-2 " onSubmit={handleSubmit(onSubmit)}>
        <img className="hidden" />
        <div className="col-span-2 flex flex-col items-center justify-center border-dashed ">
          {fileState && (
            <div>
              <img
                src={fileState}
                className="rounded-md"
                width={300}
                height={300}
              />
            </div>
          )}
          <label
            htmlFor="imageUpload"
            className="border-dashed border border-zinc-700 rounded-lg mt-5 w-full h-24 flex items-center justify-center"
          >
            آپلود عکس
          </label>
          <input
            type="file"
            id="imageUpload"
            className=""
            {...register("image", {
              required: true,
              onChange: (e) => {
                handleUpload(e);
              },
            })}
            accept="image/jpg image/png"
            hidden
          />
        </div>
        <div className="col-span-2 ">
          <Input
            label="نام"
            placeholder="نام محصول را وارد نمایید"
            defaultValue={product?.name}
            useFormRegister={register("name", {
              required: true,
              minLength: 3,
            })}
          />
          {errors.name?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 3 کارکتر باشد</p>
          )}
        </div>
        <div className="col-span-2 flex gap-3">
          <Input
            label="قیمت"
            placeholder="قیمت محصول را وارد نمایید"
            defaultValue={product?.price}
            useFormRegister={register("price")}
          />

          <div className="w-full mt-2 flex flex-col gap-2">
            <label htmlFor="category" className="label-text">
              دسته‌بندی
            </label>
            <select
              id="category"
              className="select select-bordered form-select block w-full"
              {...register("category")}
            >
              {categoryData?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-2">
          <TextArea
            label="توضیحات"
            defaultValue={product?.description}
            useFormRegister={register("description")}
          />
        </div>
        <div className="col-span-2 flex gap-3">
          <Input
            label="تعداد قابل خرید"
            placeholder="تعداد قابل خرید را وارد نمایید"
            defaultValue={product?.quantity}
            useFormRegister={register("quantity")}
          />

          <Input
            label="موجودی"
            placeholder="موجودی"
            defaultValue={product?.quantity}
            useFormRegister={register("quantity")}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn w-fit btn-sm text-white btn-success">
            بروزرسانی محصول
          </button>
          <button className="btn w-fit btn-sm text-white btn-error">
            حذف محصول
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
