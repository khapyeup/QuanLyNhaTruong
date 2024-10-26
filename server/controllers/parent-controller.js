import User from '../models/user.js'

const parentLogin = async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            let parent = await User.findOne({username: req.body.username, role: "parent"}).populate('student_id').exec()
            
            if (parent) {
                if (parent.password === req.body.password) {
                    parent.password = undefined;
                    res.json(parent)
                } else {
                    res.json({ message: "Sai mật khẩu" })
                }
            } else {
                res.json({ message: "Tài khoản không tồn tại!" })
            }
        } else {
            res.json({ message: "Cần nhập tài khoản và mật khẩu" })
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


const getParentList = async (req, res) => {
    try {
        let result = await User.find({role: "parent"})
        if (result.length > 0)
            res.json(result)
        else
            res.json({message: "Không có phụ huynh nào"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export {parentLogin, getParentList};
