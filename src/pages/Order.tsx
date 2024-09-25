import useCart from "../stores/cart-store";
import useUser from "../stores/user-store";
import { showStatus } from "../utils/status";

const Order = () => {
  const { OrderedProduct } = useCart();
  const { user } = useUser();

  const getPaymentStatus = (ispaid: boolean) => {
    return ispaid
      ? { text: "پرداخت شده", className: "badge badge-success text-white" }
      : { text: "پرداخت نشده", className: "badge badge-error text-white" };
  };

  return (
    <div className="overflow-x-auto">
      <table className="table mt-14">
        {/* head */}
        <thead>
          <tr>
            <th>عکس</th>
            <th>نام محصول</th>
            <th>تاریخ</th>
            <th>کاربر</th>
            <th>قیمت نهایی</th>
            <th>پرداخت</th>
            <th>ارسال</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {OrderedProduct.length > 0 ? (
            OrderedProduct.map((product) => {
              const paymentStatus = getPaymentStatus(product.ispaid!);
              const shippingStatus = showStatus(product.shippingStatus!);

              return (
                <tr key={product.id}>
                  <th>
                    <div className="w-12 h-12 bg-slate-400"></div>
                  </th>
                  <td>{product.title}</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>{user?.name}</td>
                  <td>{product.price.toLocaleString()} تومان</td>

                  <td>
                    <div className={paymentStatus.className}>
                      {paymentStatus.text}
                    </div>
                  </td>

                  <td>
                    <div className={shippingStatus.className}>
                      {shippingStatus.text}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-secondary ">
                      جزییات
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                هیچ سفارشی ثبت نشده است.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
