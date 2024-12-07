import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    baseFee: { type: Number, required: true },
    mealFee: { type: Number, required: true },
    transportFee: { type: Number, required: true },
    dueDate: { type: Date, required: true }
})

feeSchema.post("findOneAndUpdate", async function (doc) {
    if (doc) {
      const { baseFee, mealFee, transportFee } = doc;
      
  
      const Payment = mongoose.model("Payment");
  
      // Fetch all related Payments
      const payments = await Payment.find({ fee: doc._id });
  
      for (const payment of payments) {
        // Calculate the balance based on the flags
        const balance =
          baseFee +
          (payment.mealPlanEnabled ? mealFee : 0) +
          (payment.transportEnabled ? transportFee : 0);
          console.log("payment.mealPlanEnabled: " + payment.mealPlanEnabled)
            console.log("payment.mealPlanEnabled: " + (payment.mealPlanEnabled ? mealFee : 0))
            console.log("payment.transportEnabled: " + (payment.transportEnabled ? transportFee : 0))
          console.log("baseFee: " + baseFee)
         
        // Calculate the total amount paid
        const totalPaid = payment.payment.reduce((sum, p) => sum + p.amount + p.discount, 0);
  
        // Determine the status
        let status;
        if (totalPaid === 0) {
          status = "Chưa trả"; // No payments made
        } else if (totalPaid >= balance) {
          status = "Đã trả"; // Fully paid
        } else {
          status = "Đang trả"; // Partially paid
        }
  
        // Update the payment document
        await Payment.updateOne(
          { _id: payment._id },
          {
            $set: {
                amount: balance,
              balance: balance - totalPaid < 0 ? 0 : balance - totalPaid, //If balance < totalPaid then assign it to 0
              status,
            },
          }
        );
      }
    }
  });
  

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;