import { useForm } from "react-hook-form";

type ShopFilterForm = {
  brand: "Apple" | "Samsung" | "LG";
  price: number;
};

const ShopFilter = () => {
  const { register, handleSubmit } = useForm<ShopFilterForm>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="badge badge-primary w-full py-4 mb-5">فیلتر برند</div>
      <label className="label cursor-pointer justify-normal gap-3">
        <input
          {...register("brand")}
          type="radio"
          value="Apple"
          className="radio radio-sm"
        />
        <span className="label-text">Apple</span>
      </label>
      <label className="label cursor-pointer justify-normal gap-3">
        <input
          {...register("brand")}
          type="radio"
          value="Samsung"
          className="radio radio-sm"
        />
        <span className="label-text">Samsung</span>
      </label>
      <label className="label cursor-pointer justify-normal gap-3">
        <input
          {...register("brand")}
          type="radio"
          value="LG"
          className="radio radio-sm"
        />
        <span className="label-text">LG</span>
      </label>

      <div className="badge badge-primary w-full py-4 mt-7 mb-5">
        فیلتر قیمت
      </div>
      <input
        {...register("price", { valueAsNumber: true })}
        type="number"
        className="input input-bordered input-sm w-full"
      />

      <button
        type="submit"
        className="btn btn-outline btn-sm text-xs w-full mt-5"
      >
        اعمال فیلتر ها
      </button>
    </form>
  );
};

export default ShopFilter;
