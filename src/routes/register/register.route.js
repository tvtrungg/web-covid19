const express = require("express");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const registerController = require("../../app/controllers/register/RegisterController");


router.use("/register", registerController.register);

module.exports = router;
