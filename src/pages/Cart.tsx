import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useNavItem from "../stores/nav-item-store";
import useCart from "../stores/cart-store";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const { pathname } = useLocation();
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const cartProducts = useCart((state) => state.cartProducts);

  useEffect(() => {
    changeNavItem(pathname.substring(1));
  });

  return (
    cartProducts.length > 0 && (
      <div className="grid grid-cols-2 grid-rows-subgrid gap-7">
        <div className="col-span-2">
          {cartProducts.map((cartProduct) => (
            <CartProduct key={cartProduct.id} cartProduct={cartProduct} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span>تعداد ({cartProducts.length})</span>
          <span className="font-bold">
            {cartProducts
              .reduce(
                (accumulator, current) => (accumulator += current.price),
                0
              )
              .toLocaleString()}{" "}
            تومان
          </span>
          <button className="btn btn-secondary text-sm rounded-full">
            تکمیل خرید
          </button>
        </div>
      </div>
    )
  );
};

export default Cart;
