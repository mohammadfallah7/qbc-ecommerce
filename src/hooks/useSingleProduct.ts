import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { ProductModel } from "../types/product.model";
import { useParams } from "react-router-dom";

const useSingleProduct = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["product"],
    queryFn: () =>
      apiClient.get<ProductModel>("/products/" + id).then((res) => res.data),
  });
};

export default useSingleProduct;
