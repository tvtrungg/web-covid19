const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Hospital = new Schema({
    _id     : Schema.Types.ObjectId,
    _wardid: { type: Schema.Types.ObjectId, ref: 'Ward' },
    address:  { type: String, maxlength: 225 },
    name: { type: String, maxlength: 225 },
    capacity: { type: Number },
    intake: { type: Number },   
});

module.exports = mongoose.model('hospital', Hospital);