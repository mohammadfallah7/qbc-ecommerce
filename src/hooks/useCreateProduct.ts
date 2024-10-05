import { useMutation } from "@tanstack/react-query";
import { CreateProductFormData } from "../pages/CreateProduct";
import apiClient from "../api/api-client";
import { useNavigate } from "react-router-dom";

const useCreateProduct = (image: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["new-product"],
    mutationFn: (data: CreateProductFormData) => {
      return apiClient.post(
        "/products",
        { ...data, image: image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

export default useCreateProduct;
