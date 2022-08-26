module.exports = {
    mutipleMongoseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongoseToObject: function (mongooses) {
        return mongooses ? mongooses.toObject() : mongooses; 
    }
}