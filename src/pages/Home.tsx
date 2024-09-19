import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import useProducts from "../stores/products-store";
import useNavItem from "../stores/nav-item-store";
import ProductSlider from "../components/ProductSlider";

const Home = () => {
  const products = useProducts((state) => state.products);
  const changeNavItem = useNavItem((state) => state.changeNavItem);

  useEffect(() => {
    changeNavItem("home");
  });

  return (
    <div className="grid grid-cols-2 grid-rows-subgrid gap-14 items-center">
      <div className="col-span-2 md:col-span-1 grid md:grid-cols-2 md:grid-rows-2 gap-7">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="col-span-2 md:col-span-1">
        <ProductSlider />
      </div>
      <div className="col-span-2">
        <SpecialProducts products={products} />
      </div>
    </div>
  );
};

export default Home;
