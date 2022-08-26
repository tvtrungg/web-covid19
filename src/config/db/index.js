const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/project_shop_dev");
        mongoose.set('debug', true);
        console.log("Kết nối thành công với amongosDB!")
    } catch {
        console.log("Big oof")
    }

}

module.exports = { connect }
// mongodb+srv://man:123@cluster0.klbaw.mongodb.net/CovidSystem
//mongodb://localhost:27017/project_shop_dev
