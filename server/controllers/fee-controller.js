import Fee from "../models/fee.js";

export const getFeeList = async (req, res) => {
    try {
        let result = await Fee.find()
        res.json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const addFee = async (req, res) => {
    try {
        const {name, baseFee,mealFee, transportFee, dueDate} = req.body;

        const result = new Fee({
            name, baseFee,mealFee, transportFee, dueDate
        })

        await result.save();
        res.json({message: "Thêm thành công 😍"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateFee = async (req, res) => {
    try {
        const {name, baseFee,mealFee, transportFee, dueDate} = req.body;

        const fee = await Fee.findByIdAndUpdate(req.params.id, {name, baseFee,mealFee, transportFee, dueDate})
        res.json({message: "Chỉnh sửa thành công 😍"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteFee = async (req, res) => {
    try {
        const {id} = req.params;
        const fee = await Fee.findById(id)
        if (!fee) {
            return res.status(500).json({message: "Không tìm thấy!"})
        }
        await Fee.findByIdAndDelete(id)
        res.json({message: "Xoá thành công"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}