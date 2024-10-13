import User from '../models/user.js'

const adminLogin = async (req, res) => {
    if (req.body.username && req.body.password) {
        let admin = await User.findOne({username: req.body.username, role: "admin"});
        if (admin) {
            if (admin.password === req.body.password) {
                admin.password = undefined;
                res.send(admin)
            } else {
                res.send({message: "Sai mật khẩu"})
            }
        } else {
            res.send({message: "Tài khoản không tồn tại!"})
        }
    } else {
        res.send({message: "Cần nhập tài khoản và mật khẩu"})
    }
}

export default adminLogin;
