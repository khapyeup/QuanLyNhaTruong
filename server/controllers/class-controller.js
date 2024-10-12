


const getClassList = async (req, res) => {
    try {
        let result = await client.db("QuanLyNhaTruong").collection("class").find({}).toArray()
        if (result.length > 0)
            res.json(result)
        else
            res.json({message: "Không có lớp nào"})
    } catch (error) {
        res.status(500).json(error)
    }
}
export default getClassList;

// Lệnh dùng để truy cập teacher dựa vào teacher_id trong class
// const agg = [
//     {
//       '$lookup': {
//         'from': 'teacher', 
//         'localField': 'teacher_id', 
//         'foreignField': '_id', 
//         'as': 'teacher_info'
//       }
//     }, {
//       '$unwind': '$teacher_info'
//     }, {
//       '$project': {
//         'teacher_info.contact': 1
//       }
//     }
//   ];