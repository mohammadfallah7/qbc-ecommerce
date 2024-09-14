import { Link } from "react-router-dom";
import useProducts from "../stores/products-store";
import { ProductEntity } from "../types/product-entity";
import PriceBadge from "./PriceBadge";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Props {
  product: ProductEntity;
}

const ProductCard = ({ product }: Props) => {
  const likeProduct = useProducts((state) => state.likeProduct);

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-base-300 w-full rounded-lg overflow-hidden h-36 relative">
        {product.isFavorite ? (
          <BsHeartFill
            className="absolute top-2 right-2 z-10 cursor-pointer text-secondary"
            onClick={() => likeProduct(product.id)}
          />
        ) : (
          <BsHeart
            className="absolute top-2 right-2 z-10 cursor-pointer"
            onClick={() => likeProduct(product.id)}
          />
        )}
      </div>
      <Link to={`products/${product.id}`}>
        <div className="flex justify-between items-center">
          <p className="text-sm ">{product.title}</p>
          <PriceBadge price={product.price} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
