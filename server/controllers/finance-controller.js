import Finance from "../models/finance.js";
import Payment from "../models/payment.js";
import Student from "../models/student.js"

//Get all finance records
const getAllFinanceRecords = async (req, res) => {
    try {
        const finances = await Finance.find().populate('student');
        res.json(finances);
    } catch (error) {
        console.log('Error fetching finace records\n' + error)
        res.status(500).json({ message: 'Error fetching finance records' });
    }
};

// Get finance records for all students associated with a user
const getFinanceByUserId = async (req, res) => {
    try {
        // Find all students linked to the user ID
        const students = await Student.find({ user_id: req.params.userId });
        const studentIds = students.map(student => student._id);

        // Find all finance records for these students
        const finances = await Finance.find({ student: { $in: studentIds } }).populate('student');
        
        res.status(200).json(finances);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching finance records for user' });
    }
}

//Create finance for a student
const addFinance = async (req, res) => {
    const { studentId, totalFees, dueDate } = req.body;
    try {
        const financeRecord = new Finance({
            student: studentId,
            totalFees,
            dueDate
        });
        await financeRecord.save();
        res.status(201).json(financeRecord);
    } catch (error) {
        res.status(400).json({ message: 'Error creating finance record' });
    }
}

//Update finance 
const updateFinance = async (req, res) => {
    const { totalFees, feesPaid, dueDate } = req.body;
    try {
        const finance = await Finance.findById(req.params.id);
        if (!finance) return res.status(404).json({ message: 'Finance record not found' });

        finance.totalFees = totalFees;
        finance.feesPaid = feesPaid;
        finance.outstandingFees = totalFees - feesPaid;
        finance.dueDate = dueDate;
        await finance.save();

        res.status(200).json(finance);
    } catch (error) {
        res.status(500).json({ message: 'Error updating finance record' });
    }
}

const deleteFinance = async (req, res) => {
    try {
        await Finance.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Finance record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting finance record' });
    }
}

//Record a payment
const recordPayment = async (req, res) => {
    const { financeRecordId, amount, paymentMethod } = req.body;
    try {
        const financeRecord = await Finance.findById(financeRecordId);
        if (!financeRecord) return res.status(404).json({ message: 'Finance record not found' });

        const payment = new Payment({
            financeRecord: financeRecordId,
            amount,
            paymentMethod
        });
        await payment.save();

        // Update feesPaid and outstandingFees
        financeRecord.feesPaid += amount;
        financeRecord.outstandingFees = financeRecord.totalFees - financeRecord.feesPaid;
        await financeRecord.save();

        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: 'Error processing payment' });
    }
}

export {getAllFinanceRecords, getFinanceByUserId, addFinance, updateFinance, deleteFinance ,recordPayment}