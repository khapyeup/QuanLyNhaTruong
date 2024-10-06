import express from "express";
import cors from "cors";
import client from "./db/connection.js"

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    let collection = await client.db("QuanLyNhaTruong").collection("taikhoan");
    let results = await collection.find({}).toArray();
    res.send(results);
})

app.listen(PORT, () => {
    console.log(`Sever is opening at http://localhost:${PORT}`);
})