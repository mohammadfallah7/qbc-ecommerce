import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const usePaidOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["make-paid"],
    mutationFn: (id: string) => apiClient.put(`/orders/${id}/pay`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
};

export default usePaidOrder;
