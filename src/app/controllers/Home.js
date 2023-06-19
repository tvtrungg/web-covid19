const User = require('../models/User')
const mongoose = require("mongoose")

class HomeController {
  // [GET] /new - if don't have account admin, create new account admin
  async index(req, res) {
    res.render("home")
    const user = await User.findOne({ isAdmin: true })
    res.render("home")
    if (!user) {
      var admin;
      admin = await User.create([
        { _id: mongoose.Types.ObjectId(), userName: "admin", passWord: "admin", confirmPassword: "admin", name: 'Trung', surName: "Thiều Vĩnh", admin: true }
      ]);
    }
  }


}


// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new HomeController();
