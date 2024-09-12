import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import Favorites from "../pages/Favorites";
import ProductPage from "../pages/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "shop", element: <Shop /> },
      { path: "favorites", element: <Favorites /> },
      {
        path: ":section/products/:id",
        element: <ProductPage />,
      },
    ],
  },
]);

export default router;
