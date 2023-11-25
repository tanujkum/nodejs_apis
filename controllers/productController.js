

const { product } = require("../models/ProductModel");
const addNewProduct=async (req, res) => {
    try {
      const {productName,productDescription,productValue} = req.body;
       
      if(!productName || !productDescription || !productValue){
          return res.status(200).json({status:true,message:"Please fill all fields"})
      } 

      const newProduct= new product({productName,productDescription,productValue})
      await newProduct.save();
      return res.status(200).json({success:true,message:"Product Added Successfully",newProduct})
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error });
    }
  }
const getAllProducts=async (req, res) => {
    try {
    
        const getProducts = await product.find();
        if(getProducts){
            return res.status(200).json({success:true,message:"Products found",data:getProducts})
        }else{
            return res.status(404).json({success:true,message:"Products not found"})
        }
     
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error });
    }
  }
const getProductById=async (req, res) => {
    try {
      const {id} = req.params;
       
     if(id){
        const getProduct = await product.findById(id)
        if(getProduct){
            return res.status(200).json({success:true,message:"Product found",data:getProduct})
        }else{
            return res.status(404).json({success:true,message:"Product not found"})
        }
     }else{
        return res.status(404).json({success:true,message:"Product not found"})
     }
     
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error });
    }
  }
const updateProduct=async (req, res) => {
    try {
      const {id} = req.params;
      const {productName,productDescription,productValue} = req.body;
     if(id){
        const getProduct = await product.findById(id)
        if(getProduct){
            getProduct.productName = productName || getProduct.productName;
            getProduct.productDescription = productDescription || getProduct.productDescription;
            getProduct.productValue = productValue || getProduct.productValue;
            await getProduct.save();
            return res.status(200).json({success:true,message:"Product updated",data:getProduct})
        }else{
            return res.status(404).json({success:true,message:"Product not found"})
        }
     }else{
        return res.status(404).json({success:true,message:"Product not found"})
     }
     
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error });
    }
  }
const deleteProduct=async (req, res) => {
    try {
      const {id} = req.params;
       
     if(id){

        const deletedProduct = await product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }else{
            return res.status(200).json({ message: 'Product deleted successfully' });
        }

     }else{
        return res.status(404).json({success:true,message:"Product not found"})
     }
     
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error });
    }
  }

module.exports = {addNewProduct,getAllProducts,getProductById,updateProduct,deleteProduct}