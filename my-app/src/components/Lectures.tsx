"use client";

import React, { useEffect, useState } from "react";

type Lecture = {
  _id: string;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  link: string;
  video?: string;
  className: string;
  notes?: string;
};

type ApiResponse<T> = {
  success: boolean;
  lecture?: T;
  lectures?: T[];
  error?: string;
};

export default function Lectures() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<
    Omit<Lecture, "_id"> & { videoFile?: File; notesFile?: File }
  >({
    title: "",
    subject: "",
    teacher: "",
    date: "",
    time: "",
    duration: "",
    description: "",
    link: "",
    className: "",
    videoFile: undefined,
    notesFile: undefined,
  });

  const fetchLectures = async () => {
    const res = await fetch("/api/auth/lectures");
    if (!res.ok) return;
    const data: ApiResponse<Lecture> = await res.json();
    if (data.success && data.lectures) setLectures(data.lectures);
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) fd.append(key, value as any);
    });

    const res = editingId
      ? await fetch(`/api/auth/lectures/${editingId}`, {
          method: "PUT",
          body: fd,
        })
      : await fetch("/api/auth/lectures", {
          method: "POST",
          body: fd,
        });

    if (!res.ok) return;
    const data: ApiResponse<Lecture> = await res.json();
    if (data.success && data.lecture) {
      if (editingId) {
        setLectures((prev) =>
          prev.map((lec) => (lec._id === editingId ? data.lecture! : lec))
        );
        setEditingId(null);
      } else {
        setLectures((prev) => [data.lecture!, ...prev]);
      }
    }

    // Reset form
    setFormData({
      title: "",
      subject: "",
      teacher: "",
      date: "",
      time: "",
      duration: "",
      description: "",
      link: "",
      className: "",
      videoFile: undefined,
      notesFile: undefined,
    });
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/auth/lectures/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    const data: ApiResponse<Lecture> = await res.json();
    if (data.success)
      setLectures((prev) => prev.filter((lec) => lec._id !== id));
  };

  const handleEdit = (lecture: Lecture) => {
    setFormData({
      title: lecture.title,
      subject: lecture.subject,
      teacher: lecture.teacher,
      date: lecture.date,
      time: lecture.time,
      duration: lecture.duration,
      description: lecture.description,
      link: lecture.link,
      className: lecture.className,
      videoFile: undefined,
      notesFile: undefined,
    });
    setEditingId(lecture._id);
    setShowModal(true);
  };

  return (
    <div className="h-screen flex flex-col max-w-6xl mx-auto overflow-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lecture Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
        >
          + Add Lecture
        </button>
      </header>

      {/* Scrollable Lecture Listing */}
      <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-6" style={{marginBottom: "5rem"}}>
        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{lecture.title}</h2>
              {lecture.subject} — {lecture.teacher} |{" "}
              <span className="font-medium">{lecture.className}</span>
              <p className="text-xs text-gray-400 mt-1">
                {lecture.date} at {lecture.time} ({lecture.duration})
              </p>
              <p className="mt-3 text-gray-700">{lecture.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={lecture.link}
                target="_blank"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Join Lecture
              </a>
              {lecture.video && (
                <a
                  href={lecture.video}
                  target="_blank"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Watch Video
                </a>
              )}
              {lecture.notes && (
                <a
                  href={lecture.notes}
                  target="_blank"
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                >
                  Download Notes
                </a>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => handleEdit(lecture)}
                className="text-yellow-500 font-semibold hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(lecture._id)}
                className="text-red-500 font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
  {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="bg-white rounded w-full max-w-2xl relative shadow-xl animate-slideIn max-h-[100vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 px-6 pt-6">
        {editingId ? "Edit Lecture" : "Add Lecture"}
      </h2>
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setShowModal(false);
          setEditingId(null);
        }}
      >
        ✕
      </button>

      {/* Scrollable Form Body */}
      <div className="overflow-y-auto px-6 pb-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-3 rounded col-span-2"
            required
          />
          <input
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Class"
            className="border p-3 rounded col-span-2"
            required
          />
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border p-3 rounded"
          />
          <input
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            placeholder="Teacher"
            className="border p-3 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-3 rounded"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-3 rounded"
          />
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="border p-3 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded col-span-2"
          />
          <input
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Lecture Link"
            className="border p-3 rounded col-span-2"
          />

          {/* Video File */}
          <div className="col-span-2">
            <label className="block mb-2 font-semibold">Upload Video</label>
            <label className="flex justify-between items-center bg-gray-100 p-3 cursor-pointer hover:bg-gray-200">
              <span>
                {formData.videoFile?.name || "Choose a video file..."}
              </span>
              <input
                type="file"
                name="videoFile"
                accept="video/*"
                onChange={handleChange}
                className="hidden"
              />
              <span className="px-4 py-1 bg-blue-600 text-white rounded">
                Browse
              </span>
            </label>
          </div>

          {/* Notes File */}
          <div className="col-span-2">
            <label className="block mb-2 font-semibold">Upload Notes (PDF)</label>
            <label className="flex justify-between items-center bg-gray-100 p-3 cursor-pointer hover:bg-gray-200">
              <span>
                {formData.notesFile?.name || "Choose a PDF file..."}
              </span>
              <input
                type="file"
                name="notesFile"
                accept="application/pdf"
                onChange={handleChange}
                className="hidden"
              />
              <span className="px-4 py-1 bg-purple-600 text-white rounded">
                Browse
              </span>
            </label>
          </div>

          <div className="col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? "Update Lecture" : "Add Lecture"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
              }}
              className="flex-1 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
