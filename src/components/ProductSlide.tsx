import { Link } from "react-router-dom";
import ProductFeatureList from "./ProductFeatureList";
import { ProductModel } from "../types/product.model";

interface Props {
  product: ProductModel;
}

const ProductSlide = ({ product }: Props) => {
  return (
    <Link to={`products/${product._id}?content=add-comment`}>
      <div className="flex flex-col gap-3">
        <div className="bg-base-300 w-full rounded-lg overflow-hidden h-56 relative"></div>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-4">
            <p className="text-sm">{product.name}</p>
            <span className="text-sm self-end">
              {product?.price.toLocaleString()} تومان
            </span>
            <p className="text-sm">{product.description}</p>
          </div>
          <ProductFeatureList product={product} />
        </div>
      </div>
    </Link>
  );
};

export default ProductSlide;
