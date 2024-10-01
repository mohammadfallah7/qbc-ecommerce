import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { ShoppingProgressFormData } from "../pages/ShoppingProgress";
import useCart from "../stores/cart-store";
import { OrderModel } from "../types/order.model";

const useCreateOrder = (
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  const orderItems = useCart((state) => state.orderItems);
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: (data: ShoppingProgressFormData) =>
      apiClient
        .post<OrderModel>("/orders", {
          orderItems,
          paymentMethod: "درگاه پرداخت پاسارگاد",
          shippingAddress: {
            address: data?.address,
            city: data?.city,
            postalCode: data?.postalCode,
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      setStep(3);
    },
  });
};

export default useCreateOrder;
