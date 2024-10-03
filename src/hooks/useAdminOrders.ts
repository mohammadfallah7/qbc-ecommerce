import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { OrderModel } from "../types/order.model";

const useAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: () =>
      apiClient.get<OrderModel[]>("/orders").then((res) => res.data),
  });
};

export default useAdminOrders;
