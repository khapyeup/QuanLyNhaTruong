import client from "../db/connection.js"
const adminLogin = async (req, res) => {
    
    if (req.body.username && req.body.password) {
        let admin = await client.db("QuanLyNhaTruong").collection("taikhoan").findOne({username: req.body.username, role: "admin"})
        console.log(`Fetch from admin-controller.js with req: ${JSON.stringify(req.body)}`)
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
