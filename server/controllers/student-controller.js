import Student from '../models/student.js'
import User from '../models/user.js'

const getStudentList = async (req, res) => {
    try {
        let result = await Student.find().populate('class_id').populate('user_id')
        if (result.length > 0)
            res.send(result)
        else
            res.send({ message: "Không có học sinh nào" })
    } catch (error) {
        res.status(500).json(error)
    }
}

const addStudent = async (req, res) => {
    const { name, dob, class_id, gender, address, user_id } = req.body;

    const newStudent = new Student({
        name,
        dob,
        class_id,
        gender,
        address,
        user_id,
        attendance: [],
        behaviour: []
    });
    try {
        await newStudent.save();
        res.status(200).json(newStudent);
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        await Student.findByIdAndDelete(studentId);
        res.send('Student deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findById(studentId).populate('class_id');
        if (student) {
            res.json(student);
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving student details: ' + error.message);
    }
}

const updateStudent = async (req, res) => {

    const studentId = req.params.id;
    const updateData = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
        if (updatedStudent) {
            res.send('Student updated successfully');
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        res.status(500).send('Error updating student: ' + error.message);
    }

}

export { addStudent, getStudentList, deleteStudent, getDetailStudent, updateStudent }