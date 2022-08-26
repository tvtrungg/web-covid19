const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const City = new Schema({
    _id     : Schema.Types.ObjectId,
    name: { type: String, maxlength: 225 }
    
});

module.exports = mongoose.model('city', City);