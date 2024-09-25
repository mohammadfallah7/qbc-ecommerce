import { useForm } from "react-hook-form";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { useState } from "react";

type CreateProductFormData = {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  image: FileList;
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
      <form className="grid grid-cols-2 ">
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
