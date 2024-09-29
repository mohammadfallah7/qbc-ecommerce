import { FaComment, FaStar } from "react-icons/fa6";
import ProductFeature from "./ProductFeature";
import { GoNumber } from "react-icons/go";
import { IoTime } from "react-icons/io5";
import { ProductModel } from "../types/product.model";

interface Props {
  product: ProductModel;
}

const ProductFeatureList = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-x-14 gap-y-7">
      <ProductFeature icon={<FaStar />} name="امتیاز" value={product.rating} />
      {/* <ProductFeature icon={<FaShop />} name="برند" value={product.category || "Samsung"} /> */}
      <ProductFeature
        icon={<GoNumber />}
        name="موجودی"
        value={product.quantity}
      />
      <ProductFeature
        icon={<FaComment />}
        name="نظرات"
        value={product.numReviews}
      />
      <ProductFeature
        icon={<IoTime />}
        name="بروزرسانی"
        value={product.updatedAt}
      />
    </div>
  );
};

export default ProductFeatureList;
