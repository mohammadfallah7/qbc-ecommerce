import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductEntity } from "../types/product-entity";

interface Props {
  products: ProductEntity[];
}

const SpecialProducts = ({ products }: Props) => {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-xl">محصولات ویژه</h3>
        <Link to="/shop">
          <button className="btn btn-active btn-secondary btn-sm rounded-full">
            فروشگاه
          </button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SpecialProducts;