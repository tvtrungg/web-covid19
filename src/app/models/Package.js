const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Package = new Schema({
    id: { type: Number, index: true },
    name: { type: String, maxlength: 225 },
    image: { type: String, maxlength: 225 },
    limit:  { type: Number, index: true },
    time: { type: String, maxlength: 10 },
    amount: { type: Number, index: true },
    price:  { type: String, maxlength: 225 },
    package: [{
        _itemid: { type: Schema.Types.ObjectId, ref: 'shopdb' },
        amount: { type: Number},
        amountMax: { type: Number},

    }],
},
    {
        timestamps: true
    });

module.exports = mongoose.model('package', Package);