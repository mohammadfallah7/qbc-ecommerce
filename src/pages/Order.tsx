import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import useOrders from "../hooks/useOrders";
import { getDate } from "../utils/get-date";
import Loading from "../components/Loading";
import Warning from "../components/Warning";
import getImage from "../utils/get-image";

const Order = () => {
  const { data: orders, isLoading } = useOrders();

  if (!orders || orders.length === 0) {
    return <Warning title="هنوز هیچ سفارشی ثبت نکرده اید" />;
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
                <div className="w-12 h-12 bg-base-300 overflow-hidden rounded">
                  <img
                    src={getImage(orderItem.image)}
                    alt={orderItem.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td>{orderItem.name}</td>
              <td>{getDate(order.createdAt)}</td>
              <td>{orderItem.price.toLocaleString()}</td>
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
                <Link
                  to={`/details/${order._id}`}
                  className="btn btn-sm btn-secondary"
                >
                  جزییات
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));
};

export default Order;
