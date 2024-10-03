import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useSalesByDate = () => {
  return useQuery({
    queryKey: ["sales-by-date"],
    queryFn: () =>
      apiClient
        .get<{ totalSales: number; _id: string }[]>(
          "/orders/total-sales-by-date"
        )
        .then((res) => res.data),
  });
};

export default useSalesByDate;
