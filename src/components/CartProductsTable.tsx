import { ProductEntity } from "../types/product-entity";

interface Props {
  products: ProductEntity[];
}

const CartProductsTable = ({ products }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>عکس</th>
          <th>نام محصول</th>
          <th>تعداد</th>
          <th>قیمت</th>
          <th>قیمت نهایی</th>
        </tr>
      </thead>
      <tbody>
        {products.map((cartProduct) => (
          <tr key={cartProduct.id}>
            <th>
              <div className="bg-base-300 w-16 h-16 rounded-md"></div>
            </th>
            <td>{cartProduct.title}</td>
            <td>{cartProduct.count}</td>
            <td>{cartProduct.price.toLocaleString()}</td>
            <td>{cartProduct.price.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartProductsTable;
