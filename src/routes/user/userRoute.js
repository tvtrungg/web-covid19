const express = require("express");
const auth = require("../../app/middlewares/checkAuth.js");
const router = express.Router();
//nap function handler vào trong file snewRoute để xử lý các route

const userController = require("../../app/controllers/user/UserController.js");


router.get("/pageLogin", userController.pageLogin);

router.get("/pageRegister", userController.pageRegister);

router.get("/:id/password", auth, userController.password);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/changePassword", userController.changePassword);

router.post("/rechargeMoney", auth, userController.rechargeMoney);

router.post("/buy", auth, userController.buy);

router.post("/buyPackages", auth, userController.buyPackages);

router.post("/updatePackages", auth, userController.updatePackages);


router.get("/logout", auth, userController.logout);

router.get("/:id/infoUser", auth, userController.infoUser);

router.get("/:id/managementHistory", auth, userController.managementHistory);

router.get("/:id/shopping/:page", auth, userController.shopping);

router.get('/:id/search', auth, userController.search);

router.get("/:id/dashboard", auth, userController.dashboard);

router.get("/:id/package", auth, userController.package);

router.get("/:id/package/:idPackage", auth, userController.packageNav);

router.get("/:id/recharge", auth, userController.recharge);



module.exports = router;



