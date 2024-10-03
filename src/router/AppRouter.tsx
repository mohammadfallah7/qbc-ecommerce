import { RouteObject, useRoutes } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import Favorites from "../pages/Favorites";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import ShoppingProgress from "../pages/ShoppingProgress";
import User from "../pages/User";
import CreateProduct from "../pages/CreateProduct";
import Order from "../pages/Order";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import OrderAdmin from "../pages/OrderAdmin";

const router: RouteObject[] = [
  {
    path: "/favorites",
    element: (
      <PageLayout>
        <Favorites />
      </PageLayout>
    ),
  },
  {
    path: ":section/shopping-progress",
    element: (
      <PageLayout>
        <ShoppingProgress />
      </PageLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <PageLayout>
        <Checkout />
      </PageLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <PageLayout isCenter={true}>
        <Profile />
      </PageLayout>
    ),
  },
  {
    path: "/user",
    element: (
      <PageLayout>
        <User />
      </PageLayout>
    ),
  },
  {
    path: "/create-product",
    element: (
      <PageLayout isCenter={true}>
        <CreateProduct />
      </PageLayout>
    ),
  },
  {
    path: "/order",
    element: (
      <PageLayout>
        <Order />
      </PageLayout>
    ),
  },
  {
    path: "/order-admin",
    element: (
      <PageLayout>
        <OrderAdmin />
      </PageLayout>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <PageLayout>
        <Details />
      </PageLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PageLayout>
        <Dashboard />
      </PageLayout>
    ),
  },
];

const AppRouter = () => {
  const element = useRoutes(router);
  return element;
};

export default AppRouter;
