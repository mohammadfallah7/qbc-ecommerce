import {
  LuUserPlus,
  LuLogIn,
  LuHome,
  LuShoppingCart,
  LuShoppingBag,
  LuHeart,
  LuMoon,
  LuSun,
} from "react-icons/lu";
import { navIconSize } from "../utils/constants";
import { Link } from "react-router-dom";
import useNavItem from "../stores/nav-item-store";
import useTheme from "../stores/theme-store";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import useCart from "../stores/cart-store";

const NavBar = () => {
  const { navItem, changeNavItem } = useNavItem();
  const { theme, changeTheme } = useTheme();
  const cartProductsLength = useCart((state) => state.cartProducts.length);
  useEffect(() => {
    themeChange(false);
    document.querySelector("html")?.setAttribute("data-set-theme", theme);
  }, [theme]);

  const handleChangeTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <aside className="w-14 py-3 fixed top-0 bottom-0 right-0 text-center flex flex-col justify-between items-center">
      <div className="flex flex-col gap-10">
        <Link to="/home">
          <LuHome
            size={navIconSize}
            className={`${navItem === "home" && "text-secondary"}`}
            onClick={() => changeNavItem("home")}
          />
        </Link>
        <Link to="/shop">
          <LuShoppingBag
            size={navIconSize}
            className={`${navItem === "shop" && "text-secondary"}`}
            onClick={() => changeNavItem("shop")}
          />
        </Link>
        <Link className="indicator" to="/cart">
          <span className="indicator-item indicator-start badge badge-secondary text-xs badge-sm">
            {cartProductsLength}
          </span>
          <LuShoppingCart
            size={navIconSize}
            className={`${navItem === "cart" && "text-secondary"}`}
            onClick={() => changeNavItem("cart")}
          />
        </Link>
        <Link to="/favorites">
          <LuHeart
            size={navIconSize}
            className={`${navItem === "favorites" && "text-secondary"}`}
            onClick={() => changeNavItem("favorites")}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-7">
        {theme === "light" ? (
          <LuMoon
            size={navIconSize}
            onClick={handleChangeTheme}
            className="cursor-pointer"
          />
        ) : (
          <LuSun
            size={navIconSize}
            onClick={handleChangeTheme}
            className="cursor-pointer"
          />
        )}

        <LuLogIn size={navIconSize} />
        <LuUserPlus size={navIconSize} />
      </div>
    </aside>
  );
};

export default NavBar;
