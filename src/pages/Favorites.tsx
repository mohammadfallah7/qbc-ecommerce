import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Warning from "../components/Warning";
import useFavoriteProducts from "../stores/favoriteProduct-store";

const Favorites = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const products = useFavoriteProducts((state) => state.products);

  useEffect(() => {
    changeNavItem("favorites");
  }, [changeNavItem]);

  return products.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
      {products
        .filter((product) => product.isFavorite)
        .map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  ) : (
    <div>
      <Warning title="محصول مورد علاقه ای وجود ندارد." />
    </div>
  );
};

export default Favorites;
