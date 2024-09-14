interface Props {
  icon: JSX.Element;
  name: string;
  value: string | number;
}

const ProductFeature = ({ name, value, icon }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs">
        {name} : {value}
      </span>
    </div>
  );
};

export default ProductFeature;
