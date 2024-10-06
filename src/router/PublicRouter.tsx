import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import ProductPage from "../pages/ProductPage";

const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <Home />
      </PageLayout>
    ),
  },
  {
    path: "/shop",
    element: (
      <PageLayout>
        <Shop />
      </PageLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <PageLayout>
        <Cart />
      </PageLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <PageLayout isCenter={true}>
        <Login />
      </PageLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <PageLayout isCenter={true}>
        <Register />
      </PageLayout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <PageLayout>
        <ProductPage />
      </PageLayout>
    ),
  },
]);

export default publicRouter;
