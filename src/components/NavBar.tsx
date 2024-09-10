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

const NavBar = () => {
  const { navItem, changeNavItem } = useNavItem();
  const { theme, changeTheme } = useTheme();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme)
      document.querySelector("html")?.setAttribute("data-theme", savedTheme);
  }, []);

  const handleChangeTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <aside className="w-14 py-3 fixed top-0 bottom-0 right-0 text-center flex flex-col justify-between items-center">
      <div className="flex flex-col gap-10">
        <Link to="/home">
          <LuHome
            size={navIconSize}
            className={`${navItem === "home" && "text-primary"}`}
            onClick={() => changeNavItem("home")}
          />
        </Link>
        <Link to="/shop">
          <LuShoppingBag
            size={navIconSize}
            className={`${navItem === "shop" && "text-primary"}`}
            onClick={() => changeNavItem("shop")}
          />
        </Link>
        <Link to="/cart">
          <LuShoppingCart
            size={navIconSize}
            className={`${navItem === "cart" && "text-primary"}`}
            onClick={() => changeNavItem("cart")}
          />
        </Link>
        <Link to="/favorites">
          <LuHeart
            size={navIconSize}
            className={`${navItem === "favorites" && "text-primary"}`}
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
