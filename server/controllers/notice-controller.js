import Notice from '../models/notice.js'

const getNoticeList = async (req, res) => {
    try {
        let result = await Notice.find()
        if (result.length > 0)
            res.json(result)
        else
            res.json({message: "Không có thông báo nào"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const addNotice = async (req, res) => {
    const { title, content, date } = req.body;

    const newNotice = new Notice({
        title: title,
        content: content,
        date: date
    });
    try {
        await newNotice.save();
        res.status(200).json(newNotice);
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteNotice = async (req, res) => {
    const noticeId = req.params.id;

    try {
        await Notice.findByIdAndDelete(noticeId);
        res.send('Notice deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailNotice = async (req, res) => {
    const noticeId = req.params.id;
    console.log("getDetailNotice/"+ noticeId)
    try {
        const notice = await Notice.findById(noticeId)
        if (notice) {
            res.json(notice);
        } else {
            res.status(404).send('Notice not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving notice details: ' + error.message);
    }
}

const updateNotice = async (req, res) => {

    const noticeId = req.params.id;
    const updateData = req.body;
    

    try {
        const updatedNotice = await Notice.findByIdAndUpdate(noticeId, updateData, { new: true });
        console.log(updateNotice)
        if (updatedNotice) {
            res.send('Notice updated successfully');
        } else {
            res.status(404).json({message: 'Notice not found'});
        }
    } catch (error) {
        res.status(500).send('Error updating Notice: ' + error.message);
    }

}


export {getNoticeList, getDetailNotice, addNotice, updateNotice, deleteNotice};