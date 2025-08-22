import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Lecture from "@/models/Lecture";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

// --- helpers for saving uploaded files (same as in POST) ---
const ensureUploadDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const saveWebFile = async (file: File | null, subdir = "uploads") => {
  if (!file) return undefined;
  const uploadDir = path.join(process.cwd(), "public", subdir);
  ensureUploadDir(uploadDir);

  const safeName = file.name.replace(/[^\w.\-]/g, "_");
  const filename = `${Date.now()}-${safeName}`;
  const filepath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);

  return `/${subdir}/${filename}`;
};

const getString = (v: FormDataEntryValue | null): string => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return "";
};

// =================== GET one by id ===================
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const lecture = await Lecture.findById(params.id);
    if (!lecture) {
      return NextResponse.json(
        { success: false, error: "Lecture not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, lecture });
  } catch (error) {
    console.error("GET lecture error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid ID" },
      { status: 400 }
    );
  }
}

// =================== UPDATE by id ===================
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const form = await req.formData();

    // text fields (optional)
    const updateData: any = {};
    ["title","subject","teacher","date","time","duration","description","link"].forEach((key) => {
      const val = getString(form.get(key));
      if (val) updateData[key] = val;
    });

    // handle optional new files
    const videoFile = form.get("video") as File | null;
    const notesFile = form.get("notes") as File | null;

    if (videoFile && videoFile.size > 0) {
      updateData.video = await saveWebFile(videoFile, "uploads");
    }
    if (notesFile && notesFile.size > 0) {
      updateData.notes = await saveWebFile(notesFile, "uploads");
    }

    const updated = await Lecture.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lecture not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lecture: updated });
  } catch (err) {
    console.error("Update lecture error:", err);
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}

// =================== DELETE by id ===================
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const deleted = await Lecture.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lecture not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete lecture error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 400 });
  }
}
