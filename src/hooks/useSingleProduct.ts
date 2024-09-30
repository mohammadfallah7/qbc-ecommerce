import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { ProductModel } from "../types/product.model";

const useSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () =>
      apiClient.get<ProductModel>("/products/" + id).then((res) => res.data),
  });
};

export default useSingleProduct;
