const mongoose = require("mongoose");
const User = require('../../models/User')
const Product = require('../../models/Product')
const Hospital = require('../../models/Hospital')
const Package = require('../../models/Package')
const bcrypt = require('bcrypt')
const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

class UserController {
  // [GET] /user/pageLogin
  async pageLogin(req, res, next) {
    res.render("account/login", {
      layout: "main1",
    })
  }

  // [GET] /user/pageRegister
  pageRegister(req, res, next) {
    res.render("account/register", {
      layout: "main1",
    })
  }

  // [POST] /user/register
  async register(req, res, next) {
    const formData = req.body;
    formData.admin = false;
    formData.manager = false;
    formData.debt = 0;
    formData.image = '';
    formData.AccountBalance = 10000;
    formData.isLogin = false;
    formData.purchasedStatus = [];
    formData.notification = [];
    // formData.listRelative = [];
    // formData.listRelativeName = formData.listRelativeName ?? [];
    formData.purchased = [];
    formData.payHistory = [];
    // let listRelative = [];


    if (formData.passWord !== formData.confirmPassword) {
      res.render("account/register", {
        layout: "main1",
        post: {
          errPass: "Mật khẩu không khớp"
        }
      })
    }

    const hospi = await Hospital.find({ _id: formData.treatmentAddress });
    hospi.forEach((item) => {
      formData.treatmentAddress = item.address
    })


    const user = new User(formData);
    const token = await user.generateAuthToken()
    try {
      await user.save();
      res.redirect(`/manager/patient_list`)
    } catch (error) {
      res.status(500).send(error)
    }

    const manager = await User.findOne({ manager: true })
    manager.listPatient.push(user._id)
    await manager.save()

  }
  // [GET] /user/login
  async login(req, res, next) {
    const user = await User.findByCredentials(req.body.userName, req.body.passWord, res)
    if (!user) {
      return res.render("account/login", {
        post: {
          errUserName: "invalid username",
          errPass: "ko password "
        }
      })
    }

    if (user.admin == true) {
      const token = await user.generateAuthToken()
      function setCookie(cname, cvalue) {
        res.cookie(cname, cvalue, { expire: 400000 + Date.now() });
      }
      setCookie("token", token)
      res.redirect("/admin/manager_list")
    }

    if (user.manager == true) {
      const token = await user.generateAuthToken()
      function setCookie(cname, cvalue) {
        res.cookie(cname, cvalue, { expire: 400000 + Date.now() });
      }
      setCookie("token", token)
      res.redirect("/manager/patient_list")

    }

    if (user && user.admin == false && user.manager == false) {
      Product.find({})
        .then(async product => {
          const token = await user.generateAuthToken()
          function setCookie(cname, cvalue) {
            res.cookie(cname, cvalue, { expire: 400000 + Date.now() });

          }
          setCookie("token", token)
          await res.render(`user/infoUser`, {
            product: mutipleMongoseToObject(product),
            user: mongoseToObject(user)
          })
        })
        .catch(next)
    }
  }

