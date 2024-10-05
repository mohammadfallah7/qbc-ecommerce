import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useUploadImage = () =>
  useMutation({
    mutationKey: ["upload-image"],
    mutationFn: (data: File) => {
      const formData = new FormData();
      formData.append("image", data);

      return apiClient
        .post<{ message: string; image: string }>("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          return res.data;
        });
    },
  });

export default useUploadImage;
