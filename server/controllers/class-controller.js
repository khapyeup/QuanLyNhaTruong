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
            weekStart: '',
            weekEnd: '',
            content: [{
                day: 'Thu 2',
                periods: [{}]
            },
            {
                day: 'Thu 3',
                periods: [{}]
            },
            {
                day: 'Thu 4',
                periods: [{}]
            },
            {
                day: 'Thu 5',
                periods: [{}]
            },
            {
                day: 'Thu 6',
                periods: [{}]
            },
            {
                day: 'Thu 7',
                periods: [{}]
            }]
        }]
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
            res.status(404).json({ message: 'Class not found' });
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
        //kiem tra xem da co lich nay chua
        const existingClass = await Class.findOne({_id: classId});
        if (!existingClass) {
            return res.status(404).send({message: 'Class not found'});
        }
        const scheduleIndex = existingClass.schedule.findIndex(schedule => schedule.weekStart === data.weekStart);

        if (scheduleIndex > -1) {
            // WeekStart exists, update the existing schedule
            existingClass.schedule[scheduleIndex] = { weekStart, weekEnd, content };
        } else {
            // WeekStart does not exist, add a new schedule element
            existingClass.schedule.push(data);
        }
        await existingClass.save();

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