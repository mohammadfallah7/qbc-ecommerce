import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import useNavItem from "../stores/nav-item-store";
import ProductSlider from "../components/ProductSlider";
import useProducts from "../hooks/useProducts";
import Loading from "../components/Loading";

const Home = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const { data: products, isLoading } = useProducts();

  useEffect(() => {
    changeNavItem("home");
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-2 grid-rows-subgrid gap-14 items-center">
      <div className="col-span-2 md:col-span-1 grid md:grid-cols-2 md:grid-rows-2 gap-7">
        {products?.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
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
