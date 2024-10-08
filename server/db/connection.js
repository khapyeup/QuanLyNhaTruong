import { MongoClient } from "mongodb";

const URI = "mongodb+srv://khapyeu153:123456aA@quanlynhatruong.y7r9w.mongodb.net/?retryWrites=true&w=majority&appName=QuanLyNhaTruong";
const client = new MongoClient(URI);
async function connect() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } catch(err) {
        console.log("Cannot connect to MongoDB!" + err);
    }
}
connect();
export default client;