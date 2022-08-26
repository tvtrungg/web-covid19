const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const District = new Schema({
    _id     : Schema.Types.ObjectId,
    _cityid: { type: Schema.Types.ObjectId, ref: 'City' },
    name: { type: String, maxlength: 225 }
    
});

module.exports = mongoose.model('district', District);