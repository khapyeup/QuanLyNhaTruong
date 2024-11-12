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


        await Student.findOneAndDelete({ _id: studentId });
        console.log("student deleted successfully!")

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
            { _id: studentId },
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


        res.json(students);


    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getTotalAttendance = async (req, res) => {
    try {
        // Get the start and end of today in local time
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Set to midnight

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // Set to the end of the day

        // Find students with attendance status "Vắng" for today
        const studentsAttendance = await Student.find({
            attendance: {
                $elemMatch: {
                    date: { $gte: todayStart, $lte: todayEnd },
                    status: 'Hiện diện'
                }
            }
        });

        const students = await Student.find({});

        const payload = {
            attendance: studentsAttendance.length,
            percent: Math.round(studentsAttendance.length / students.length * 100) || 0,
            totalStudent: students.length
        }

        res.status(200).json(payload);
    } catch (error) {
        console.error("Error getTotalAttendance ", error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getStudentByClass = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Student.find({
            class_id: id
        }).populate('class_id');

        res.status(200).json(response);
    } catch (error) {
        console.error("Error getStudentByClass ", error);
        res.status(500).json({ error: 'Server error' });
    }
}

const setAttendanceByClass = async (req, res) => {
    const { attendance, day } = req.body;
    const attendanceDate = day ? new Date(day) : new Date(); // Default to today if no date is provided

    try {
        const promises = Object.entries(attendance).map(async ([studentId, attendanceStatus]) => {
            // Check if attendance already exists for this student on the given date
            const student = await Student.findOne({
                _id: studentId,
                "attendance.date": attendanceDate
            });

            if (student) {
                // If attendance exists, update the status
                await Student.updateOne(
                    { _id: studentId, "attendance.date": attendanceDate },
                    { $set: { "attendance.$.status": attendanceStatus } }
                );
            } else {
                // If attendance doesn't exist, add a new attendance entry
                await Student.updateOne(
                    { _id: studentId },
                    { $push: { attendance: { date: attendanceDate, status: attendanceStatus } } }
                );
            }
        });

        await Promise.all(promises); // Wait for all updates to complete
        res.status(200).json({ message: 'Attendance status updated successfully for all students' });
    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({ error: 'Failed to update attendance' });
    }
};



export { addStudent, getStudentList, deleteStudent, getDetailStudent, updateStudent, getStudentByUser, getTotalAttendance, getStudentByClass, setAttendanceByClass }