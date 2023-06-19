const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/project_shop_dev", {
            useNewUrlParser: true,
        });
        mongoose.set('debug', true);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

module.exports = { connect };

// mongodb+srv://man:123@cluster0.klbaw.mongodb.net/CovidSystem
//mongodb://localhost:27017/project_shop_dev
