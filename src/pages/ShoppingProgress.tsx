import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Radio from "../components/Radio";
import CartProductsTable from "../components/CartProductsTable";
import { IoCaretBack } from "react-icons/io5";
import useCreateOrder from "../hooks/useCreateOrder";
import { Link } from "react-router-dom";

export type ShoppingProgressFormData = {
  address: string | undefined;
  city: string | undefined;
  country: string | undefined;
  postalCode: number | undefined;
  paymentMethod: "درگاه پرداخت پاسارگاد";
};

const ShoppingProgress = () => {
  const [step, setStep] = useState<number>(2);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShoppingProgressFormData>();

  const { mutate, isPending, data: order } = useCreateOrder(setStep);

  const onSubmit = (data: ShoppingProgressFormData) => {
    mutate(data);
    reset();
  };

  return (
    <div>
      <ul className="steps w-full mb-7">
        <li className={`step ${step >= 1 && "step-success"}`}>ورود</li>
        <li className={`step ${step >= 2 && "step-success"}`}>آدرس</li>
        <li className={`step ${step === 3 && "step-success"}`}>خلاصه خرید</li>
      </ul>
      {step === 2 && (
        <form
          className="flex flex-col w-4/6 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            error={errors.address}
            label="آدرس"
            placeholder="میدان ولیعهد"
            useFormRegister={register("address", { required: true })}
          />
          {errors.address?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          <Input
            error={errors.city}
            label="شهر"
            placeholder="تهران"
            useFormRegister={register("city", { required: true })}
          />
          {errors.address?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          <Input
            error={errors.country}
            label="کشور"
            placeholder="ایران"
            useFormRegister={register("country", { required: true })}
          />
          {errors.address?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          <Input
            error={errors.postalCode}
            label="کد پستی"
            type="number"
            placeholder="9441835549"
            useFormRegister={register("postalCode", {
              valueAsNumber: true,
              required: true,
            })}
          />
          {errors.address?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          <Radio
            error={errors.paymentMethod}
            useFormRegister={register("paymentMethod", { required: true })}
            value="درگاه پرداخت پاسارگاد"
          />

          <button type="submit" className="btn btn-secondary mt-5 rounded-full">
            ادامه
            {isPending && (
              <span className="loading loading-ring loading-xs"></span>
            )}
          </button>
        </form>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="btn btn-secondary btn-sm w-fit mt-5 rounded-full"
          >
            <IoCaretBack style={{ transform: "rotate(180deg)" }} />
            بازگشت
          </button>
          <div className="overflow-x-auto">
            <CartProductsTable products={order?.orderItems} />
          </div>
          <div className="grid grid-cols-3 gap-3 bg-base-300 rounded-lg p-4">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg">روش پرداخت</h3>
              <span className="text-xs">درگاه پرداخت پاسارگاد</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg">آدرس دریافت</h3>
              <span className="text-xs">
                {order?.shippingAddress.city} - {order?.shippingAddress.address}
                {order?.shippingAddress.postalCode}
              </span>
            </div>
            <div className="flex flex-col text-xs gap-3">
              <div className="flex items-center justify-between gap-2">
                <span>قیمت محصولات:</span>
                <span>{order?.itemsPrice.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>هزینه ارسال:</span>
                <span>{order?.shippingPrice.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>مالیات:</span>
                <span>{order?.taxPrice.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>مبلغ نهایی:</span>
                <span>{order?.totalPrice.toLocaleString()} تومان</span>
              </div>
            </div>
          </div>
          <Link to={"/checkout"} className="btn btn-secondary rounded-full">
            ثبت سفارش
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingProgress;
