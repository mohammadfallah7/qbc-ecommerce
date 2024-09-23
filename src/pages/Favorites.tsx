import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import useProducts from "../stores/products-store";
import ProductCard from "../components/ProductCard";
import Warning from "../components/Warning";

const Favorites = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const products = useProducts((state) => state.products);
  const favoriteProducts = products.filter((product) => product.isFavorite);

  useEffect(() => {
    changeNavItem("favorites");
  });

  if (favoriteProducts.length) {
    return (
      <div className="gap-5 grid grid-cols-4">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="m-14">
        <Warning title="محصول مورد علاقه ای وجود ندارد." />
      </div>
    );
  }
};

export default Favorites;
