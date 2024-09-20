import ProductCard from "../components/ProductCard";
import useProducts from "../stores/products-store";

const RelatedProducts = () => {
  const products = useProducts((state) => state.products);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
