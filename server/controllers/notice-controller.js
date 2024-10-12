import client from "../db/connection.js"


const getNoticeList = async (req, res) => {
    try {
        let result = await client.db("QuanLyNhaTruong").collection("notice").find({}).toArray()
        if (result.length > 0)
            res.json(result)
        else
            res.json({message: "Không có thông báo nào"})
    } catch (error) {
        res.status(500).json(error)
    }
}
export default getNoticeList;