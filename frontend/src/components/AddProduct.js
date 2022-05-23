import { useState } from 'react';
import Button from 'react-bootstrap/Button';
const AddProduct = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ name, stock });

    setName('');
    setStock(0);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Add Product"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          className="form-control"
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <Button type="submit" variant="success">
        Submit
      </Button>
    </form>
  );
};

export default AddProduct;
