import uuid from 'react-uuid';
import {React,useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import './Add.css'


function AddProduct() 
{
  const [id, setId] = useState(0)
  const [ProductName, setProductName] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [isAvailable, SetIsAvailable] = useState('value={productData.isAvailable}')
  const [productImage, setProductImage] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState(0)
  const [vendorName, setVendorName] = useState("")
  const [warranty, setWarranty] = useState("")

  useEffect(() => {
    setId(uuid().slice(0, 3))
  }, [])
  let location = useNavigate()

  const isAvailableBoolean = isAvailable.trim() === 'true' ? true : false;


  const addProduct = async (p) => { p.preventDefault();
    if (!ProductName || !categoryId || !description || !price || !isAvailable || !productImage || !rating || !review || !vendorName || !warranty) {
      alert('Please fill in all fields.');
      return;
    }
    else{
      try {
        setId(uuid().slice(0, 3));
    
        const body = {
          id,
          ProductName,
          categoryId,
          description,
          price,
          isAvailable: isAvailableBoolean,
          productImage,
          rating,
          review,
          vendorName,
          warranty
        };
    
  //       const result = await axios.post("http://localhost:5000/api/admin/Product/addProduct", body);
  //       alert(result.data.message);
  //       location('/seller');
  //     } catch (error) {
  //       console.error('Error adding product:', error.response?.data?.error);
  //       alert('Error adding product. Please check the form and try again.');
  //     }
  //   }
  // } 
    
    const result = await axios.post("http://localhost:5000/api/seller/addproduct", body);
    console.log("addresult",result);
    alert(result.data.message);
    location('/seller') // Corrected line for redirection
} catch (error) {
    console.error('Error adding product:', error.response?.data?.error);
    alert('Error adding product. Please check the form and try again.');
}
}
}   
  return(
    <div>   
  
      <Container className="form-container mt-5">
        <h4 className='mb-5'>Add Product</h4>
<Form>
<Row>
  <Col md={6}>
    <Form.Group className="mb-3" controlId="productName">
      <Form.Label>Product name</Form.Label>
      <Form.Control onChange={(e) => setProductName(e.target.value)} type="text" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="category">
      <Form.Label>Category Id</Form.Label>
      <Form.Control onChange={(e) => setCategoryId(e.target.value)} type="text" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="price">
      <Form.Label>Price</Form.Label>
      <Form.Control onChange={(e) => setPrice(e.target.value)} type="number" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="isAvailable">
      <Form.Label>Is Available</Form.Label>
      <Form.Control as="select" onChange={(e) => SetIsAvailable(e.target.value)}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Form.Control>
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group className="mb-3" controlId="productImage">
      <Form.Label>Product Image</Form.Label>
      <Form.Control onChange={(e) => setProductImage(e.target.value)} type="text" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="rating">
      <Form.Label>Rating</Form.Label>
      <Form.Control onChange={(e) => setRating(e.target.value)} type="text" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="review">
      <Form.Label>Review</Form.Label>
      <Form.Control onChange={(e) => setReview(e.target.value)} type="text" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="vendorName">
      <Form.Label>Vendor Name</Form.Label>
      <Form.Control onChange={(e) => setVendorName(e.target.value)} type="text" placeholder="" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="warranty">
      <Form.Label>Warranty</Form.Label>
      <Form.Control onChange={(e) => setWarranty(e.target.value)} type="text" placeholder="" />
    </Form.Group>
  </Col>
</Row>

  
  <Row className="mt-3">
    <Col md={6}>
      <Button onClick={(e) => addProduct(e)} className="ms-5" variant="secondary">
        Add
      </Button>
    </Col>
    <Col md={6}>
      <Link to={'/seller'}>
        <Button className="ms-5" variant="secondary">
          Cancel
        </Button>
      </Link>
    </Col>
  </Row>
      </Form>
 
</Container>
    </div>


  )
}
export default AddProduct 