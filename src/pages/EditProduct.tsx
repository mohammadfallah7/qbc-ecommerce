import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useDeleteProduct from "../hooks/useDeleteProduct";
import UploadImage from "../components/UploadImage";
import useUploadImage from "../hooks/useUploadImage";
import Select from "../components/Select";
import useEditProduct from "../hooks/useEditProduct";

export type EditProductFormData = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
};

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductFormData>();
  const { data: categories } = useCategories();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: uploadImage, data: uploadedImage } = useUploadImage();
  const { id } = useParams();
  const { data: products, isLoading } = useProducts();
  const product = products?.find((product) => product._id === id);
  const { mutate } = useEditProduct(uploadedImage?.image);

  const onSubmit = (data: EditProductFormData) => {
    console.log("Submit");
    mutate(data);
  };

  function handleDelete(): void {
    console.log("Delete");
    deleteProduct();
  }

  if (isLoading) return <Loading />;

  return (
    <div className="w-2/3">
      <div className="flex items-center justify-between mb-5">
        <h1>ویرایش محصول</h1>
        <button
          className="btn w-fit btn-xs text-xs text-white btn-error"
          onClick={handleDelete}
        >
          حذف محصول
        </button>
      </div>
      <form className="grid grid-cols-2 " onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-2">
          <UploadImage onUploadImage={(file) => uploadImage(file)} />
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

          <Select useFormRegister={register("category")} label="دسته بندی">
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-2">
          <TextArea
            label="توضیحات"
            defaultValue={product?.description}
            useFormRegister={register("description")}
          />
        </div>
        <div className="col-span-2">
          <Input
            label="موجودی"
            placeholder="موجودی محصول را وارد نمایید"
            defaultValue={product?.quantity}
            useFormRegister={register("quantity")}
          />
        </div>
        <button
          type="submit"
          className="btn w-fit btn-sm text-white btn-success"
        >
          بروزرسانی محصول
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
