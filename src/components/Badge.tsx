interface Props {
  price: number;
  alignment?: "start" | "center" | "end";
}

const Badge = ({ price, alignment = "center" }: Props) => {
  return (
    <div className={`badge badge-secondary text-xs self-${alignment}`}>
      {price.toLocaleString()} تومان
    </div>
  );
};

export default Badge;
