import { OrderItem } from "../types/order-item.model";
import { ProductModel } from "../types/product.model";

interface Props {
  products: (ProductModel | OrderItem)[] | undefined;
}

const CartProductsTable = ({ products }: Props) => {
  const isOrderItem = (
    product: ProductModel | OrderItem
  ): product is OrderItem => {
    return (product as OrderItem).qty !== undefined;
  };
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
              {isOrderItem(cartProduct) ? (
                <div className="bg-base-300 w-16 h-16 rounded-md"></div>
              ) : (
                <img
                  src={(cartProduct as ProductModel).image}
                  alt={cartProduct.name}
                  className="w-16 h-16 rounded-md"
                />
              )}
            </th>
            <td>{cartProduct.name}</td>
            <td>{isOrderItem(cartProduct) ? cartProduct.qty : 1}</td>
            <td>{cartProduct.price.toLocaleString()}</td>
            <td>
              {isOrderItem(cartProduct)
                ? (cartProduct.price * cartProduct.qty).toLocaleString()
                : cartProduct.price.toLocaleString()}{" "}
              تومان
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartProductsTable;
