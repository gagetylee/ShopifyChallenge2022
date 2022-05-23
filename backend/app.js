const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorMiddleware');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/product', require('./routes/productRoute'));

// Error handler
app.use(errorHandler);

mongoose
  .connect('mongodb://localhost:27017', {
    dbName: 'inventoryManager-gagetylee',
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  });

const PORT = 8000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
