import { FaTrash } from "react-icons/fa6";
import useCart from "../stores/cart-store";
import { Link } from "react-router-dom";
import { ProductModel } from "../types/product.model";

interface Props {
  cartProduct: ProductModel;
}

const CartProduct = ({ cartProduct }: Props) => {
  const deleteProduct = useCart((state) => state.deleteProduct);

  return (
    <div className="flex items-center justify-between p-5">
      <Link to={`/products/${cartProduct._id}?content=add-comment`}>
        <div className="flex items-center justify-stretch gap-5">
          <div className="bg-base-300 w-24 h-24 rounded overflow-hidden">
            {/* <img
              src={cartProduct.image}
              alt={cartProduct.name}
              className="w-full object-cover h-full"
            /> */}
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="text-secondary">{cartProduct.name}</span>
            <span>{cartProduct.category?.name}</span>
            <span>{cartProduct.price.toLocaleString()} تومان</span>
          </div>
        </div>
      </Link>
      <FaTrash
        className="text-error cursor-pointer"
        onClick={() => deleteProduct(cartProduct._id)}
      />
    </div>
  );
};

export default CartProduct;
