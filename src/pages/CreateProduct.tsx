import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { useState } from "react";

type CreateProductFormData = {
  productTitle: string;
  price: number;
  brand: string;
  description: string;
  image: string;
};

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
  } = useForm<CreateProductFormData>();
  const [fileState, setFileState] = useState<string>("");
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileState(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className="w-2/3">
      <h1 className="mb-5">محصول جدید</h1>
      <div className="grid grid-cols-2 ">
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
            onChange={handleUpload}
            accept="image/jpg image/png"
            hidden
          />
        </div>
        <div className="col-span-2 ">
          <Input
            label="نام"
            placeholder="نام محصول را وارد نمایید"
            useFormRegister={register("productTitle", {
              required: true,
              minLength: 3,
            })}
          />
          {errors.productTitle?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.productTitle?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 3 کارکتر باشد</p>
          )}
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
