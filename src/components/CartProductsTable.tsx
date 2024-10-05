import { OrderItem } from "../types/order-item.model";

interface Props {
  products: OrderItem[] | undefined;
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
        {products?.map((cartProduct) => (
          <tr key={cartProduct._id}>
            <th>
              <div className="bg-base-300 w-16 h-16 rounded-md">
                {/* Image */}
              </div>
            </th>
            <td>{cartProduct.name}</td>
            <td>{cartProduct.qty}</td>
            <td>{cartProduct.price.toLocaleString()}</td>
            <td>{(cartProduct.price * cartProduct.qty).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartProductsTable;
