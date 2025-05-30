import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRouter from "./router/PublicRouter";
import PrivateRouter from "./components/PrivateRouter";
import AppRouter from "./router/AppRouter";
import useUser from "./stores/user-store";
import { useEffect } from "react";

const App = () => {
  const { initializeAuth, id } = useUser();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const router = createBrowserRouter([
    ...publicRouter.routes,
    {
      path: "/*",
      element: <PrivateRouter element={<AppRouter />} isAuthenticated={!!id} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
