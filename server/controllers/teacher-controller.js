import User from "../models/user.js";

const getTeacherList = async (req, res) => {
    try {
        let result = await User.find({ role: 'teacher' }).populate('teacherInfo.class')

        res.status(200).json(result);

    } catch (error) {
        console.log('Error getTeacherList\n', error);
        res.status(500).json({ message: 'Error get teachers' })
    }
}

const getDetailTeacher = async (req, res) => {
    const teacherId = req.params.id;

    try {
        const result = await User.findOne({ _id: teacherId, role: 'teacher' })
            .populate('teacherInfo.class')
            .exec((err, user) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).json(result);
            })
    } catch (error) {
        res.status(500).json('Error retrieving teacher details: ' + error.message);
    }
}

const addTeacher = async (req, res) => {
    const { username, password, role, teacherInfo } = req.body;

    const newTeacher = new User({
        username, password, role, teacherInfo
    });

    try {
        await newTeacher.save();
        res.status(201).send('New teacher added successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateTeacher = async (req, res) => {
    const teacherId = req.params.id;
    const updateData = req.body;
    console.log("updateTeacher with id:" + teacherId + " req.body: " + updateData)
    try {
        const updatedTeacher = await User.findByIdAndUpdate(teacherId, updateData, { new: true });
            res.json('Teacher updated successfully', updatedTeacher);
        
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteTeacher = async (req, res) => {
    const teacherId = req.params.id;

    try {
        await User.findByIdAndDelete(teacherId);
        res.send('Teacher deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getTeacherList, getDetailTeacher, addTeacher, updateTeacher, deleteTeacher }