import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getDate } from "../utils/get-date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { OrderModel } from "../types/order.model";
import Loading from "../components/Loading";

const OrderAdmin = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () =>
      apiClient.get<OrderModel[]>("/orders").then((res) => res.data),
  });
  const queryClient = useQueryClient();

  const { mutate: makePaid } = useMutation({
    mutationKey: ["make-paid"],
    mutationFn: (id: string) => apiClient.put(`/orders/${id}/pay`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
  const { mutate: makeDelivery } = useMutation({
    mutationKey: ["make-delivered"],
    mutationFn: (id: string) => apiClient.put(`/orders/${id}/deliver`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  if (!orders || orders.length === 0) {
    return <p className="mt-14 text-center">هیچ سفارشی وجود ندارد</p>;
  }
  if (isLoading) {
    return <Loading />;
  }

  return orders?.map((order) => (
    <div key={order._id} className="overflow-x-auto">
      <table className="table mt-14">
        <thead>
          <tr>
            <th>عکس</th>
            <th>نام محصول</th>
            <th>تاریخ</th>
            <th>قیمت نهایی</th>
            <th>پرداخت</th>
            <th>ارسال</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((orderItem) => (
            <tr key={orderItem._id}>
              <td>
                <div className="w-12 h-12 bg-base-300"></div>
              </td>
              <td>{orderItem.name}</td>
              <td>{getDate(order.createdAt)}</td>
              <td>{orderItem.price}</td>
              <td>
                {order.isPaid ? (
                  <StatusBadge color="success">پرداخت شده</StatusBadge>
                ) : (
                  <StatusBadge color="error">پرداخت نشده</StatusBadge>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  <StatusBadge color="success">ارسال شده</StatusBadge>
                ) : (
                  <StatusBadge color="error">ارسال نشده</StatusBadge>
                )}
              </td>
              <td>
                <div className="flex gap-5 items-center">
                  <Link
                    to={`/details/${order._id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    جزییات
                  </Link>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() =>
                      !order.isDelivered && makeDelivery(order?._id)
                    }
                  >
                    ارسال محصول
                  </button>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => !order.isPaid && makePaid(order?._id)}
                  >
                    پرداخت محصول
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));
};

export default OrderAdmin;
