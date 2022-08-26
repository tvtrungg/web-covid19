const express = require("express");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route
const newControllers = require("../../app/controllers/Home");


router.get("/", newControllers.index);

module.exports = router;
