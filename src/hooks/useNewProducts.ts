import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { ProductModel } from "../types/product.model";

const useNewProducts = () =>
  useQuery({
    queryKey: ["new-products"],
    queryFn: () =>
      apiClient
        .get<ProductModel[]>("/products/sort/new")
        .then((response) => response.data),
  });
export default useNewProducts;
