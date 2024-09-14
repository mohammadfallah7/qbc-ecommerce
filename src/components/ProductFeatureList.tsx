import { FaComment, FaShop, FaStar } from "react-icons/fa6";
import { ProductEntity } from "../types/product-entity";
import ProductFeature from "./ProductFeature";
import { GoNumber } from "react-icons/go";
import { IoTime } from "react-icons/io5";

interface Props {
  product: ProductEntity | undefined;
}

const ProductFeatureList = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-x-14 gap-y-7">
      <ProductFeature icon={<FaStar />} name="امتیاز" value={product?.rate} />
      <ProductFeature icon={<FaShop />} name="برند" value={product?.brand} />
      <ProductFeature
        icon={<GoNumber />}
        name="موجودی"
        value={product?.count}
      />
      <ProductFeature
        icon={<FaComment />}
        name="نظرات"
        value={product?.comments}
      />
      <ProductFeature
        icon={<IoTime />}
        name="بروزرسانی"
        value={product?.update.getFullYear()}
      />
    </div>
  );
};

export default ProductFeatureList;
