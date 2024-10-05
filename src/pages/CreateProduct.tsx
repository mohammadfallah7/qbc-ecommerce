import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import useCategories from "../hooks/useCategories";
import UploadImage from "../components/UploadImage";
import useUploadImage from "../hooks/useUploadImage";
import useCreateProduct from "../hooks/useCreateProduct";

export type CreateProductFormData = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
};

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>();
  const { data: categories } = useCategories();
  const { mutate: uploadImage, data: uploadedImage } = useUploadImage();
  const { mutate, isPending, reset } = useCreateProduct(
    uploadedImage?.image || ""
  );

  const onSubmit = (data: CreateProductFormData) => {
    mutate(data);
    reset();
  };

  return (
    <div className="w-2/3">
      <h1 className="mb-5">محصول جدید</h1>
      <form className="grid grid-cols-2 " onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-2">
          <UploadImage onUploadImage={(file) => uploadImage(file)} />
        </div>
        <div className="col-span-2 ">
          <Input
            label="نام"
            placeholder="نام محصول را وارد نمایید"
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
            useFormRegister={register("price")}
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
          </div>
        </div>
        <div className="col-span-2">
          <TextArea label="توضیحات" useFormRegister={register("description")} />
        </div>
        <div className="col-span-2 flex gap-3">
          <Input
            label="تعداد قابل خرید"
            placeholder="تعداد قابل خرید را وارد نمایید"
            useFormRegister={register("quantity")}
          />

          <Input
            label="موجودی"
            placeholder="موجودی"
            useFormRegister={register("quantity")}
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm text-xs btn-secondary self-start w-36"
        >
          {isPending ? "در حال ساخت" : "ساخت محصول جدید"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
