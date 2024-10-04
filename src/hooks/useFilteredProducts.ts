import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { ShopFilterForm } from "../components/ShopFilter";
import { ProductModel } from "../types/product.model";

const useFilteredProducts = () => {
  return useMutation({
    mutationKey: ["filtered-products"],
    mutationFn: (data: ShopFilterForm) =>
      apiClient
        .post<ProductModel[]>("/products/filtered", {
          categories: [data.categories],
          price: [],
        })
        .then((response) => response.data),
  });
};

export default useFilteredProducts;
