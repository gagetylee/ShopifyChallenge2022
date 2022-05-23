const axios = require('axios');

const API_URL = 'http://localhost:8000/api/product';

const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const editProduct = async (productData) => {
  const response = await axios
    .put(API_URL + `/${productData.sku}`, productData)
    .catch((error) => {
      alert(error.response.data.message);
      // window.location.reload();
    });
};

const deleteProduct = async (productSKU) => {
  const response = await axios.delete(API_URL + `/${productSKU}`);
};

const productService = {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
};

export default productService;
