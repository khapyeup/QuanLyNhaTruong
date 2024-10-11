import client from "../db/connection.js"

const getTeacherList = async (req, res) => {
    try {
        let result = await client.db("QuanLyNhaTruong").collection("teacher").find({}).toArray()
        if (result.length > 0)
            res.send(result);
        else
            res.send({message: "Không có giáo viên nào!"})
    } catch (error) { 
        res.status(500).json(error)
    }
}

export default getTeacherList