import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
import { ProductModel } from "../types/product.model";
import useCart from "../stores/cart-store";

interface Props {
  product: ProductModel;
}

const ShopProduct = ({ product }: Props) => {
  const addProduct = useCart((state) => state.addProduct);

  return (
    <div className="card card-compact bg-base-100 shadow">
      <figure className="bg-base-300 w-full h-40 relative">
        <img src={product.image} alt={product.name} />
        <div className="badge badge-secondary text-xs absolute right-3 bottom-3">
          {product.category?.name || "Uncategorized"}
        </div>
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="text-lg">{product.name}</h2>
          <span className="text-secondary">
            {product.price.toLocaleString()} تومان
          </span>
        </div>
        <p>{product.description}</p>
        <div className="card-actions items-center justify-between mt-2">
          <Link to={`/products/${product._id}?content=add-comment`}>
            <button className="btn btn-secondary btn-sm text-xs">
              مشاهده بیشتر
              <IoCaretBack />
            </button>
          </Link>
          <LuShoppingCart
            className="cursor-pointer"
            size={20}
            onClick={() =>
              addProduct(product, {
                _id: product?._id,
                name: product?.name,
                qty: product?.quantity,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
