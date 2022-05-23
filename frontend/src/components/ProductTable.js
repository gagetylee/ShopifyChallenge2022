import ProductRow from './ProductRow';
import { useState, useEffect } from 'react';

const ProductTable = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Stock</th>
          <th scope="col">SKU</th>
          {props.isDeleted && <th>Deletion comment</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.sku}
            product={product}
            isDeleted={props.isDeleted}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
