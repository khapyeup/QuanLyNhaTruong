import Notice from '../models/notice.js'

const getNoticeList = async (req, res) => {
    try {
        let result = await Notice.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: 'Có lỗi khi lấy dữ liệu ' + error})
    }
}

const addNotice = async (req, res) => {
    const { title, content } = req.body;

    const newNotice = new Notice({
        title: title,
        content: content,
    });
    try {
        await newNotice.save();
        res.status(200).json({message: "Thêm thông báo thành công!"});
    } catch (error) {
        res.status(500).json({message: "Có lỗi khi thêm thông báo " + error})
    }
}

const deleteNotice = async (req, res) => {
    const noticeId = req.params.id;

    try {
        await Notice.findByIdAndDelete(noticeId);
        res.status(200).json({message: 'Xoá thông báo thành công'});
    } catch (error) {
        res.status(500).json({message: 'Có lỗi khi xoá thông báo ' + error});
    }
}

const getDetailNotice = async (req, res) => {
    const noticeId = req.params.id;
    console.log("getDetailNotice/"+ noticeId)
    try {
        const notice = await Notice.findById(noticeId)
        if (notice) {
            res.status(200).json(notice);
        } else {
            res.status(404).send({message: "Không tìm thấy thông báo"});
        }
    } catch (error) {
        res.status(500).json({message: 'Có lỗi khi lấy dữ liệu thông báo' + error});
    }
}

const updateNotice = async (req, res) => {

    const noticeId = req.params.id;
    const updateData = req.body;
    

    try {
        const updatedNotice = await Notice.findByIdAndUpdate(noticeId, updateData, { new: true });
        console.log(updateNotice)
        if (updatedNotice) {
            res.status(200).json({message: 'Cập nhật thông báo thành công' });
        } else {
            res.status(404).json({message: 'Không tìm thấy thông báo'});
        }
    } catch (error) {
        res.status(500).json({message: 'Có lỗi khi lưu thông báo: ' + error.message});
    }

}


export {getNoticeList, getDetailNotice, addNotice, updateNotice, deleteNotice};