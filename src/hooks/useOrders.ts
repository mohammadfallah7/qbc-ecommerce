import { useQuery } from "@tanstack/react-query";
import { OrderModel } from "../types/order.model";
import apiClient from "../api/api-client";

const useOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: () =>
      apiClient.get<OrderModel[]>("/orders/mine").then((res) => res.data),
  });
};

export default useOrders;
