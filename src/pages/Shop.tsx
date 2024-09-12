import { useLocation } from "react-router-dom";
import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";

const Shop = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const { pathname } = useLocation();

  useEffect(() => {
    changeNavItem(pathname.substring(1));
  });

  return <div>Shop</div>;
};

export default Shop;
