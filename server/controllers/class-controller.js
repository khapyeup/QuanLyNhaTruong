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

const addClass = async (req, res) => {
    const { name } = req.body;

    const newClass = new Class({
        name: name,
        schedule: [{
            day: "Thứ 2",
            periods: []
        },
        {
            day: "Thứ 3",
            periods: []
        },
        {
            day: "Thứ 4",
            periods: []
        },
        {
            day: "Thứ 5",
            periods: []
        },
        {
            day: "Thứ 6",
            periods: []
        },
        {
            day: "Thứ 7",
            periods: []
        }
    ]
    });
    try {
        await newClass.save();
        res.status(200).json(newClass);
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateClass = async (req, res) => {

    const classId = req.params.id;
    const updateData = req.body;
    

    try {
        const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });
        console.log(updatedClass)
        if (updatedClass) {
            res.send('Class updated successfully');
        } else {
            res.status(404).json({message: 'Class not found'});
        }
    } catch (error) {
        res.status(500).send('Error updating class: ' + error.message);
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

export { getClassList, addClass, updateClass, addSchedule, getDetailClass };