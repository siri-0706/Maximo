import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Task from "./models/Task.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);

// routes
app.get("/api/tasks", async (_req,res)=> res.json(await Task.find().sort("-createdAt")));
app.post("/api/tasks", async (req,res)=> res.json(await Task.create(req.body)));
app.patch("/api/tasks/:id", async (req,res)=> res.json(await Task.findByIdAndUpdate(req.params.id, req.body, {new:true})));
app.delete("/api/tasks/:id", async (req,res)=> res.json(await Task.findByIdAndDelete(req.params.id)));

app.listen(process.env.PORT, ()=> console.log("API on", process.env.PORT));
