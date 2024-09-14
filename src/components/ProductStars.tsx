import { BsStar, BsStarFill } from "react-icons/bs";

interface Props {
  rate: number;
}

const ProductStars = ({ rate }: Props) => {
  const fillStar = [];
  for (let i = 0; i < rate; i++) {
    fillStar.push(i);
  }

  const emptyStar = [];
  for (let i = 0; i < 5 - rate; i++) {
    emptyStar.push(i);
  }

  return (
    <div className="flex gap-1">
      {fillStar.map(() => (
        <BsStarFill />
      ))}
      {emptyStar.map(() => (
        <BsStar />
      ))}
    </div>
  );
};

export default ProductStars;
