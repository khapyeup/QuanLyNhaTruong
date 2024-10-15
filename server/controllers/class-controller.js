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

const addSchedule = async (req, res) => {
    try {
      
        const data = req.body;
        const classId = req.params.classId;
        console.log("AddSchedule: " + data + "ClassId" + classId)
        const schedule = await Class.findByIdAndUpdate(classId, { schedule: data }, {new: true});
        if (schedule) {
            res.json(schedule)
            console.log(schedule)
        } else {
            res.json({message: "Không thể add được lịch"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const getDetailClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        console.log("getDetailClasses: ID " + classId);
        const result = await Class.findOne({ _id: classId });
        if (result)
            res.json(result);
        else
            res.json({ message: "Không tìm thấy class" });
    } catch (error) {
        res.json(error);
    }

}

export { getClassList, addSchedule, getDetailClass };