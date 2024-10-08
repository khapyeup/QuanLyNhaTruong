import client from "../db/connection.js"
const parentLogin = async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            let parent = await client.db("QuanLyNhaTruong").collection("taikhoan").findOne({ username: req.body.username, role: "parent" })
            if (parent) {
                if (parent.password === req.body.password) {
                    parent.password = undefined;
                    res.send(parent)
                } else {
                    res.send({ message: "Sai mật khẩu" })
                }
            } else {
                res.send({ message: "Tài khoản không tồn tại!" })
            }
        } else {
            res.send({ message: "Cần nhập tài khoản và mật khẩu" })
        }
        console.log(`Fetch from admin-controller.js with req: ${JSON.stringify(req.body)}`)
    } catch (error) {
        res.status(500).json(err);
    }
}

export default parentLogin;
