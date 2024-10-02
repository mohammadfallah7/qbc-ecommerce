import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { OrderModel } from "../types/order.model";
import { useParams } from "react-router-dom";

const useOrder = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["my-order"],
    queryFn: () =>
      apiClient.get<OrderModel>("/orders/" + id).then((res) => res.data),
  });
};

export default useOrder;
