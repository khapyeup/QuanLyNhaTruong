import mongoose from "mongoose";

const remind = new mongoose.Schema({
    alertDays: {type: Number, default: 1}
})

const Remind = mongoose.model("Remind", remind);
export default Remind;