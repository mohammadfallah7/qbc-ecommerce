interface Props {
  price: number;
}

const PriceBadge = ({ price }: Props) => {
  return (
    <div className="badge badge-secondary text-xs">
      {price.toLocaleString()} تومان
    </div>
  );
};

export default PriceBadge;
