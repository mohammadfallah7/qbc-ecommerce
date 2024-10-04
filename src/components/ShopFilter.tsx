import { useForm } from "react-hook-form";
import useCategories from "../hooks/useCategories";
import Radio from "./Radio";

export type ShopFilterForm = {
  categories: string;
  price: number;
};

interface IShopFilterProps {
  onFilter: (data: ShopFilterForm) => void;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShopFilter: React.FC<IShopFilterProps> = ({ onFilter, setStatus }) => {
  const { register, handleSubmit, reset } = useForm<ShopFilterForm>();
  const { data: categories } = useCategories();

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onFilter(data);
        })}
      >
        <div className="badge badge-primary w-full py-4 mb-5">فیلتر برند</div>
        {categories?.map((category) => (
          <Radio
            title={category.name}
            key={category._id}
            useFormRegister={register("categories", { required: true })}
            value={category._id}
          />
        ))}
        <div className="badge badge-primary w-full py-4 mt-7 mb-5">
          فیلتر قیمت
        </div>
        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          placeholder="قیمت را وارد کنید"
          className="input input-bordered input-sm w-full"
        />
        <button
          type="submit"
          className="btn btn-outline btn-sm text-xs w-full mt-5"
        >
          اعمال فیلتر ها
        </button>
      </form>
      <button
        className="btn btn-xs btn-error text-white w-full mt-2"
        onClick={() => {
          setStatus(false);
          reset();
        }}
      >
        حذف فیلتر ها
      </button>
    </div>
  );
};

export default ShopFilter;
