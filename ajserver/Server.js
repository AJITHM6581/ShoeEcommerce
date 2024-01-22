const express=require('express')
const mongoose=require('mongoose')
const cors=require("cors")
const jwt=require('jsonwebtoken')
const cookieparser=require('cookie-parser')
const bodyparser=require('body-parser')

const userRegistrationRoutes=require('./Routes/UserRegistrationRoutes')
const LoginRoutes=require('./Routes/LoginRoutes')
const LogoutRoutes=require('./Routes/LogoutRoutes')
const ProductRoutes=require('./Routes/ProductRoutes')
const CartRoutes=require('./Routes/CartRoutes')
const RazorpayRoutes=require('./Routes/RazorpayRouter')




const app =express()
app.use(bodyparser.json())
app.use(cors())
app.use(cookieparser())

mongoose.connect("mongodb://localhost:27017/ajEcommerce",{useNewUrlparser:true,useUnifiedTopology:true})
.then(()=>{
  console.log(' CONNECTED TO MONGO');
})
.catch((Error)=>{
  console.log('ERROR CONNECTING TO MONGO');
})

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
app.use('/api/user/register',userRegistrationRoutes)
app.use('/api/user/login',LoginRoutes)
app.use('/api/seller',ProductRoutes)
app.use('/api/razorpay',RazorpayRoutes)

