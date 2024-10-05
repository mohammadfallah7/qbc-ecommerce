import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { AddCommentFormData } from "../components/AddComment";
import { useParams } from "react-router-dom";

const useCreateReview = () => {
  const { id } = useParams();

  return useMutation({
    mutationKey: ["create-review"],
    mutationFn: (data: AddCommentFormData) =>
      apiClient.post(`/products/${id}/reviews`, data),
  });
};

export default useCreateReview;
