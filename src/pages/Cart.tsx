import { useEffect } from "react";
import { Link } from "react-router-dom";
import useNavItem from "../stores/nav-item-store";
import useCart from "../stores/cart-store";
import CartProduct from "../components/CartProduct";
import Warning from "../components/Warning";

const Cart = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const cartProducts = useCart((state) => state.cartProducts);

  useEffect(() => {
    changeNavItem("cart");
  });

  return cartProducts.length > 0 ? (
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
            .reduce((accumulator, current) => (accumulator += current.price), 0)
            .toLocaleString()}{" "}
          تومان
        </span>
        <Link
          to={"shopping-progress"}
          className="btn btn-secondary text-sm rounded-full"
        >
          تکمیل خرید
        </Link>
      </div>
    </div>
  ) : (
    <div className="m-14">
      <Warning title="سبد خرید خالی است." />
    </div>
  );
};

export default Cart;
