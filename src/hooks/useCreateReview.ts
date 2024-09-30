import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { AddCommentFormData } from "../components/AddComment";

const useCreateReview = (id: string) => {
  return useMutation({
    mutationKey: ["create-review"],
    mutationFn: (data: AddCommentFormData) =>
      apiClient.post(`/products/${id}/reviews`, data),
  });
};

export default useCreateReview;
