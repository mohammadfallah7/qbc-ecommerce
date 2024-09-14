import { Link } from "react-router-dom";
import ProductFeature from "./ProductFeature";
import { FaComment, FaShop, FaStar } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";
import { IoTime } from "react-icons/io5";
import { ProductEntity } from "../types/product-entity";

interface Props {
  product: ProductEntity;
}

const ProductSlide = ({ product }: Props) => {
  return (
    <Link to={`products/${product.id}`}>
      <div className="flex flex-col gap-3">
        <div className="bg-base-300 w-full rounded-lg overflow-hidden h-56 relative"></div>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-4">
            <p className="text-sm">{product.title}</p>
            <span className="text-sm self-end">
              {product.price.toLocaleString()} تومان
            </span>
            <p className="text-sm">{product.description}</p>
          </div>
          <div className="grid grid-cols-2 grid-rows-3">
            <ProductFeature
              icon={<FaStar />}
              name="امتیاز"
              value={product.rate}
            />
            <ProductFeature
              icon={<FaShop />}
              name="برند"
              value={product.brand}
            />
            <ProductFeature
              icon={<GoNumber />}
              name="موجودی"
              value={product.count}
            />
            <ProductFeature
              icon={<FaComment />}
              name="نظرات"
              value={product.comments}
            />
            <ProductFeature
              icon={<IoTime />}
              name="بروزرسانی"
              value={product.update.getFullYear()}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductSlide;
