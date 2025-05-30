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
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import useCart from "../stores/cart-store";
import useUser from "../stores/user-store";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";

const NavBar = () => {
  const { navItem, changeNavItem } = useNavItem();
  const { theme, changeTheme } = useTheme();
  const cartProductsLength = useCart((state) =>
    state.orderItems.reduce((acc, current) => (acc += current.qty!), 0)
  );
  const { logout, id, isAdmin } = useUser();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      apiClient.post("/users/logout").then(() => {
        logout();
      }),
  });

  useEffect(() => {
    return () => setShowMenu(false);
  }, [id]);

  useEffect(() => {
    themeChange(false);
    document.querySelector("html")?.setAttribute("data-set-theme", theme);
  }, [theme]);

  const handleChangeTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <aside className="w-14 py-3 fixed top-0 bottom-0 right-0 text-center flex flex-col justify-between items-center z-20">
      <div className="flex flex-col gap-10">
        <Link to="/">
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
      <div className="flex items-center flex-col gap-7">
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

        {id && (
          <>
            <ul
              className={`absolute right-2 bottom-10 menu w-40 bg-base-200 rounded-box ${
                showMenu ? "block" : "hidden"
              }`}
            >
              {isAdmin && (
                <li className="mb-3">
                  <Link to={"/dashboard"}>داشبورد</Link>
                </li>
              )}
              {isAdmin && (
                <li className="mb-3">
                  <Link to={"/create-product"}>محصول جدید</Link>
                </li>
              )}
              {isAdmin && (
                <li className="mb-3">
                  <Link to={"/user"}>مدیریت کاربران</Link>
                </li>
              )}
              {isAdmin && (
                <li className="mb-3">
                  <Link to={"/all-product"}>مدیریت محصولات</Link>
                </li>
              )}
              {isAdmin && (
                <li className="mb-3">
                  <Link to={"/order-admin"}>سفارشات</Link>
                </li>
              )}
              <li className="mb-3">
                <Link to={"/profile"}>پروفایل</Link>
              </li>
              <li onClick={() => mutate()}>
                <a>خروج از حساب</a>
              </li>
            </ul>
            <span
              className="text-sm flex items-center gap-1 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              {isAdmin ? "ادمین" : "کاربر"}
              {showMenu ? (
                <FaChevronUp size={10} />
              ) : (
                <FaChevronDown size={10} />
              )}
            </span>
          </>
        )}

        {!id && (
          <Link to={"/login"}>
            <LuLogIn
              size={navIconSize}
              className={`${navItem === "login" && "text-secondary"}`}
              onClick={() => changeNavItem("login")}
            />
          </Link>
        )}
        {!id && (
          <Link to={"/register"}>
            <LuUserPlus
              size={navIconSize}
              className={`${navItem === "register" && "text-secondary"}`}
              onClick={() => changeNavItem("register")}
            />
          </Link>
        )}
      </div>
    </aside>
  );
};

export default NavBar;
