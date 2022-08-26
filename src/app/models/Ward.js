const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ward = new Schema({
    _id     : Schema.Types.ObjectId,
    _distid: { type: Schema.Types.ObjectId, ref: 'District' },
    name: { type: String, maxlength: 225 }
    
});

module.exports = mongoose.model('ward', Ward);