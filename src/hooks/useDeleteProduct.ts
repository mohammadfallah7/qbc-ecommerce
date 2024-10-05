import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/api-client";

const useDeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => apiClient.delete("/products/" + id),
    onSuccess: () => {
      navigate("/all-product");
    },
  });
};

export default useDeleteProduct;
