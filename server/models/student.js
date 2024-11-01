import mongoose from "mongoose";
import User from "./user.js";

const studentSchema = new mongoose.Schema({
    student_id: { type: String, unique: true, maxLength: 12 },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendance: [{
        date: { type: Date },
        status: { type: String, enum: ['Vắng', 'Hiện diện'] }
    }],
    gender: { type: String, enum: ['Nam', 'Nữ'] },
    address: { type: String },
    behaviour: [{
        title: { type: String },
        date: { type: Date }
    }],
    avatar: { type: String, required: true }
})

async function updateParentInfoClass(student) {
    const userId = student.user_id;
    const user = await mongoose.model('User').findById(userId);

    if (user && user.role === 'parent') {
        // Update the `sclass` field based on the student's `class_id`
        if (!user.parentInfo.sclass.includes(student.class_id)) {
            user.parentInfo.sclass.push(student.class_id);
            await user.save();
        }
        // Update the `student_id` field
        if (!user.parentInfo.student_id.includes(student._id)) {
            user.parentInfo.student_id.push(student._id);
            await user.save();
        }
    }
}

studentSchema.post('save', async function (doc) {
    await updateParentInfoClass(doc);
});

studentSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const studentId = this.getQuery()._id;

    if (update.class_id) {
        // Find the current student document before updating
        const currentStudent = await mongoose.model('Student').findById(studentId);

        if (currentStudent && currentStudent.class_id.toString() !== update.class_id.toString()) {
            const user = await mongoose.model('User').findById(currentStudent.user_id);

            if (user && user.role === 'parent') {
                // Check if any other students still belong to the old class
                const otherStudentsInSameClass = await mongoose.model('Student').find({
                    user_id: user._id,
                    class_id: currentStudent.class_id
                });

                // If no other students belong to the old class, remove it from `sclass`
                if (otherStudentsInSameClass.length === 1) { // only this student is in the old class
                    user.parentInfo.sclass = user.parentInfo.sclass.filter(
                        classId => !classId.equals(currentStudent.class_id)
                    );
                }

                // Add the new class_id if it's not already present
                if (!user.parentInfo.sclass.includes(update.class_id)) {
                    user.parentInfo.sclass.push(update.class_id);
                }

                await user.save();
            }
        }

        //Xoa student tu user cu va them student vao user moi
        if (currentStudent && currentStudent.user_id.toString() !== update.user_id.toString()) {
            await mongoose.model('User').updateOne({ _id: currentStudent.user_id },
                {
                    $pull:
                        { "parentInfo.student_id": studentId, }
                })

            await mongoose.model('User').updateOne({ _id: update.user_id },
                {
                    $push:
                        { 'parentInfo.student_id': studentId }
                }
            )
        }
    }
    next();
});


studentSchema.pre('findOneAndDelete', async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
        const user = await mongoose.model('User').findById(doc.user_id);
        if (user && user.role === 'parent') {
            const otherStudentsInSameClass = await mongoose.model('Student').find({
                user_id: doc.user_id,
                class_id: doc.class_id
            });

            // If no other students belong to the old class, remove it from `sclass`
            if (otherStudentsInSameClass.length === 1) {
                user.parentInfo.sclass = user.parentInfo.sclass.filter(
                    classId => !classId.equals(doc.class_id)
                );
            }


            await user.save();
        }
    }
    next();
});

studentSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        const user = await mongoose.model('User').findById(doc.user_id);
        if (user && user.role === 'parent') {

            user.parentInfo.student_id = user.parentInfo.student_id.filter(
                studentId => !studentId.equals(doc._id)
            )
            await user.save();
        }
    }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;