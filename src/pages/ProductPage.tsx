import { useParams } from "react-router-dom";
import useProducts from "../stores/products-store";

const ProductPage = () => {
  const { id } = useParams();
  const products = useProducts((state) => state.products);

  const product = products.find(
    (product) => product.id === parseInt(id || "1")
  );

  return <div>Product {product?.title}</div>;
};

export default ProductPage;
