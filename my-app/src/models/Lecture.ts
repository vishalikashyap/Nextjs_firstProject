import mongoose, { Schema, model, models } from "mongoose";

const lectureSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    video: { type: String }, 
    notes: { type: String }, 
  },
  { timestamps: true }
);

const Lecture = models.Lecture || model("Lecture", lectureSchema);
export default Lecture;