  async logout(req, res, next) {
    res.clearCookie('token');
    try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.render("account/login", {
        layout: "main1",
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
  async changePassword(req, res, next) {
    const user = await User.checkpasswords(req.body.userName, req.body.passWord, res)
    if (!user) {
      return res.render("user/password", {
        post: {
          notfoundUser: "username changepassword",
          notfoundPass: "password changepassword"
        }
      })
    }
    else {
      // đổi mật Khẩu
      user.passWord = req.body.newPassword
      try {
        await user.save();
        res.redirect(`/user/pageLogin`)
      } catch (error) {
        res.status(500).send(error)
      }
    }
  }

  // Nạp tiền
  async rechargeMoney(req, res, next) {
    const user = await User.findById(req.user._id)
    const statusold = user.AccountBalance
    user.AccountBalance = user.AccountBalance + parseInt(req.body.MoneyCharge)

    try {
      user.payHistory.push({ active: "Nạp tiền", time: dateTime, statusOld: statusold, currentMoney: user.AccountBalance })
      if (user.AccountBalance > 0) {
        user.notification = [];
      }
      await user.save();
      res.redirect(`/user/${req.user._id}/dashboard`)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  // [GET] /user/:id/shopping

  shopping(req, res, next) {
    var sortElement;
    var sortOrder;
    if (req.query.order == 'nameincrease') {
      sortElement = 'name';
      sortOrder = '1'
    } else if (req.query.order == 'namedecrease') {
      sortElement = 'name';
      sortOrder = '-1'
    } else if (req.query.order == 'priceincrease') {
      sortElement = 'price';
      sortOrder = '1'
    } else if (req.query.order == 'pricedecrease') {
      sortElement = 'price';
      sortOrder = '-1'
    } else {
      sortElement = 'name';
      sortOrder = '1';
    }
    var type = req.query.type ? { type: req.query.type } : {};
    const obj = {
      [sortElement]: sortOrder
    }
    Product.find(type).limit(12).skip(12 * (req.params.page - 1)).sort({ [sortElement]: sortOrder })
      .then(async item => {
        res.render("user/necessities", {
          item: mutipleMongoseToObject(item),
          user: mongoseToObject(req.user),
          url: { link: `http://localhost:3000/user${req.url}` },
          itemcount: await Product.count(),
          page: req.params.page
        })
      })
      .catch(next)
  }


  // [GET] /user/:id
  async infoUser(req, res, next) {
    var listRelatives = await User.findOne({ _id: req.params.id }).populate('listRelative').exec()
    var nameRelative = [];
    listRelatives.listRelative.forEach((item) => {
      nameRelative.push({ id: item._id, name: item.surName + ' ' + item.name, cmnd: item.cmnd, status: item.statusCovid });
    })
    res.render("user/infoUser", {
      user: mongoseToObject(req.user),
      listRelatives: nameRelative,
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  managementHistory(req, res, next) {
    res.render("user/managementHistory", {
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  async buy(req, res, next) {
    var total = 0;
    var listImage = [];
    var listType = [];
    var listName = [];
    var listAmount = [];
    var listStatus = [];
    if (!Array.isArray(req.body.idItem)) {
      req.body.idItem = [req.body.idItem]
    }
    req.body.idItem.forEach((element, index) => {
      Product.findOne({ _id: element })
        .then(async item => {
          if (item.amount > 0) {
            item.amount = item.amount - req.body.amountItem[index];
            item.save();
            total = total + item.price * req.body.amountItem[index];
            listName.push(item.name);
            listImage.push(item.image);
            listType.push(item.type);
            listAmount.push(req.body.amountItem[index])
          }
        })
    })

    const user = await User.findById(req.user._id)
    user.purchasedImages = user.purchasedImages.concat(listImage);
    user.purchasedTypes = user.purchasedTypes.concat(listType);
    user.purchasedNames = user.purchasedNames.concat(listName);
    user.purchasedAmounts = user.purchasedAmounts.concat(listAmount);


    if (user.AccountBalance >= total) {
      const statusold = user.AccountBalance
      user.AccountBalance = user.AccountBalance - total;
      user.purchasedNames.forEach((element, index) => {
        listStatus.push("Đã thanh toán");
        user.purchasedStatus = user.purchasedStatus.concat(listStatus);
        user.purchased.push({ image: user.purchasedImages[index], type: user.purchasedTypes[index], name: element, amount: user.purchasedAmounts[index], time: dateTime, status: user.purchasedStatus[index], check: false })
      })
      user.payHistory.push({ active: "Thanh toán", time: dateTime, statusOld: statusold, currentMoney: user.AccountBalance })
      user.save().then((user) => {
        res.redirect(`/user/${req.user._id}/shopping/1`);
      }).catch((error) => {
        res.status(500).send(error)
      });
      user.purchasedImages = [];
      user.purchasedTypes = [];
      user.purchasedNames = [];
      user.purchasedAmounts = [];
      user.purchasedStatus = [];
    }
    else if (user.AccountBalance < total && user.AccountBalance >= (total * user.credit)) {
      const statusold = user.AccountBalance;
      user.AccountBalance = user.AccountBalance - total;
      if (user.debt > 0) {
        user.debt = parseFloat(user.debt) + parseFloat(Math.abs(user.AccountBalance));
      }
      else {
        user.debt = Math.abs(user.AccountBalance);      // nợ
      }
      user.purchasedNames.forEach((element, index) => {
        listStatus.push(`Ghi nợ ${user.debt}`);
        user.purchasedStatus = user.purchasedStatus.concat(listStatus);
        user.purchased.push({ image: user.purchasedImages[index], type: user.purchasedTypes[index], name: element, amount: user.purchasedAmounts[index], time: dateTime, status: user.purchasedStatus[index], check: false })
      })
      user.payHistory.push({ active: "Thanh toán ghi nợ", time: dateTime, statusOld: statusold, currentMoney: user.AccountBalance })
      user.save().then((user) => {
        res.redirect(`/user/${req.user._id}/shopping/1`);
      }).catch((error) => {
        res.status(500).send(error)
      });
      user.purchasedImages = [];
      user.purchasedTypes = [];
      user.purchasedNames = [];
      user.purchasedAmounts = [];
      user.purchasedStatus = [];
    }

    else {  // (user.AccountBalance < (total * user.credit)) 
      req.body.idItem.forEach((element, index) => {
        Product.findOne({ _id: element })
          .then(async item => {
            if (item.amount > 0) {
              item.amount = parseFloat(item.amount) + parseFloat(req.body.amountItem[index]);
              item.save();
            }
          })
      })
      res.redirect(`/user/${req.user._id}/shopping/1`);
    }

    user.purchasedNames.forEach((element, index) => {
      user.purchased.push({ image: user.purchasedImages[index], type: user.purchasedTypes[index], name: element, amount: user.purchasedAmounts[index], time: dateTime, status: user.purchasedStatus[index], check: false })
    })

  }

  async buyPackages(req, res, next) {
    var total = 0;
    var listImage = [];
    var listType = [];
    var listName = [];
    var listAmount = [];
    var listStatus = [];
    if (!Array.isArray(req.body.idItem)) {
      req.body.idItem = [req.body.idItem]
    }
    req.body.idItem.forEach((element, index) => {
      Package.findOne({ _id: element })
        .then(async item => {
          if (item.amount > 0) {
            item.amount = item.amount - req.body.amountItem[index];
            item.limit = item.limit - req.body.amountItem[index];
            item.save();
            total = total + item.price * req.body.amountItem[index];
            listName.push(item.name);
            listImage.push(item.image);
            listType.push(item.type);
            listAmount.push(req.body.amountItem[index])
          }
        })
    })

    const user = await User.findById(req.user._id)
    user.purchasedImages = user.purchasedImages.concat(listImage);
    user.purchasedTypes = user.purchasedTypes.concat(listType);
    user.purchasedNames = user.purchasedNames.concat(listName);
    user.purchasedAmounts = user.purchasedAmounts.concat(listAmount);


    if (user.AccountBalance >= total) {
      const statusold = user.AccountBalance
      user.AccountBalance = user.AccountBalance - total;
      user.purchasedNames.forEach((element, index) => {
        listStatus.push("Đã thanh toán");
        user.purchasedStatus = user.purchasedStatus.concat(listStatus);
        user.purchased.push({ image: user.purchasedImages[index], type: user.purchasedTypes[index], name: element, amount: user.purchasedAmounts[index], time: dateTime, status: user.purchasedStatus[index], check: true })
      })
      user.payHistory.push({ active: "Thanh toán gói", time: dateTime, statusOld: statusold, currentMoney: user.AccountBalance })
      user.save().then((user) => {
        res.redirect(`/user/${req.user._id}/package`);
      }).catch((error) => {
        res.status(500).send(error)
      });
      user.purchasedImages = [];
      user.purchasedTypes = [];
      user.purchasedNames = [];
      user.purchasedAmounts = [];
      user.purchasedStatus = [];
    }
    else if (user.AccountBalance < total && user.AccountBalance >= (total * user.credit)) {
      const statusold = user.AccountBalance
      user.AccountBalance = user.AccountBalance - total;
      if (user.debt > 0) {
        user.debt = parseFloat(user.debt) + parseFloat(Math.abs(user.AccountBalance));
      }
      else {
        user.debt = Math.abs(user.AccountBalance);      // nợ
      }
      user.purchasedNames.forEach((element, index) => {
        listStatus.push(`Ghi nợ ${user.debt}`);
        user.purchasedStatus = user.purchasedStatus.concat(listStatus);
        user.purchased.push({ image: user.purchasedImages[index], type: user.purchasedTypes[index], name: element, amount: user.purchasedAmounts[index], time: dateTime, status: user.purchasedStatus[index], check: true })
      })
      user.payHistory.push({ active: "Thanh toán ghi nợ", time: dateTime, statusOld: statusold, currentMoney: user.AccountBalance })
      user.save().then((user) => {
        res.redirect(`/user/${req.user._id}/package`);
      }).catch((error) => {
        res.status(500).send(error)
      });
      user.purchasedImages = [];
      user.purchasedTypes = [];
      user.purchasedNames = [];
      user.purchasedAmounts = [];
      user.purchasedStatus = [];
    }

    else {  // (user.AccountBalance < (total * user.credit)) 
      req.body.idItem.forEach((element, index) => {
        Package.findOne({ _id: element })
          .then(async item => {
            if (item.amount > 0) {
              item.amount = parseFloat(item.amount) + parseFloat(req.body.amountItem[index]);
              item.limit = parseFloat(item.limit) + parseFloat(req.body.amountItem[index]);
              item.save();
            }
          })
      })
      res.redirect(`/user/${req.user._id}/package`);
    }

    user.purchasedNames.forEach((element, index) => {
      user.purchased.push({ image: user.purchasedImages[index], type: user.purchasedTypes[index], name: element, amount: user.purchasedAmounts[index], time: dateTime, status: user.purchasedStatus[index], check: true })
    })



  }

  async updatePackages(req, res, next) {
    var pkg = await Package.findOne({ _id: req.body.idPackage }).populate('package._itemid');
    console.log('======================> day la: ', pkg);
    console.log('======================> day la: ', req.body);
    var total = 0
    pkg.package.forEach((element, index) => {
      element.amount = req.body.slSpham[index];
      total += req.body.slSpham[index] * req.body.priceSP[index] * 80 / 100;
    });
    pkg.price = total;
    pkg.save();

    res.redirect(`/user/${req.user._id}/package`);

  }

  search(req, res, next) {
    if (req.query.type == 'product') {
      Product.find({ $or: [{ name: { $regex: '.*' + req.query.name + '.*' } }, { price: { $regex: '.*' + req.query.name + '.*' } }] }).limit(12).skip(12 * (req.params.page - 1))
        .then(async item => {
          res.render("user/necessities", {
            item: mutipleMongoseToObject(item),
            user: mongoseToObject(req.user),
            url: { link: `http://localhost:3000/user${req.url}` },
            itemcount: await Product.count(),
            page: req.params.page
          })
        })
        .catch(next)
    } else if (req.query.type == 'package') {
      Package.find({ $or: [{ name: { $regex: '.*' + req.query.name + '.*' } }, { price: { $regex: '.*' + req.query.name + '.*' } }] }).limit(12).skip(12 * (req.params.page - 1))
        .then(async item => {
          res.render("user/package", {
            item: mutipleMongoseToObject(item),
            user: mongoseToObject(req.user),
            url: { link: `http://localhost:3000/user${req.url}` },
            itemcount: await Package.count(),
            page: req.params.page
          })
        })
        .catch(next)
    }
  }


  dashboard(req, res, next) {
    res.render("dashboard/dashboard", {
      layout: "dashboard",
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  async package(req, res, next) {
    var sortElement;
    var sortOrder;
    if (req.query.order == 'nameincrease') {
      sortElement = 'name';
      sortOrder = '1'
    } else if (req.query.order == 'namedecrease') {
      sortElement = 'name';
      sortOrder = '-1'
    } else if (req.query.order == 'priceincrease') {
      sortElement = 'price';
      sortOrder = '1'
    } else if (req.query.order == 'pricedecrease') {
      sortElement = 'price';
      sortOrder = '-1'
    } else {
      sortElement = 'name';
      sortOrder = '1';
    }
    var type = req.query.type ? { type: req.query.type } : {};
    const obj = {
      [sortElement]: sortOrder
    }
    Package.find({}).limit(12).skip(12 * (req.params.page - 1)).sort({ [sortElement]: sortOrder })
      .then(async packages => {
        res.render("user/package", {
          packages: mutipleMongoseToObject(packages),
          user: mongoseToObject(req.user),
          url: { link: `http://localhost:3000/user${req.url}` },
        })
      })
      .catch(next)
  }

  async packageNav(req, res, next) {
    var pkg = await Package.findOne({ _id: req.params.idPackage }).populate('package._itemid');
    res.render("user/infoPackage", {
      package: mongoseToObject(pkg),
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` },
    })
  }

  recharge(req, res, next) {
    res.render("user/recharge", {
      layout: "main1",
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })

  }

  password(req, res, next) {
    res.render("user/password", {
      layout: "main1",
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

}




// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new UserController();
