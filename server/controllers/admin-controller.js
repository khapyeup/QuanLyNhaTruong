import User from '../models/user.js'

const adminLogin = async (req, res) => {
    if (req.body.username && req.body.password) {
        let admin = await User.findOne({ username: req.body.username, role: "admin" });
        if (admin) {
            if (admin.password === req.body.password) {
                admin.password = undefined;
                res.send(admin)
            } else {
                res.send({ message: "Sai mật khẩu" })
            }
        } else {
            res.send({ message: "Tài khoản không tồn tại!" })
        }
    } else {
        res.send({ message: "Cần nhập tài khoản và mật khẩu" })
    }
}

const getUserList = async (req, res) => {
    try {
        const userList = await User.find({ role: 'parent' })
        res.json(userList);
    } catch (error) {
        res.json(error);
    }
}

const getDetailUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.json(user);
        }
        return res.status(500).json({message: "Không tìm thấy tài khoản"})
    } catch (error) {
        res.json(error);
    }
}

const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json("Thêm user thành công");
        console.log("Thêm user thành công");
    } catch (error) {
        res.status(500).json(error)
        console.log("Thêm user thất bại " + error)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndUpdate(id, req.body);

        if (!result) {
            console.log('Có lỗi khi update user' + result);
            return res.status(500).json({ message: 'Không tìm thấy user' })
        }

        return res.status(200).json({ message: 'Update thành công' })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}



export { adminLogin, getUserList, addUser, updateUser, getDetailUser };
