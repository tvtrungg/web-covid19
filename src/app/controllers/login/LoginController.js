const infoUser = require('../../models/User')

const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

class LoginController {
  // [GET] /new
  login(req, res) {
    res.render("account/login");
  }

  // index(req, res, next) {
  //   infoUser.find({})
  //     .then(courses => {
  //       res.render("user/necessities", {
  //         courses: mutipleMongoseToObject(courses)
  //       })
  //     })
  //     .catch(next)
  // }
}

// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new LoginController();
