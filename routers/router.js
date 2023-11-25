const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { userSignup, userLogin } = require("../controllers/userController");
const { addNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 100 requests per windowMs
  });

router.post('/signup',apiLimiter,userSignup)
router.post('/login',apiLimiter,userLogin)

router.post("/addnewproduct",apiLimiter, auth, addNewProduct);
router.get("/getallproducts",apiLimiter, auth, getAllProducts);
router.get("/getproduct/:id",apiLimiter, auth, getProductById);
router.put("/product/:id",apiLimiter, auth, updateProduct);
router.delete("/deleteproduct/:id",apiLimiter, auth, deleteProduct);

module.exports={router}


