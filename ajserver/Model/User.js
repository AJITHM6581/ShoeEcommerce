const mongoose=require('mongoose')

const User=mongoose.model('user',{
  id:'string',
  googleId:'string',
  email:'string',
  hashedPassword:'string',
  userType:'string',
  dob:'string',
  age:'string',
  firstname:'string',
  lastname:'string',

})
module.exports =  {User}
