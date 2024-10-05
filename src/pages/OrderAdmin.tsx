import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { getDate } from "../utils/get-date";
import Loading from "../components/Loading";
import useAdminOrders from "../hooks/useAdminOrders";
import usePaidOrder from "../hooks/usePaidOrder";
import useDeliveryOrder from "../hooks/useDeliveryOrder";
import Warning from "../components/Warning";

const OrderAdmin = () => {
  const { data: orders, isLoading } = useAdminOrders();
  const { mutate: makePaid } = usePaidOrder();
  const { mutate: makeDelivery } = useDeliveryOrder();

  if (!orders || orders.length === 0) {
    return <Warning title="هنوز هیچ سفارشی ثبت نشده است" />;
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
                <div className="w-12 h-12 bg-base-300 rounded">
                  {/* Image */}
                </div>
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
                    className="btn btn-xs btn-secondary"
                  >
                    جزییات
                  </Link>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() =>
                      !order.isDelivered && makeDelivery(order?._id)
                    }
                  >
                    ارسال
                  </button>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => !order.isPaid && makePaid(order?._id)}
                  >
                    پرداخت
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
