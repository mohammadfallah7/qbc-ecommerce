import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import Favorites from "../pages/Favorites";
import ProductPage from "../pages/ProductPage";
import AddComment from "../pages/AddComment";
import ProductComments from "../pages/ProductComments";
import RelatedProducts from "../pages/RelatedProducts";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
        children: [
          { path: "add-comment", element: <AddComment /> },
          { path: "comments", element: <ProductComments /> },
          { path: "related-products", element: <RelatedProducts /> },
        ],
      },
      { path: ":section/checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <h1>Profile</h1> },
    ],
  },
]);

export default router;
