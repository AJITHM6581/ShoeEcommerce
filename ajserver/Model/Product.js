const mongoose=require('mongoose')


const Product= mongoose.model('Product',{
  id:'string',
  ProductName:'string',
  categoryId:'string',
  description:'string',
  price:'Number',
  isAvailable:"Boolean",
  productImage:"string",
  rating:'string',
  review:'string',
  vendorName:'string',
  warranty:'string',
})
module.exports={Product}