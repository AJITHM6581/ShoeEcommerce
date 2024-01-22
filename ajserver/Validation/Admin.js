const {check,validationResult}=require('express-validator')

const productValidationRule=()=>{
  return[
    check('id')
    .notEmpty()
    .withMessage('ID cannot be empty')
    .isString()
    .trim(),
   

  check('productName')
    .notEmpty()
    .withMessage('Product name cannot be empty')
    .isString()
    .withMessage('Product name must be a string')
    .trim(),

  check('categoryId')
    .notEmpty()
    .withMessage('Category ID cannot be empty')
    .isString()
    .withMessage('Category ID must be a string')
    .trim(),

  check('description')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isString()
    .withMessage('Description must be a string')
    .trim(),

  check('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isNumeric()
    .withMessage('Price must be a number'),

  check('isAvailable')
    .notEmpty()
    .withMessage('Availability cannot be empty')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

    check('productImage')
    .notEmpty()
    .withMessage('Product image URL cannot be empty')
    .isString()
    .withMessage('Invalid URL for product image')
    .trim(),
  
    check('rating')
    .notEmpty()
    .withMessage('rating cannot be empty')
    .isNumeric()
    .withMessage('rating must be a number'),
    

    check('review')
    .notEmpty()
    .withMessage('Review cannot be empty')
    .isString()
    .withMessage('Review must be '),
    

    check('vendorName')
    .notEmpty()
    .withMessage('Vendor name cannot be empty')
    .isString()
    .withMessage('Vendor name must be a string')
    .trim(),

  check('warranty')
    .notEmpty()
    .withMessage('Warranty cannot be empty')
    .isString()
    .withMessage('Warranty must be a string')
    .trim(),
];
};
  const validate=(req,res,next)=>{
    const error= validationResult(req)
    if(error.isEmpty()){
      return next()
    }
    const ExtractedErrors =[]
    error.array().map((err)=>ExtractedErrors.push({[err.param]:err.msg}))
    return res.status(422).json({
      error:ExtractedErrors,
    })

  }
  module.exports={
    productValidationRule,
    validate,
  }
