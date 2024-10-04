import useNavItem from "../stores/nav-item-store";
import { useEffect, useState } from "react";
import ShopProduct from "../components/ShopProduct";
import ShopFilter, { ShopFilterForm } from "../components/ShopFilter";
import useFilteredProducts from "../hooks/useFilteredProducts";
import useNewProducts from "../hooks/useNewProducts";

const Shop = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const { data: products } = useNewProducts();
  const { data: filteredProducts, mutate } = useFilteredProducts();
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    changeNavItem("shop");
  });

  const handleFilter = (data: ShopFilterForm) => {
    setStatus(true);
    mutate(data);
  };

  return (
    <div className="flex gap-7 items-start">
      <div className="hidden md:block w-1/5 h-fit bg-base-200 rounded-lg p-3">
        <ShopFilter setStatus={setStatus} onFilter={handleFilter} />
      </div>
      <div className="w-full md:w-4/5 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {status
          ? filteredProducts?.map((product) => (
              <ShopProduct key={product._id} product={product} />
            ))
          : products?.map((product) => (
              <ShopProduct key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Shop;
