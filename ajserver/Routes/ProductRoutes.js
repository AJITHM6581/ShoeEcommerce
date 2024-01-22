const express = require('express');
const router = express.Router();
const { Product } = require('../Model/Product');
const { resolvePath } = require('react-router-dom');
const { route } = require('./UserRegistrationRoutes');
const createOrder = require('../Controllers/Order')


// Adding new product
router.post('/addproduct', async (req, res) => {

  const { id, ProductName, categoryId, description, price, isAvaliable, productImage, rating, review, vendorName, warranty } = req.body;

  try {
    
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ Error: 'Product with this ID already exists' });
    }

    const product = new Product({ id, ProductName, categoryId, description, price, isAvaliable, productImage, rating, review, vendorName, warranty });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});

// Edit product
router.put('/editproduct/:productId', async (req, res) => {
  const productId = req.params.productId;
  const updatedProductData = req.body;

  try {
    const product = await Product.findOne({id:productId});
    console.log("prp",product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields
    Object.assign(product, updatedProductData);

    // Save the updated product
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// View all products
router.get('/viewproduct', async (req, res) => {
  try {
    const viewproduct = await Product.find();
    if (viewproduct) {
      res.setHeader('Content-Type','application/json');
      res.status(200).json({
        message: 'The Products',
        product: viewproduct,
      });
    } else {
      res.status(400).json({
        message: 'Error in fetching products',
      });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// View a specific product
router.get('/viewProduct/:ProductId', async (req, res) => {
  const ProductId = req.params.ProductId
  console.log(req);
  console.log(ProductId);

  try {
    const product = await Product.findOne({ id:ProductId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
    console.log("Product",Product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});
router.delete('/delete-product/:ProductId',async(req,res)=>{
  const ProductId=req.params.ProductId;
  try{
    const deleteProduct=await Product.findOneAndDelete({id:ProductId})
    if(!deleteProduct){
      return res.status(404).json({message:'product not found'})
    }
    res.status(200).json({message:'product deleted successfully'})
  }catch(error){
   console.error(error);
   res.status(500).json({message:'server error',error})
  }
})
router.post('/orders', createOrder.createOrder);


module.exports = router;
