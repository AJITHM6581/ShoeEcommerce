const express = require('express');
const router = express.Router();
const {Cart} = require('../Model/cart'); // Replace with your Cart model path
const {Product} = require('../Model/Product');
const validateToken =require("../Middleware/ValidationToken")
// Add an item to cart
router.post('/addCart',validateToken,async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  // Validate request body, check product existence, and ensure valid quantity

  // Create and save cart item
  const cartItem = new Cart({ userId, productId, quantity });
  try {
    await cartItem.save();
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
});router.get('/viewCart/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const productCart = await Cart.findOne({ productId });

    if (!productCart) { 
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ productCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
module.exports = router;