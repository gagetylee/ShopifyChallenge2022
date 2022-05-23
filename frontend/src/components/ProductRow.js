import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

const ProductRow = (props) => {
  const [productEdit, setProductEdit] = useState(false);
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [deletionComment, setDeletionComment] = useState('');

  let product = props.product;
  let sku = product.sku;

  useEffect(() => {
    product = props.product;
    sku = product.sku;
    setName(product.name);
    setStock(product.stock);
    setDeletionComment(product.deletionComment);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    props.onEdit({ sku, name, stock });

    if (name.length !== 0 && stock >= 0) {
      setName(name);
      setStock(stock);
      setProductEdit(false);
    }
  };

  return (
    <tr>
      <td>
        {!productEdit ? (
          name
        ) : (
          <input
            style={{ wdith: 50 }}
            defaultValue={product.name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </td>

      <td>
        {!productEdit ? (
          stock
        ) : (
          <input
            style={{ width: 50 }}
            defaultValue={product.stock}
            onChange={(e) => setStock(e.target.value)}
          />
        )}
      </td>
      <td>{sku}</td>
      {props.isDeleted && <td>{deletionComment}</td>}
      <td>
        {productEdit ? (
          <Button
            variant="secondary"
            onClick={() => {
              setProductEdit(false);
              setName(product.name);
              setStock(product.stock);
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              setProductEdit(true);
            }}
          >
            Edit
          </Button>
        )}

        {productEdit ? (
          <Button variant="success" onClick={onSubmit}>
            Save
          </Button>
        ) : (
          <Button variant="danger" onClick={() => props.onDelete(sku)}>
            Delete
          </Button>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
