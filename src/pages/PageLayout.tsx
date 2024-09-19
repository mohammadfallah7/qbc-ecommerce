import { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface Props {
  children: ReactNode;
  isCenter?: boolean;
}

const PageLayout = ({ children, isCenter = false }: Props) => {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <div
        className={`${
          isCenter && "flex justify-center items-center min-h-screen"
        } mr-14 px-7 py-3`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
