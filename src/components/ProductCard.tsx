import { Link } from "react-router-dom";
// import useProducts from "../stores/products-store";
import PriceBadge from "./PriceBadge";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
import { ProductModel } from "../types/product.model";

interface Props {
  product: ProductModel;
}

const ProductCard = ({ product }: Props) => {
  // const likeProduct = useProducts((state) => state.likeProduct);

  return (
    <Link to={`/products/${product._id}?content=add-comment`}>
      <div className="flex flex-col gap-3">
        <div className="bg-base-300 w-full rounded-lg overflow-hidden h-36 relative">
          {/* {product.isFavorite ? (
            <BsHeartFill
              className="absolute top-2 right-2 z-10 cursor-pointer text-secondary"
              onClick={() => likeProduct(product.id)}
            />
          ) : (
            <BsHeart
              className="absolute top-2 right-2 z-10 cursor-pointer"
              onClick={() => likeProduct(product.id)}
            />
          )} */}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm ">{product.name}</p>
          <PriceBadge price={product.price} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
