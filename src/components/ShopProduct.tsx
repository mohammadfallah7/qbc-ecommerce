import { LuShoppingCart } from "react-icons/lu";
import { ProductEntity } from "../types/product-entity";
import useCart from "../stores/cart-store";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";

interface Props {
  product: ProductEntity;
}

const ShopProduct = ({ product }: Props) => {
  const addProduct = useCart((state) => state.addProduct);

  return (
    <div className="card card-compact bg-base-100 shadow">
      <figure className="bg-base-300 w-full h-40 relative">
        <div className="badge badge-secondary text-xs absolute right-3 bottom-3">
          {product.brand}
        </div>
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="text-lg">{product.title}</h2>
          <span className="text-secondary">
            {product.price.toLocaleString()} تومان
          </span>
        </div>
        <p>{product.description}</p>
        <div className="card-actions items-center justify-between mt-2">
          <Link to={`/products/${product.id}?content=add-comment`}>
            <button className="btn btn-secondary btn-sm text-xs">
              مشاهده بیشتر
              <IoCaretBack />
            </button>
          </Link>
          <LuShoppingCart
            className="cursor-pointer"
            size={20}
            onClick={() => addProduct(product)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
