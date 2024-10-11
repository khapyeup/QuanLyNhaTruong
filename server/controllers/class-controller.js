import client from "../db/connection.js"


const getClassList = async (req, res) => {
    try {
        let result = await client.db("QuanLyNhaTruong").collection("class").find({}).toArray()
        if (result.length > 0)
            res.send(result)
        else
            res.json({message: "Không có lớp nào"})
    } catch (error) {
        res.status(500).json(error)
    }
}
export default getClassList;