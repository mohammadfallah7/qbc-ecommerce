import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="mr-14 px-7 py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
