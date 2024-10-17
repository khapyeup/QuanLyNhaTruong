import express from "express";
import cors from "cors";
import route from "./routes/route.js"
import mongoose from "mongoose";


const URI = "mongodb+srv://vhoi03:12345@quanlynhatruong.y7r9w.mongodb.net/QuanLyNhaTruong?retryWrites=true&w=majority&appName=QuanLyNhaTruong";
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/",route)

try {
    await mongoose.connect(URI);
    console.log("Connect to database successfully!")
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Sever is opening at http://localhost:${PORT}`);
})