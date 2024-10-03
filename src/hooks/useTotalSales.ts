import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useTotalSales = () => {
  return useQuery({
    queryKey: ["total-sales"],
    queryFn: () =>
      apiClient
        .get<{ totalSales: number }>("/orders/total-sales")
        .then((res) => res.data),
  });
};

export default useTotalSales;
