

const homeRoute = require("./homeRoute/home");
const loginRoute = require("./login/login.route");
const adminRoute = require("./adminRoute/adminRoute");
const managementRoute = require("./managementRoute/managementRoute");
const userRoute = require("./user/userRoute");
const migration = require("./migration/migration");
function route(app) {


  app.use("/login", loginRoute);

  app.use("/manager", managementRoute);

  app.use("/admin", adminRoute);

  app.use("/user", userRoute);

  app.use("/", homeRoute);

  app.use("/migration", migration);

}

module.exports = route;
