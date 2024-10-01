import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Radio from "../components/Radio";
import useCart from "../stores/cart-store";
import CartProductsTable from "../components/CartProductsTable";
import { shippingPrice } from "../utils/constants";
import { finalPrice, taxPrice } from "../utils/calculate-price";
import { useNavigate } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

type ShoppingProgressFormData = {
  address: string;
  city: string;
  country: string;
  postalCode: number;
  paymentMethod: "درگاه پرداخت پاسارگاد";
};

const ShoppingProgress = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(2);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShoppingProgressFormData>();
  const { shippingInfo, addShippingInfo, cartProducts, orderItems } = useCart();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-order"],
    mutationFn: () =>
      apiClient.post("/orders", {
        orderItems,
        paymentMethod: shippingInfo?.paymentMethod,
        shippingAddress: {
          address: shippingInfo?.address,
          city: shippingInfo?.city,
          postalCode: shippingInfo?.postalCode,
        },
      }),
    onSuccess: () => {
      navigate("/checkout");
    },
  });

  useEffect(() => {
    if (shippingInfo) setStep((state) => (state < 3 ? state + 1 : state));
  }, [shippingInfo]);

  const onSubmit = (data: ShoppingProgressFormData) => {
    addShippingInfo({ ...data, id: Date.now() });
    reset();
  };

  const handleCreateOrder = () => {
    mutate();
  };

  const productsPrice = cartProducts.reduce(
    (acc, current) => (acc += current.price),
    0
  );

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
            <CartProductsTable products={cartProducts} />
          </div>
          <div className="grid grid-cols-3 gap-3 bg-base-300 rounded-lg p-4">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg">روش پرداخت</h3>
              <span className="text-xs">{shippingInfo?.paymentMethod}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg">آدرس دریافت</h3>
              <span className="text-xs">
                {shippingInfo?.city} - {shippingInfo?.address} -{" "}
                {shippingInfo?.postalCode}
              </span>
            </div>
            <div className="flex flex-col text-xs gap-3">
              <div className="flex items-center justify-between gap-2">
                <span>قیمت محصولات:</span>
                <span>{productsPrice.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>هزینه ارسال:</span>
                <span>{shippingPrice.toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>مالیات:</span>
                <span>{taxPrice(productsPrice).toLocaleString()} تومان</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>مبلغ نهایی:</span>
                <span>{finalPrice(productsPrice).toLocaleString()} تومان</span>
              </div>
            </div>
          </div>
          <button
            className="btn btn-secondary rounded-full"
            onClick={handleCreateOrder}
          >
            ثبت سفارش
            {isPending && (
              <span className="loading loading-ring loading-xs"></span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingProgress;
