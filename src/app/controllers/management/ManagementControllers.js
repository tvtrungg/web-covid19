const User = require('../../models/User')
const Ward = require('../../models/Ward')
const Hospital = require('../../models/Hospital')
const Product = require('../../models/Product')
const Package = require('../../models/Package')
const mongoose = require("mongoose");



const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')

var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

class ManagementControllers {
  async patient_list(req, res) {
    const manager = await User.findOne({ manager: true }).populate('listPatient')
    const users = manager.listPatient
    const hospitals = await Hospital.find()
    // var listRelatives = await User.findOne({ _id: req.params.id }).populate('listRelative').exec()
    // var nameRelative = [];
    // listRelatives.listRelative.forEach((item) => {
    //   nameRelative.push({ id: item._id, name: item.surName + ' ' + item.name, cmnd: item.cmnd, status: item.statusCovid });
    // })

    res.render("manager/patient_list", {
      users: mutipleMongoseToObject(manager.listPatient),
      layout: "mana",
      user: mongoseToObject(req.user),
      listPatient: mongoseToObject(users),
      // listRelatives: nameRelative,
      hospitals: mutipleMongoseToObject(hospitals),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  editcredit(req, res) {
    res.render("manager/editcredit", {
      layout: "mana",
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  async Credit_Edit(req, res, next) {
    const manager = await User.findOne({ _id: req.body.ID_Current_Manager }).populate('listPatient')
    manager.listPatient.forEach(patient => {
      patient.credit = req.body.newCredit;
      patient.save();
    })
    res.redirect(`/manager/${req.body.ID_Current_Manager}/editcredit`)


  }

  async editUser(req, res, next) {
    User.findOne({ _id: req.body.idPatient })
      .then(async patient => {
        const addressOld = patient.treatmentAddress
        patient.surName = req.body.surNameEdit;
        patient.name = req.body.nameEdit;
        patient.cmnd = req.body.cmndEdit;
        const hospi = await Hospital.find({ _id: req.body.treatmentAddressEdit });
        hospi.forEach((item) => {
          patient.treatmentAddress = item.address
        })
        const statusold = patient.statusCovid;
        patient.statusCovid = req.body.StatusEdit;
        patient.exchangeHistory.push({ activeOld: addressOld, active: patient.treatmentAddress, time: dateTime, statusOld: statusold, status: patient.statusCovid })
        patient.save();
      })
    res.redirect("/manager/patient_list")
      .catch(next);

  }

  editproduct(req, res, next) {
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
        res.render("manager/editproduct", {
          layout: "mana",
          item: mutipleMongoseToObject(item),
          user: mongoseToObject(req.user),
          url: { link: `http://localhost:3000/user${req.url}` },
          itemcount: await Product.count(),
          page: req.params.page
        })
      })
      .catch(next)

  }

  async edit_Product(req, res, next) {
    Product.findOne({ _id: req.body.IdProduct })
      .then(async product => {
        product.name = req.body.nameEdit;
        product.amount = req.body.amountEdit;
        product.price = req.body.priceEdit;
        product.image = req.body.imageEdit[0];
        product.image1 = req.body.imageEdit[1];
        product.image2 = req.body.imageEdit[2];
        // product.exchangeHistory.push({ active: product.treatmentAddress, time: dateTime, statusOld: statusold, status: product.statusCovid })
        product.save();
      })
    res.redirect(`/manager/${req.user._id}/editproduct`)
      .catch(next);

  }

  async addProduct(req, res, next) {
    const dataProduct = req.body;
    dataProduct._id = new mongoose.Types.ObjectId();
    dataProduct.name = req.body.nameAdd;
    dataProduct.type = req.body.typeAdd;
    dataProduct.image = req.body.imageAdd[0];
    dataProduct.image1 = req.body.imageAdd[1];
    dataProduct.image2 = req.body.imageAdd[2];
    dataProduct.amount = req.body.amountAdd;
    dataProduct.price = req.body.priceAdd;

    const newProduct = new Product(dataProduct);
    newProduct.save()
      .then(() => res.redirect(`/manager/editproduct`))
      .catch(next);
  }

  search(req, res, next) {
    if (req.query.type == 'product') {
      Product.find({ $or: [{ name: { $regex: '.*' + req.query.name + '.*' } }, { price: { $regex: '.*' + req.query.name + '.*' } }] }).limit(12).skip(12 * (req.params.page - 1))
        .then(async item => {
          res.render("manager/editproduct", {
            layout: "mana",
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
          res.render("manager/editpackages", {
            layout: "mana",
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
        res.render("manager/editpackages", {
          layout: "mana",
          packages: mutipleMongoseToObject(packages),
          user: mongoseToObject(req.user),
          url: { link: `http://localhost:3000/user${req.url}` },
        })
      })
      .catch(next)
  }

  async packageNav(req, res, next) {
    var pkg = await Package.findOne({ _id: req.params.idPackage }).populate('package._itemid');
    var pd = await Product.find({});
    res.render("manager/infoPackage", {
      layout: "mana",
      package: mongoseToObject(pkg),
      product: mutipleMongoseToObject(pd),
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` },
    })
  }

  async updatePackages(req, res, next) {
    var pkg = await Package.findOne({ _id: req.body.idPackage }).populate('package._itemid');
    var total = 0
    pkg.package.forEach((element, index) => {
      element.amountMax = req.body.slSpham[index];
      total += req.body.slSpham[index] * req.body.priceSP[index] * 80 / 100;
    });
    pkg.price = total;
    pkg.save();

    res.redirect(`/manager/editpackages`);

  }

  async manaDebt(req, res) {
    const manager = await User.findOne({ _id: req.params.id }).populate('listPatient');
    const users = manager.listPatient;
    var array = [];
    users.forEach(user => {
      if (user.AccountBalance < 0) {
        array.push(user)
      }
    })
    res.render("manager/manaDebt", {
      users: mutipleMongoseToObject(array),
      layout: "mana",
      user: mongoseToObject(req.user),
      listPatient: mongoseToObject(users),
      url: { link: `http://localhost:3000/user${req.url}` }
    })


  }
  async notification(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then(async patient => {
        console.log('==================> ', patient)
        patient.notification.push({ time: dateTime, content: `Vui lòng thanh toán nợ ${patient.AccountBalance}` })
        patient.save();
      })
    res.redirect("/manager/patient_list")
      .catch(next);
  }

  async statistical(req, res, next) {
    var f0 = 0;
    var f1 = 0;
    var f2 = 0;
    var f3 = 0;
    var f4 = 0;
    var pay=0;
    var debt=0;
    var list = [];
    var listpay = [];
    var listdebt = [];
    const status = await User.find({})
    status.forEach(status => {
      if (status.statusCovid == 'F0') {
        f0++;
      }
      if (status.statusCovid == 'F1') {
        f1++;
      }
      if (status.statusCovid == 'F2') {
        f2++;
      }
      if (status.statusCovid == 'F3') {
        f3++;
      }
      if (status.statusCovid == 'F3') {
        f4++;
      }
      if(status.payHistory.length != 0) {
        pay++;
      }
      if(status.debt != 0) {
        debt++;
      }
    })
    list.push(f0,f1,f2,f3,f4);
    listpay.push(pay);
    listdebt.push(debt);
    res.render("manager/statistical", {
      layout: "mana",
      list: list,
      listpay: listpay,
      listdebt: listdebt,
      user: mongoseToObject(req.user),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }

  deletePackage(req, res, next) {
    Package.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/manager/editpackages"))
      .catch(next);
  }


}


// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new ManagementControllers();
