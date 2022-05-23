import './App.css';
import React, { useState, useEffect } from 'react';
import productService from './services/products';
import ProductTable from './components/ProductTable';
import AddProduct from './components/AddProduct';
import Button from 'react-bootstrap/Button';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    productService.getProducts().then((myProducts) => {
      if (mounted) {
        setProducts(myProducts);
      }
    });
    return () => (mounted = false);
  }, []);

  const addProduct = async (product) => {
    const sku = Math.floor(Math.random() * 10000) + 1;
    const newProduct = { sku, ...product };
    await productService.createProduct(newProduct);
    setProducts([...products, newProduct]);
  };

  const onEdit = async (product) => {
    await productService.editProduct(product);
  };

  const onDelete = async (sku) => {
    await productService.deleteProduct(sku);
    setProducts(products.filter((product) => product.sku !== sku));
  };

  return (
    <div className="App">
      <header>
        <h1>Products</h1>
        <Button
          variant="primary"
          onClick={() => setShowAddProduct(!showAddProduct)}
        >
          {showAddProduct ? 'Close' : 'Add product'}
        </Button>
        <Button
          variant={showDeleted ? 'secondary' : 'danger'}
          onClick={() => setShowDeleted(!showDeleted)}
        >
          {!showDeleted ? 'Show Deleted' : 'Show Inventory'}
        </Button>
      </header>

      {showAddProduct && <AddProduct onAdd={addProduct} />}

      {!showDeleted ? (
        <ProductTable
          products={products.filter((product) => !product.isDeleted)}
          isDeleted={false}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <ProductTable
          products={products.filter((product) => product.isDeleted)}
          isDeleted={true}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default App;
