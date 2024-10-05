import CartProductsTable from "../components/CartProductsTable";
import useUser from "../hooks/useUser";
import useOrders from "../hooks/useOrders";
import useCart from "../stores/cart-store";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { data: orders } = useOrders();
  const { data: user } = useUser();
  const order = orders && orders.length > 0 ? orders[orders.length - 1] : null;
  const clearCart = useCart((state) => state.clearCart);

  return (
    <div className="grid grid-cols-2 gap-14">
      <div className="col-span-2 md:col-span-1 overflow-x-auto">
        <CartProductsTable products={order?.orderItems} />
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-col gap-8 text-sm">
        <div className="flex flex-col">
          <h2 className="text-lg">آدرس دریافت</h2>
          <div className="flex items-center gap-2 mt-5">
            <span className="text-secondary">شماره سفارش:</span>
            <span>{order?._id}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">نام:</span>
            <span>{user?.username}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">ایمیل:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">آدرس:</span>
            <span>
              {order?.shippingAddress.city} - {order?.shippingAddress.address} -{" "}
              {order?.shippingAddress.postalCode}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">روش پرداخت:</span>
            <span>درگاه پرداخت پاسارگاد</span>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg mb-5">خلاصه خرید</h2>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-secondary">قیمت محصولات:</span>
            <span>{order?.itemsPrice.toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-secondary">هزینه ارسال:</span>
            <span>{order?.shippingPrice.toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-secondary">مالیات:</span>
            <span>{order?.taxPrice.toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-secondary">مبلغ نهایی:</span>
            <span>{order?.totalPrice.toLocaleString()} تومان</span>
          </div>
        </div>
        <Link
          to={"/order"}
          className="btn btn-secondary rounded-full"
          onClick={() => clearCart()}
        >
          پرداخت
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
