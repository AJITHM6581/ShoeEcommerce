import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





function Seller() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/seller/viewproduct');
      setAllProducts(result.data.product);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/seller/delete-product/${productId}`);
      // After successfully deleting, you may want to refetch the updated product list
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);



  const filteredProducts = allProducts.filter((product) => {
    const productName = product && product.ProductName ? product.ProductName.toLowerCase() : '';
    const lowercasedSearchTerm = (searchTerm || '').toLowerCase();
  
    console.log('productName:', productName);
    console.log('lowercasedSearchTerm:', lowercasedSearchTerm);
  
    return productName.includes(lowercasedSearchTerm);
  });
console.log(allProducts);
  return (

    <div>

      <div className='container w-75'>

        <div className='text-end mt-4 me-4'>
          <Link to={'/addProduct'}>
            <button className="btn btn-outline-dark me-5">
              Add Products
            </button>
          </Link>
        </div><h1>Products</h1>

        <div className="container mt-4">
          <input
            type="text"
            placeholder="Search Product Name"
            className="form-control mb-3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Product name</th>
                <th>Category Id</th>

                <th>Price</th>

                <th>Rating</th>
                <th>Review</th>
                <th>Vendor Name</th>
                <th>Warranty</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.ProductName}</td>
                  <td>{item.categoryId}</td>

                  <td>{item.price}/-</td>

                  <td>{item.rating}</td>
                  <td>{item.review}</td>
                  <td>{item.vendorName}</td>
                  <td>{item.warranty}</td>
                  <td>
                    <Link to={`/seller/edit/${item.id}`}>
                      <button className='btn btn-outline-sm-dark me-2'>
                        Edit
                      </button>
                    </Link>
                    <Link to={`/seller/view/${item.id}`}>
                      <button className='btn btn-outline-sm-dark me-2'>
                        View
                      </button>
                    </Link>
                    <button
                      className='btn btn-outline-sm-dark me-2'
                      onClick={() => deleteProduct(item.id)}
                      
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
}

export default Seller;