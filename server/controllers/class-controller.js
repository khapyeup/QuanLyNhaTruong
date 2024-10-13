import Class from '../models/class.js'

const getClassList = async (req, res) => {
    try {
        let result = await Class.find();
        if (result.length > 0)
            res.json(result)
        else
            res.json({ message: "Không có lớp nào" })
    } catch (error) {
        res.status(500).json(error)
    }

}
export default getClassList;