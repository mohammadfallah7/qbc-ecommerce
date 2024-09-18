import CartProductsTable from "../components/CartProductsTable";
import useCart from "../stores/cart-store";

const Checkout = () => {
  const cartProducts = useCart((state) => state.cartProducts);

  return (
    <div className="grid grid-cols-2 gap-14">
      <div className="col-span-2 md:col-span-1 overflow-x-auto">
        <CartProductsTable products={cartProducts} />
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-col gap-14 text-sm">
        <div>
          <h2 className="text-lg">آدرس دریافت</h2>
          <div className="flex items-center gap-2 mt-5">
            <span className="text-secondary">شماره سفارش:</span>
            <span>2923910</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">نام:</span>
            <span>علی موسوی</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">ایمیل:</span>
            <span>mohammad@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">آدرس:</span>
            <span>تهران خیابان شریعتی</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">روش پرداخت:</span>
            <span>درگاه پرداخت پاسارگاد</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg">خلاصه خرید</h2>
          <div className="flex items-center justify-between mt-5">
            <span className="text-secondary">قیمت محصولات:</span>
            <span>
              {cartProducts
                .reduce(
                  (accumulator, current) => (accumulator += current.price),
                  0
                )
                .toLocaleString()}{" "}
              تومان
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-secondary">هزینه ارسال:</span>
            <span>{(10000).toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-secondary">مالیات:</span>
            <span>{(10000).toLocaleString()} تومان</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-secondary">مبلغ نهایی:</span>
            <span>{(10000).toLocaleString()} تومان</span>
          </div>
        </div>
        <button className="btn btn-secondary rounded-full">پرداخت</button>
      </div>
    </div>
  );
};

export default Checkout;
