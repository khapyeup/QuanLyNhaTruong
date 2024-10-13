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
export default getNoticeList;