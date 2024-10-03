import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const useDeliveryOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["make-delivered"],
    mutationFn: (id: string) => apiClient.put(`/orders/${id}/deliver`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
};

export default useDeliveryOrder;
