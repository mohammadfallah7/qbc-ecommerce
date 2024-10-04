import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { CategoryModel } from "../types/category.model";

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      apiClient
        .get<CategoryModel[]>("/category/categories")
        .then((res) => res.data),
  });

export default useCategories;
