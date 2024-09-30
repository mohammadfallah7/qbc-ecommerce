import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const RelatedProducts = () => {
  const { data: products } = useProducts();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
