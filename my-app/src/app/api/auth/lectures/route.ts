import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lecture from "@/models/Lecture";
import { writeFile } from "fs/promises";
import path from "path";

// GET all lectures
export async function GET() {
  try {
    await connectDB();
    const lectures = await Lecture.find({});
    return NextResponse.json({ success: true, lectures });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST new lecture with video/notes upload
export async function POST(req: Request) {
  try {
    await connectDB();

    // Parse FormData
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const teacher = formData.get("teacher") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const duration = formData.get("duration") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
     const className = formData.get("className") as string; 

    let videoUrl = "";
    let notesUrl = "";

    // --- Save Video ---
    const videoFile = formData.get("video") as File | null;
    if (videoFile) {
      const bytes = Buffer.from(await videoFile.arrayBuffer());
      const filePath = path.join(process.cwd(), "public/uploads", videoFile.name);
      await writeFile(filePath, bytes);
      videoUrl = `/uploads/${videoFile.name}`;
    }

    // --- Save Notes ---
    const notesFile = formData.get("notes") as File | null;
    if (notesFile) {
      const bytes = Buffer.from(await notesFile.arrayBuffer());
      const filePath = path.join(process.cwd(), "public/uploads", notesFile.name);
      await writeFile(filePath, bytes);
      notesUrl = `/uploads/${notesFile.name}`;
    }

    const newLecture = await Lecture.create({
      title,
      subject,
      teacher,
      date,
      time,
      duration,
      description,
      link,
      className,
      video: videoUrl,
      notes: notesUrl,
    });

    return NextResponse.json({ success: true, lecture: newLecture });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
