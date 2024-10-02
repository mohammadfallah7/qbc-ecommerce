import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { UserModel } from "../types/user.model";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      apiClient.get<UserModel>("/users/profile").then((res) => res.data),
  });
};

export default useUser;
