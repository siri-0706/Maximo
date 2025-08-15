import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quadrant: { type: String, enum: ["Q1","Q2","Q3","Q4"], default: "Q2" }, // Eisenhower
  done: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Task", TaskSchema);
