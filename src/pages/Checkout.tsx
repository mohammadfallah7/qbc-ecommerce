import CartProductsTable from "../components/CartProductsTable";
import useCart from "../stores/cart-store";
import useUser from "../stores/user-store";
import { finalPrice, taxPrice } from "../utils/calculate-price";
import { shippingPrice } from "../utils/constants";

const Checkout = () => {
  const { cartProducts, shippingInfo } = useCart();
  const user = useUser((state) => state.user);

  const productsPrice = cartProducts.reduce(
    (acc, current) => (acc += current.price),
    0
  );

  return (
    <div className="grid grid-cols-2 gap-14">
      <div className="col-span-2 md:col-span-1 overflow-x-auto">
        <CartProductsTable products={cartProducts} />
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-col gap-8 text-sm">
        <div className="flex flex-col">
          <h2 className="text-lg">آدرس دریافت</h2>
          <div className="flex items-center gap-2 mt-5">
            <span className="text-secondary">شماره سفارش:</span>
            <span>{shippingInfo?.id}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">نام:</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">ایمیل:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">آدرس:</span>
            <span>
              {shippingInfo?.city} - {shippingInfo?.address} -{" "}
              {shippingInfo?.zipCode}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">روش پرداخت:</span>
            <span>{shippingInfo?.paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg mb-5">خلاصه خرید</h2>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-secondary">قیمت محصولات:</span>
            <span>{productsPrice.toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-secondary">هزینه ارسال:</span>
            <span>{shippingPrice.toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-secondary">مالیات:</span>
            <span>{taxPrice(productsPrice).toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-secondary">مبلغ نهایی:</span>
            <span>{finalPrice(productsPrice).toLocaleString()} تومان</span>
          </div>
        </div>
        <button className="btn btn-secondary rounded-full">پرداخت</button>
      </div>
    </div>
  );
};

export default Checkout;
