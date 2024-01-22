const {orders}=require('../Model/orders')

const createOrder =async (req,res)=>{
  try{
    const{
      orderId,
      userId,
      products, // Assuming an array of products in the order
      firstName,
      lastName,
      companyName,
      address,
      email,
      phone,
      additionalInfo,
      totalPrice
    
    } = req.body;
    const newOrder = new orders({
      orderId,
      userId,
      products,
      firstName,
      lastName,
      companyName,
      address,
      email,
      phone,
      additionalInfo,
      totalPrice,
      orderDate: new Date(), // You might want to timestamp the order
    });

    // Save the order to the database
    await newOrder.save();

    res.status(200).json({ success: true, order: newOrder,message:"order saved successfully" });
  }catch(error){
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
module.exports = { createOrder};
  