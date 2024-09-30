import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { UserModel } from "../types/user.model";

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.get<UserModel[]>("/users").then((res) => res.data),
  });
export default useUsers;
