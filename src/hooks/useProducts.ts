import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { ProductModel } from "../types/product.model";

const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () =>
      apiClient
        .get<ProductModel[]>("/products/allproducts")
        .then((response) => response.data),
  });

export default useProducts;
