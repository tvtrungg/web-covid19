const User = require('../../models/User')

const pool = require('../../../config/dbPortgres')

const bcrypt = require('bcrypt')
const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

class UserController {
  
  // [GET] /user/pageLogin
  pageLogin(req, res, next) {
    User.find({})
    .then(item => {
        res.render("account/login", {
          layout: "main1",
          item: mutipleMongoseToObject(item)
        })
      })
      .catch(next)
  }

  // [GET] /user/pageRegister
  pageRegister(req, res, next) {
    User.find({})
      .then(item => {
        res.render("account/register", {
          layout: "main1",
          item: mutipleMongoseToObject(item)
        })
      })
      .catch(next)
  }


  // [POST] /user/register
  async register(req, res, next) {
    const formData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(req.body.passWord, salt);
    // formData.id = 1;
    formData.passWord = hashed;
    formData.confirmPassword = hashed;
    formData.admin = false;
    formData.image = '';
    formData.AccountBalance = 1000;
    formData.isLogin = false;
    formData.listShopping = [];
    formData.listRelative = [];
    formData.listRelativeName = [];
    formData.listRelativeStatus = [];

    try {
      const user = new User(formData);
      await user.save();
      res.redirect('/user/pageLogin');
    }
    catch (error) {
      console.log(error);
    }
  }

  //   user.save()
  //     .then(() => res.redirect(`/user/pageLogin`))
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // [GET] /user/login
  async login(req, res, next) {
    await User.findOne({ userName: req.body.userName })
      .then(async user => {
        // let x = user.generateAuthToken()
        let x = user.findByCredentials()
        res.setHeader("Content-Type", "text/html");
        if (!user) {
          return res.status(404).json('nguoi dung khong ton tai')
        }
        const validPassword = await bcrypt.compare(
          req.body.passWord,
          user.passWord
        );

        if (!validPassword) {
          return res.status(404).json('nhap sai mat khau roi ban oi')

        } else {
          Product.find({})
            .then(async product => {
              await res.render(`user/infoUser`, {
                product: mutipleMongoseToObject(product),
                user: mongoseToObject(user)
              })
            })
        }
      })
      .catch(next)
  }

  async logout(req, res, next) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
      })
      await req.user.save()
      res.send()
    } catch (error) {
      res.status(500).send(error)
    }
  }

  // [GET] /user/:id/shopping
  shopping(req, res, next) {
    Product.find({})
      .then(item => {
        res.render("user/necessities", {
          item: mutipleMongoseToObject(item)
        })
      })
      .catch(next)
  }


  // [GET] /user/:id
  infoUser(req, res, next) {
    Product.find({})
      .then(item => {
        res.render("user/infoUser", {
          item: mutipleMongoseToObject(item)
        })
      })
      .catch(next)
  }
}



// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new UserController();
