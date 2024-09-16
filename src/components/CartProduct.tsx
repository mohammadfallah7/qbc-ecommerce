import { FaTrash } from "react-icons/fa6";
import { ProductEntity } from "../types/product-entity";
import useCart from "../stores/cart-store";

interface Props {
  cartProduct: ProductEntity;
}

const CartProduct = ({ cartProduct }: Props) => {
  const deleteProduct = useCart((state) => state.deleteProduct);

  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center justify-stretch gap-5">
        <div className="bg-base-300 w-24 h-24 rounded"></div>
        <div className="flex flex-col gap-3 text-sm">
          <span className="text-secondary">{cartProduct.title}</span>
          <span>{cartProduct.brand}</span>
          <span>{cartProduct.price.toLocaleString()} تومان</span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <select className="select select-bordered select-sm">
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <FaTrash
          className="text-error cursor-pointer"
          onClick={() => deleteProduct(cartProduct.id)}
        />
      </div>
    </div>
  );
};

export default CartProduct;
