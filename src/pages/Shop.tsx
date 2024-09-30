import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import ShopProduct from "../components/ShopProduct";
import ShopFilter from "../components/ShopFilter";
import useProducts from "../hooks/useProducts";

const Shop = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const { data: products } = useProducts();

  useEffect(() => {
    changeNavItem("shop");
  });

  return (
    <div className="flex gap-7">
      <div className="hidden md:block w-1/5 h-fit bg-base-200 rounded-lg p-3">
        <ShopFilter />
      </div>
      <div className="w-full md:w-4/5 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {products?.map((product) => (
          <ShopProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
