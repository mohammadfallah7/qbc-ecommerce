import { RouteObject, useRoutes } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import Favorites from "../pages/Favorites";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import ShoppingProgress from "../pages/ShoppingProgress";
import User from "../pages/User";

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
];

const AppRouter = () => {
  const element = useRoutes(router);
  return element;
};

export default AppRouter;
