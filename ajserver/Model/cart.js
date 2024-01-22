const mongoose=require('mongoose')

const cart=mongoose.model('cart',{
  id:'string',
  userid:'string',
  productid:'string',
  quantity:'Number',
  addedDate:'Date',

})
module.exports={cart}