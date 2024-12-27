import Remind from "../models/remind.js";

const getRemind = async (req, res) => {
    try {
        let result = await Remind.findOne()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editRemind = async (req, res) => {
    try {
        let result = await Remind.findOneAndUpdate({},req.body, {upsert: true})
        res.status(200).json({message: "Lưu cài đặt thành công!"});
    } catch (error) {
        console.log("Error at edit remind: " + error)
        res.status(500).json({ message: "Đã xảy ra lỗi khi lưu cài đặt" });
    }
};



export {getRemind, editRemind}