import Complaint from "../models/complaint.js"

const addComplaint = async (req, res) => {
    try {
        const { submittedBy, title, description } = req.body;

        const complaint = new Complaint({
            submittedBy, title, description
        })

        await complaint.save();
        res.json({ message: "Đã gửi đánh giá thành công" })
    } catch (error) {
        res.status(500).json({ message: "Không thể gửi đánh giá" })
    }
}

//Get all complaints (Admin only)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("submittedBy", "parentInfo.fatherName");
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Không thể lấy dữ liệu" })
    }
}

//Update a complaints status or response (admin only)
const updateComplaints = async (req, res) => {
    try {
        const { status, response } = req.body;

        const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { status, response }, { new: true })

        if (!updatedComplaint) {
            return res.status(500).json({ message: "Không tìm thấy đánh giá" })
        }

        res.json({ message: "Cập nhật thành công" })
    } catch (error) {
        res.status(500).json({ message: "Không thể lấy dữ liệu" })
    }
}

//Get complaints for a specific user
const getComplaintsByUser = async (req, res) => {
    try {
        const complaints = await Complaint.find({ submittedBy: req.params.userId });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Không thể lấy dữ liệu" })
    }
}

export { addComplaint, getAllComplaints, updateComplaints, getComplaintsByUser }