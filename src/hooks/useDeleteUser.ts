import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { UserModel } from "../types/user.model";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id: string) => apiClient.delete(`/users/${id}`),
    onMutate: (id) => {
      queryClient.setQueryData<UserModel[]>(["users"], (users) => {
        return users?.filter((user) => user._id !== id);
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export default useDeleteUser;
