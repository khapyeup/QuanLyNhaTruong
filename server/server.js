import express from "express";
import cors from "cors";
import route from "./routes/route.js"


const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/",route)

app.listen(PORT, () => {
    console.log(`Sever is opening at http://localhost:${PORT}`);
})