const mongoose = require("mongoose");
const User = require('../../models/User')
const Ward = require('../../models/Ward')
const Hospital = require('../../models/Hospital')
const District = require('../../models/District')
const City = require('../../models/City')
const { mongoseToObject, mutipleMongoseToObject } = require('../../../util/mongooses')
const mongoose_delete = require('mongoose-delete');

class AdminControllers {
  async manager_list(req, res) {
    const manager = await User.findWithDeleted({ manager: true });
    res.render("admin/manager_list", {
      managers: mutipleMongoseToObject(manager),
      layout: "admin",
      user: mongoseToObject(req.user),
      // manager: mongoseToObject(req.user.manager),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }
  async hospital_list(req, res) {
    const wards = await Ward.find()
    const hospitals = await Hospital.find()
    res.render("admin/hospital_list", {
      layout: "admin",
      manager: mongoseToObject(req.manager),
      user: mongoseToObject(req.user),
      wards: mutipleMongoseToObject(wards),
      hospitals: mutipleMongoseToObject(hospitals),
      url: { link: `http://localhost:3000/user${req.url}` }
    })
  }
  // [POST] /admin/register
  async addManager(req, res, next) {
    const formData = req.body;
    formData.admin = false;
    formData.manager = true;
    formData.image = '';
    formData.isLogin = false;

    if (formData.passWord !== formData.confirmPassword) {
      res.render("admin/manager_list", {
        layout: "admin",
        post: {
          errPass: "Mật khẩu không khớp"
        }
      })
    }

    const user = new User(formData);
    const token = await user.generateAuthToken()
    try {
      await user.save();
      res.redirect(`/admin/manager_list`)   //chuyển sang trang login
    } catch (error) {
      res.status(500).send(error)
    }
  }

  editUser(req, res, next) {
    User.findOne({ _id: req.body.idManager })
      .then(async manager => {
        manager.name = req.body.nameEdit;
        manager.userName = req.body.userNameEdit;
        manager.cmnd = req.body.cmndEdit;
        manager.save();
      })
    res.redirect("/admin/manager_list")
      .catch(next);
  }

  lockUser(req, res, next) {
    User.delete({ _id: req.params.id })
      .then(() => res.redirect("/admin/manager_list"))
      .catch(next);
  }

  restoreUser(req, res, next) {
    User.restore({ _id: req.params.id })
      .then(() => res.redirect("/admin/manager_list"))
      .catch(next);
  }

  async addHospital(req, res, next) {
    const DataHospital = req.body;
    DataHospital._id = new mongoose.Types.ObjectId();
    DataHospital.name = req.body.nameHospital;
    DataHospital._wardid = req.body.wardSelect;
    const ward = await Ward.findOne({ _id: req.body.wardSelect });
    const district = await District.findOne({ _id: ward._distid });
    const city = await City.findOne({ _id: district._cityid });

    DataHospital.address = ward.name + ", " + district.name + ", " + city.name;
    DataHospital.capacity = req.body.capacity;
    DataHospital.intake = req.body.intake;

    const hospital = new Hospital(DataHospital);
    hospital.save()
      .then(() => res.redirect(`/admin/hospital_list`))
      .catch(next);
  }
  async editHospital(req, res, next) {
    const DataHospital = req.body;
    DataHospital._id = new mongoose.Types.ObjectId();
    const ward = await Ward.findOne({ _id: req.body.wardEdit });
    const district = await District.findOne({ _id: ward._distid });
    const city = await City.findOne({ _id: district._cityid });
    Hospital.findOne({ _id: req.body.idHospital })
      .then(async hospital => {
        hospital.name = req.body.nameHospital;
        hospital.address = ward.name + ", " + district.name + ", " + city.name;
        hospital.capacity = req.body.capacityEdit;
        hospital.intake = req.body.incakeEdit;
        hospital.save();
      })
    res.redirect(`/admin/hospital_list`)
      .catch(next);
  }

  deleteHospital(req, res, next) {
    Hospital.deleteOne({ _id: req.params.id })
      .then(() => res.redirect(`/admin/hospital_list`))
      .catch(next);
  }




}

module.exports = new AdminControllers();
