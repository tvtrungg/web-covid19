const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const userSchema = new Schema({
    id: { type: Number, index: true },
    userName: { type: String, maxlength: 30, unique: true },
    name: { type: String, maxlength: 30, require: true },
    surName: { type: String, maxlength: 30, require: true },
    phone: { type: String, maxlength: 11, unique: true },
    gmail: { type: String, maxlength: 50, unique: true },
    cmnd: { type: String, maxlength: 20, unique: true },
    birthday_day: { type: Number },
    birthday_month: { type: Number },
    birthday_year: { type: Number },
    sex: { type: String },
    passWord: { type: String, maxlength: 225, require: true },
    confirmPassword: { type: String, maxlength: 225, require: true },
    newPassword: { type: String, maxlength: 225, require: true },
    admin: { type: Boolean, default: false },
    manager: { type: Boolean, default: false },
    address: { type: String, maxlength: 225 },
    image: { type: String, maxlength: 225 },
    AccountBalance: { type: Number, index: true },
    statusCovid: { type: String, maxlength: 30 },
    treatmentAddress: { type: String, maxlength: 225 },
    treatmentCity: { type: String, maxlength: 225 },
    treatmentDistrict: { type: String, maxlength: 225 },
    treatmentWard: { type: String, maxlength: 225 },
    debt: { type: String, maxlength: 225 },
    isLogin: { type: Boolean },

    purchasedImages: { type: Array },
    purchasedTypes: { type: Array },
    purchasedNames: { type: Array },
    purchasedAmounts: { type: Array },
    purchasedStatus: { type: Array },
    purchased: [{
        image: { type: String, maxlength: 225 },
        type: { type: String, maxlength: 225 },
        name: { type: String, maxlength: 30 },
        amount: { type: Number, maxlength: 30 },
        time: { type: String },
        status: { type: String, maxlength: 30 },
        check: { type: Boolean }
    }],

    payHistory: [{
        time: { type: String },
        active: { type: String },
        statusOld: { type: String, maxlength: 30 },
        currentMoney: { type: String, maxlength: 30 }
    }],

    exchangeHistory: [{
        time: { type: String },
        status: { type: String, maxlength: 30 },
        statusOld: { type: String, maxlength: 30 },
        activeOld: { type: String },
        active: { type: String }

    }], 
    notification: [{
        time: { type: String },
        content: { type: String }
    }],

    listPatient: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'infoUser'
    },
    listRelative: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'infoUser'
    },

    credit: { type: Number, maxlength: 30, default: 0.2 },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true
    });

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('passWord')) {
        user.passWord = await bcrypt.hash(user.passWord, 10)
        user.confirmPassword = await bcrypt.hash(user.confirmPassword, 10)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "2d" })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (userName, passWord, res) => {
    // Search for a user by username and password.
    const user = await User.findOne({ userName })
    if (!user) {
        // throw new Error({ error: 'Invalid login credentials' })
        return res.render("account/login", {
            layout: "main1",
            post: {
                errUserName: "invalid username",
            }
        })
        user = {}
    } else {
        const isPasswordMatch = await bcrypt.compare(passWord, user.passWord)
        if (!isPasswordMatch) {
            // throw new Error({ error: 'Invalid login credentials' })
            res.render("account/login", {
                layout: "main1",
                post: {
                    errPass: "invalid password"
                }
            })
        } else {
            return user
        }
    }
}

userSchema.statics.checkpasswords = async (userName, passWord, res) => {
    // Search for a user by username and password.
    const user = await User.findOne({ userName })
    const abcd = String(user._id)
    if (!user) {
        return res.render(`user/password`, {
            post: {
                errUserName: "ko có tài khoản này",
            }
        })
        user = {}

    } else {
        const isPasswordMatch = await bcrypt.compare(passWord, user.passWord)
        if (!isPasswordMatch) {
            // throw new Error({ error: 'Invalid login credentials' })
            res.render(`user/password`, {
                layout: "main1",
                post: {
                    errPass: "ko đúng mk"
                }
            })
        } else {
            return user
        }
    }
}

userSchema.plugin(mongoose_delete, { overrideMethods: true });

const User = mongoose.model('infoUser', userSchema)
module.exports = User