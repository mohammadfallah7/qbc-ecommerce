import { PropsWithChildren } from "react";

interface IStatusBadgeProps extends PropsWithChildren {
  color: "success" | "error";
}

const StatusBadge: React.FC<IStatusBadgeProps> = ({ color, children }) => {
  return <div className={`badge badge-${color} text-white`}>{children}</div>;
};

export default StatusBadge;
