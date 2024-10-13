import Teacher from '../models/teacher.js'

const getTeacherList = async (req, res) => {
    try {
        let result = await Teacher.find().populate('class_id')
        if (result.length > 0)
            res.send(result);
        else
            res.send({message: "Không có giáo viên nào!"})
    } catch (error) { 
        res.status(500).json(error)
    }
}

export default getTeacherList