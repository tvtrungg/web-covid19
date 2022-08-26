const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    id: { type: Number, index: true },
    name: { type: String, maxlength: 30, require: true },
    userName: { type: String, maxlength: 30, unique: true },
    passWord: { type: String, maxlength: 225, require: true },
    confirmPassword: { type: String, maxlength: 225, require: true },
    admin: { type: Boolean, default: false },
    manager: { type: Boolean, default: false },
    image: { type: String, maxlength: 225 },

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

adminSchema.pre('save', async function (next) {
    // Hash the password before saving the admin model
    const admin = this
    if (admin.isModified('passWord')) {
        admin.passWord = await bcrypt.hash(admin.passWord, 10)
        admin.confirmPassword = await bcrypt.hash(admin.confirmPassword, 10)
    }
    next()
})

adminSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the admin
    const admin = this
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_KEY, { expiresIn: "2d" })
    admin.tokens = admin.tokens.concat({ token })
    await admin.save()
    return token
}

adminSchema.statics.findByCredentials = async (userName, passWord, res) => {
    // Search for a admin by username and password.
    const admin = await Admin.findOne({ userName })
    if (!admin) {
        // throw new Error({ error: 'Invalid login credentials' })
        return res.render("account/login", {
            layout: "main1",
            post: {
                errUserName: "invalid username",
            }
        })
        admin = {}
    } else {
        const isPasswordMatch = await bcrypt.compare(passWord, admin.passWord)
        if (!isPasswordMatch) {
            // throw new Error({ error: 'Invalid login credentials' })
            res.render("account/login", {
                layout: "main1",
                post: {
                    errPass: "invalid password"
                }
            })
        } else {
            return admin
        }
    }
}

const Admin = mongoose.model('infoAdmin', adminSchema)
module.exports = Admin