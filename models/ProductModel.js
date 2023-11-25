const mongoose = require("mongoose");

const productModel =  mongoose.Schema({
    productName:{
        type:String,
    },
    productDescription:{
        type:String
    },
    productValue:{
        type:String
    }
})

const product = new mongoose.model("product",productModel)

module.exports = {product}