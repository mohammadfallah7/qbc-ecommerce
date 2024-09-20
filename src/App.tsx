import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRouter from "./router/PublicRouter";
import PrivateRouter from "./components/PrivateRouter";
import AppRouter from "./router/AppRouter";
import useUser from "./stores/user-store";

const App = () => {
  const user = useUser((state) => state.user);

  const router = createBrowserRouter([
    ...publicRouter.routes,
    {
      path: "/*",
      element: (
        <PrivateRouter
          element={<AppRouter />}
          isAuthenticated={user ? true : false}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
