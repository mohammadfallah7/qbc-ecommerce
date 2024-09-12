interface Props {
  icon: JSX.Element;
  name: string;
  value: string;
}

const ProductFeature = ({ name, value, icon }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {name} : {value}
    </div>
  );
};

export default ProductFeature;
