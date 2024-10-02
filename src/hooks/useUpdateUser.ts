import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { useNavigate } from "react-router-dom";
import { ProfileFormData } from "../pages/Profile";

const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: (data: ProfileFormData) =>
      apiClient.put("/users/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });
};

export default useUpdateUser;
