import { Link } from "react-router-dom";
import { FaShop, FaStar, FaComment } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { GoNumber } from "react-icons/go";
import useProducts from "../stores/products-store";
import { ProductEntity } from "../types/product-entity";
import Badge from "./Badge";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Props {
  product: ProductEntity;
  showInSlider?: boolean;
}

const ProductCard = ({ product, showInSlider = false }: Props) => {
  const likeProduct = useProducts((state) => state.likeProduct);

  if (showInSlider)
    return (
      <Link to={`products/${product.id}`}>
        <div className="flex flex-col gap-3">
          <div className="bg-base-300 w-full rounded-lg overflow-hidden h-56 relative"></div>
          <div className="grid grid-cols-2 gap-7">
            <div className="flex flex-col gap-4">
              <p className="text-sm">{product.title}</p>
              <Badge price={product.price} alignment="end" />
              <p className="text-sm">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-3">
              <div className="flex items-center gap-2">
                <FaStar />
                <span className="text-xs">امتیاز : {product.rate}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaShop />
                <span className="text-xs">برند : {product.brand}</span>
              </div>

              <div className="flex items-center gap-2">
                <GoNumber />
                <span className="text-xs">موجودی : {product.count}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaComment />
                <span className="text-xs">نظرات : {product.comments}</span>
              </div>

              <div className="flex items-center gap-2">
                <IoTime />
                <span className="text-xs">
                  بروزرسانی : {product.update.getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );

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
          <Badge price={product.price} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
