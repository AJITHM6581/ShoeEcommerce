const mongoose= require('mongoose')
const orders=mongoose.model('orders',{
orderId:String,
userId:String,
products:[
  {
   productId:String,
   quanity:Number,
   totalPrice:Number,
  }
],
firstName: String,
  lastName: String,
  companyName: String,
  address: String,
  email: String,
  phone: String,
  additionalInfo: String,
  totalPrice:Number,

  orderDate: {
    type: Date,
    default: Date.now,
  },
})
module.exports = {orders};