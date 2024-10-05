import CartProductsTable from "../components/CartProductsTable";
import Loading from "../components/Loading";
import useOrder from "../hooks/useOrder";

const Details = () => {
  const { data: order, isLoading } = useOrder();

  if (isLoading) return <Loading />;

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
            <span>{order?.user?.username || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary">ایمیل:</span>
            <span>{order?.user?.email || "Unknown"}</span>
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
      </div>
    </div>
  );
};

export default Details;
