const express = require("express");
const authAdmin = require("../../app/middlewares/authAdmin.js");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const adminControllers = require("../../app/controllers/admin/AdminControllers.js");

router.post("/addManager", adminControllers.addManager);

router.post("/editUser", adminControllers.editUser);

router.post("/editHospital", adminControllers.editHospital);

router.post("/addHospital", adminControllers.addHospital);


router.get("/:slug", authAdmin, adminControllers.manager_list);

router.get("/:id/manager_list", authAdmin ,adminControllers.manager_list);

router.get("/:id/hospital_list", authAdmin ,adminControllers.hospital_list);

router.get("/lock/:id", adminControllers.lockUser);

router.get("/restore/:id", adminControllers.restoreUser);

router.get("/deleteHospital/:id", adminControllers.deleteHospital);

















module.exports = router;



