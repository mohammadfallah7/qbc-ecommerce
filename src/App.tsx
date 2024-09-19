import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRouter from "./router/PublicRouter";
import PrivateRouter from "./components/PrivateRouter";
import AppRouter from "./router/AppRouter";

const router = createBrowserRouter([
  ...publicRouter.routes,
  {
    path: "/*",
    element: <PrivateRouter element={<AppRouter />} isAuthenticated={true} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
