const express = require("express");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const loginController = require("../../app/controllers/login/LoginController");

router.get("/", loginController.login);

module.exports = router;





