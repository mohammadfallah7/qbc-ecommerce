import { Link } from "react-router-dom";
import PriceBadge from "./PriceBadge";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { ProductModel } from "../types/product.model";
import useFavoriteProducts from "../stores/favoriteProduct-store";

interface Props {
  product: ProductModel;
}

const ProductCard = ({ product }: Props) => {
  const { likeProduct, disLikeProduct } = useFavoriteProducts();

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-base-300 w-full rounded-lg overflow-hidden h-36 relative">
        {product.isFavorite ? (
          <BsHeartFill
            className="absolute top-2 right-2 z-10 cursor-pointer text-secondary"
            onClick={() => disLikeProduct(product._id)}
          />
        ) : (
          <BsHeart
            className="absolute top-2 right-2 z-10 cursor-pointer text-secondary"
            onClick={() => likeProduct(product)}
          />
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <Link to={`/products/${product._id}?content=add-comment`}>
        <div className="flex justify-between items-center">
          <p className="text-sm ">{product.name}</p>
          <PriceBadge price={product.price} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
