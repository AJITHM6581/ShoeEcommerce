
import './user/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react'
import Login from './Login';
import Home from './user/Home';
import Allcategories from './user/Allcategories';
import Cart from './Cart';
import Sign from './Sign';
import Addproduct from './seller/Addproduct';
import Seller from './seller/Seller';
import Edit from './seller/Edit';
import View from './seller/View';
import Header from '../src/Header'
import Footer from '../src/Footer'
import ViewProduct from './user/ViewProduct';
import Payment from './payment/Payment';







function App() {
  return (
  
    <div>
 
 <BrowserRouter>
      <Header /> {/* Header outside of Routes to display on all pages */}
      <Routes>
        <Route path="" element={<Home />} /> {/* Default route for homepage */}
        <Route path="/Login" element={<Login />} />
        <Route path="/all-categories" element={<Allcategories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/seller/edit/:productId" element={<Edit />} />
        <Route path="/seller/view/:productId" element={<View />} />
        <Route path="/viewProduct/:productId" element={<ViewProduct />} />
        <Route path="/payment" element={<Payment/>} />
         
        
      </Routes>
      
      <Footer /> {/* Footer outside of Routes to display on all pages */}
    </BrowserRouter>
    </div>
    
  )
}

export default App
