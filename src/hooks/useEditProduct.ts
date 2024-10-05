import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { useNavigate, useParams } from "react-router-dom";
import { EditProductFormData } from "../pages/EditProduct";

const useEditProduct = (image: string | undefined) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: (data: EditProductFormData) =>
      apiClient.put(
        "/products/" + id,
        { ...data, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    onSuccess: () => {
      navigate("/all-product");
    },
  });
};

export default useEditProduct;
