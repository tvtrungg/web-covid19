const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/user/pageLogin");
    }
    try {
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if(user.admin == false){
            return res.redirect(`/user/${user._id}/dashboard`);
        }else{
            req.user = user;
            req.token = token;
            return next();
        }
    } catch {
        return res.sendStatus(403);
    }

}
module.exports = authAdmin