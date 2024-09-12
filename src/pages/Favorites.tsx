import { useLocation } from "react-router-dom";
import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import useProducts from "../stores/products-store";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const products = useProducts((state) => state.products);
  const { pathname } = useLocation();

  useEffect(() => {
    changeNavItem(pathname.substring(1));
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
      {products
        .filter((product) => product.isFavorite)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default Favorites;
