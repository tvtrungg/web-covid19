const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Product = new Schema({
    id: { type: Number, index: true },
    type: { type: String, maxlength: 225 },
    name: { type: String, maxlength: 225 },
    image: { type: String, maxlength: 225 },
    image1: { type: String, maxlength: 225 },
    image2: { type: String, maxlength: 225 },
    upto:  { type: Number, index: true },
    amount: { type: Number, index: true },
    price:  { type: String, maxlength: 225 },
    
},
    {
        timestamps: true
    });

module.exports = mongoose.model('shopdb', Product);