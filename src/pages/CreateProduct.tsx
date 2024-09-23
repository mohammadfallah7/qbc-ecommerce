import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

type CreateProductFormData = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  image: FileList;
};

const CreateProduct = () => {
  const { register, handleSubmit } = useForm<CreateProductFormData>();

  const onSubmit = (data: CreateProductFormData) => {
    console.log(data);
  };

  return (
    <div className="w-2/3 flex flex-col gap-4">
      <h1 className="text-lg">محصول جدید</h1>
      <form className="grid grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-2">
          <Input
            label="آپلود عکس"
            type="file"
            useFormRegister={register("image")}
            isHidden={true}
            className="border border-dashed rounded-lg h-20 cursor-pointer input-bordered justify-center items-center"
          />
        </div>
        <div className="col-span-2 ">
          <Input
            label="نام"
            placeholder="نام محصول را وارد نمایید"
            useFormRegister={register("name")}
          />
        </div>
        <div className="col-span-2 flex gap-3">
          <Input
            label="قیمت"
            placeholder="قیمت محصول را وارد نمایید"
            useFormRegister={register("price")}
          />

          <Input
            label="برند"
            placeholder="برند محصول را وارد نمایید"
            useFormRegister={register("category")}
          />
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
          ساخت محصول جدید
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
