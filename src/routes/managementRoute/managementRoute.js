const express = require("express");
const authManager = require("../../app/middlewares/authManager.js");
const router = express.Router();
const ManagementControllers = require("../../app/controllers/management/ManagementControllers.js");


router.get("/:slug", authManager, ManagementControllers.patient_list);

router.get("/:id/patient_list", authManager, ManagementControllers.patient_list);

router.get("/:id/editcredit", authManager, ManagementControllers.editcredit);

router.get("/:id/editpackages", authManager, ManagementControllers.package);

router.get("/:id/package/:idPackage", authManager, ManagementControllers.packageNav);

router.get("/:id/editproduct/:page", authManager, ManagementControllers.editproduct);

router.get("/:id/manaDebt", authManager, ManagementControllers.manaDebt);

router.get("/:id/statistical", authManager, ManagementControllers.statistical);

router.get('/:id/search', authManager, ManagementControllers.search);

router.get("/notification/:id", ManagementControllers.notification);

router.get("/deletePackage/:id", ManagementControllers.deletePackage);


router.post("/Credit_Edit", ManagementControllers.Credit_Edit);

router.post("/editUser", ManagementControllers.editUser);

router.post("/edit_Product", ManagementControllers.edit_Product);

router.post("/addProduct", ManagementControllers.addProduct);

router.post("/updatePackages", ManagementControllers.updatePackages);









module.exports = router;