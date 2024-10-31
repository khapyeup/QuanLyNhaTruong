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
    const data = req.body;

    const newStudent = new Student({
        ...data,
        attendance: [],
        behaviour: []
    });

    try {
        await newStudent.save();

        console.log('Add new student successfully:\n ' + newStudent);
        res.status(200).json('Add new student successfully');
    } catch (error) {
        console.log('Add new student failed\n' + error)
        res.status(500).json(error)
    }
}

const deleteStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            console.log("Student not found.");
            return res.send('Student not found')
        }
        const userId = student.user_id;
        const sclassId = student.class_id;

        await Student.findOneAndDelete({_id: studentId});
        console.log("student deleted successfully!")

        

        console.log("Student ID removed from user successfully!");
    } catch (error) {
        console.log('Error deleting student', error)
        res.status(500).send(error);
    }
}

const getDetailStudent = async (req, res) => {
    const studentId = req.params.id;
    console.log("getDetailStudent/" + studentId)
    try {
        const student = await Student.findById(studentId).populate('class_id').populate('user_id');
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
    try {
        const studentId = req.params.id;
        const newUserId = req.body.user_id;
        const newStudentData = req.body;


        //Find student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            console.log("Student not found.");
            res.json('Student not found');
            return
        }


        //Update the student with the new user ID
        const updatedStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            newStudentData,
            { new: true } // Return the updated document
        );
        console.log("Student updated successfully:", updatedStudent);

       

    } catch (error) {
        console.error("Error updating student user ID:", error);
        res.status(500).json(error);
    }

}

const getStudentByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const students = await Student.find({ user_id: userId }).populate('class_id');

        if (!students) {
            return res.status(404).json({ message: 'No students found for this user' });
        }

        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: 'Server error' });
    }
}


export { addStudent, getStudentList, deleteStudent, getDetailStudent, updateStudent, getStudentByUser }