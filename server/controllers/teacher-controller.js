import Teacher from '../models/teacher.js'

const getTeacherList = async (req, res) => {
    try {
        let result = await Teacher.find().populate('class_id')
        if (result.length > 0)
            res.send(result);
        else
            res.send({ message: "Không có giáo viên nào!" })
    } catch (error) {
        res.status(500).json(error)
    }
}

const getDetailTeacher = async (req, res) => {
    const teacherId = req.params.id;

    try {
        const teacher = await Teacher.findById(teacherId).populate('class_id');
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).send('Teacher not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving teacher details: ' + error.message);
    }
}

const addTeacher = async (req, res) => {
    const { name, subject, email, phone, class_id, gender } = req.body;

    const newTeacher = new Teacher({
        name,
        subject,
        email,
        phone,
        class_id,
        gender,
        attendance: []
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
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updateData, { new: true });
        if (updatedTeacher) {
            res.send('Teacher updated successfully');
        } else {
            res.status(404).send({message: 'Không thể update teacher'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteTeacher = async (req, res) => {
    const teacherId = req.params.id;

    try {
        await Teacher.findByIdAndDelete(teacherId);
        res.send('Teacher deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getTeacherList, getDetailTeacher, addTeacher, updateTeacher, deleteTeacher }