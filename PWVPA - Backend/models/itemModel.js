const mongoose = require('mongoose').default

const itemSchema = new mongoose.Schema({
    sellerID: {type: Number, required: true},
    productName: {type: String, required: true},
    productID: {type: Number, required: true},
    productPrice: {type: Number, required: true},
    productCategory: {type: String, required: true},
    productQuantity: {type: Number, required: true},
    productDescription: {type: String, required: true},
    productImage: {type: String, required: true},
})

const itemModel = mongoose.model("item", itemSchema)

module.exports = {itemModel}