import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

type CreateProductFormData = {
  productTitle: string;
  price: number;
  brand: string;
  description: string;
  image: string;
};

const CreateProduct = () => {
  const { register } = useForm<CreateProductFormData>();
  return (
    <div className="w-2/3">
      <h1>محصول جدید</h1>
      <div className="grid grid-cols-2 ">
        <div className="col-span-2 flex items-center justify-center border-dotted ">
          <label
            htmlFor="imageUpload"
            className="border-dashed border border-zinc-700 rounded-lg w-full h-24 flex items-center justify-center"
          >
            آپلود عکس
          </label>
          <input type="file" id="imageUpload" className="" hidden />
        </div>
        <div className="col-span-2 ">
          <Input
            label="نام"
            placeholder="نام محصول را وارد نمایید"
            useFormRegister={register("productTitle")}
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
            useFormRegister={register("brand")}
          />
        </div>
        <div className="col-span-2">
          <TextArea label="توضیحات" useFormRegister={register("description")} />
        </div>
        <div className="col-span-2 flex gap-3">
          <Input
            label="تعداد قابل خرید"
            placeholder="تعداد قابل خرید را وارد نمایید"
            useFormRegister={register("price")}
          />

          <Input
            label="موجودی"
            placeholder="موجودی"
            useFormRegister={register("brand")}
          />
        </div>
      </div>
      <button className="btn btn-sm btn-secondary mt-5">ساخت محصول جدید</button>
    </div>
  );
};

export default CreateProduct;
