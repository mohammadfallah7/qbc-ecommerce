import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import useProducts from "../stores/products-store";
import ProductCard from "../components/ProductCard";
import Warning from "../components/Warning";

const Favorites = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const products = useProducts((state) => state.products);

  useEffect(() => {
    changeNavItem("favorites");
  });

  return products.filter((product) => product.isFavorite).length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
      {products
        .filter((product) => product.isFavorite)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  ) : (
    <div className="mt-5">
      <Warning title="محصول مورد علاقه ای وجود ندارد." />
    </div>
  );
};

export default Favorites;
