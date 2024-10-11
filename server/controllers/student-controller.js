import { ObjectId } from "mongodb"
import client from "../db/connection.js"


const getStudentList = async (req, res) => {
    try {
        let result = await client.db("QuanLyNhaTruong").collection("student").find({}).toArray()
        console.log("getStudentList")
        if (result.length > 0)
            res.send(result)
        else
            res.send({message: "Không có học sinh nào"})
    } catch (error) {
        res.status(500).json(error)
    }
}

const addStudent = async (req, res) => {
    console.log("Add student: Req " + req.body)
    try {
        let result = await client.db("QuanLyNhaTruong").collection("student").insertOne(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteStudent = async (req, res) => {
    try {
        let result = await client.db("QuanLyNhaTruong").collection("student").deleteOne({_id: new ObjectId(req.params.id) })
        console.log("deleteStudent" + req.params.id)
        res.json(result)
    } catch(error) {
        res.status(500).json(error)
    }
}

const getDetailStudent = async (req, res) => {
    try {
        console.log("getStudentDetail")
        let id = req.params.id;
        let result = await client.db("QuanLyNhaTruong").collection("student").findOne({_id: new ObjectId(id)})
        if (result)
            res.send(result)
        else 
            res.send({message: "Không có học sinh có id này: " + id})
    } catch (error) {
        res.status(500).json(error)
    }
}
export {addStudent, getStudentList, deleteStudent, getDetailStudent}