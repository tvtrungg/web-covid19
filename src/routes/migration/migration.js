const express = require("express");
const authAdmin = require("../../app/middlewares/authAdmin.js");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const Migration = require("../../app/controllers/migration/Migration.js");

router.get("/migrate",authAdmin, Migration.migrateInit);

module.exports = router;
