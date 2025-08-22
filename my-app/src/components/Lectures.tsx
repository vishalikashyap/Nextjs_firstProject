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
    const [formData, setFormData] = useState<Omit<Lecture, "_id"> & { videoFile?: File; notesFile?: File }>({
        title: "",
        subject: "",
        teacher: "",
        date: "",
        time: "",
        duration: "",
        description: "",
        link: "",
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            ? await fetch(`/api/auth/lectures/${editingId}`, { method: "PUT", body: fd })
            : await fetch("/api/auth/lectures", { method: "POST", body: fd });

        if (!res.ok) return;
        const data: ApiResponse<Lecture> = await res.json();
        if (data.success && data.lecture) {
            if (editingId) {
                setLectures((prev) => prev.map((lec) => (lec._id === editingId ? data.lecture! : lec)));
                setEditingId(null);
            } else {
                setLectures((prev) => [data.lecture!, ...prev]);
            }
        }

        // Reset form & close modal
        setFormData({
            title: "",
            subject: "",
            teacher: "",
            date: "",
            time: "",
            duration: "",
            description: "",
            link: "",
            videoFile: undefined,
            notesFile: undefined,
        });
        setShowModal(false);
    };

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/auth/lectures/${id}`, { method: "DELETE" });
        if (!res.ok) return;
        const data: ApiResponse<Lecture> = await res.json();
        if (data.success) setLectures((prev) => prev.filter((lec) => lec._id !== id));
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
            videoFile: undefined,
            notesFile: undefined,
        });
        setEditingId(lecture._id);
        setShowModal(true);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Lecture Dashboard</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-5 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                >
                    + Add Lecture
                </button>
            </header>

            {/* Lecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lectures.map((lecture) => (
                    <div key={lecture._id} className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{lecture.title}</h2>
                            <p className="text-sm text-gray-500 mt-1">{lecture.subject} — {lecture.teacher}</p>
                            <p className="text-xs text-gray-400 mt-1">{lecture.date} at {lecture.time} ({lecture.duration})</p>
                            <p className="mt-3 text-gray-700">{lecture.description}</p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <a href={lecture.link} target="_blank" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Join Lecture</a>
                            {lecture.video && <a href={lecture.video} target="_blank" className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">Watch Video</a>}
                            {lecture.notes && <a href={lecture.notes} target="_blank" className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm">Download Notes</a>}
                        </div>

                        <div className="mt-4 flex justify-end gap-3">
                            <button onClick={() => handleEdit(lecture)} className="text-yellow-500 font-semibold hover:underline">Edit</button>
                            <button onClick={() => handleDelete(lecture._id)} className="text-red-500 font-semibold hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-end bg-opacity-50" style={{ background: 'rgb(0 0 0 / 62%)' }}>
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative shadow-xl animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Lecture" : "Add Lecture"}</h2>
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => { setShowModal(false); setEditingId(null); }}
                        >
                            ✕
                        </button>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-2"
                                required
                            />
                            <input
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="teacher"
                                value={formData.teacher}
                                onChange={handleChange}
                                placeholder="Teacher"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Duration"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-2"
                            />
                            <input
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="Lecture Link"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-2"
                            />

                            {/* Video File Input */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-gray-700 font-semibold">Upload Video</label>
                                <label className="flex items-center justify-between bg-gray-100 p-3 cursor-pointer hover:bg-gray-200 transition">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm5 1v4l3-2-3-2z" />
                                        </svg>
                                        <span className="text-gray-600">{formData.videoFile ? formData.videoFile.name : "Choose a video file..."}</span>
                                    </div>
                                    <input
                                        type="file"
                                        name="videoFile"
                                        accept="video/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className="px-4 py-1 bg-blue-600 text-white font-medium hover:bg-blue-700 transition rounded">Browse</span>
                                </label>
                            </div>

                            {/* Notes File Input */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-gray-700 font-semibold">Upload Notes (PDF)</label>
                                <label className="flex items-center justify-between bg-gray-100 p-3 cursor-pointer hover:bg-gray-200 transition">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2H8zm0 2h4v12H8V4zm2 1a1 1 0 00-.993.883L9 6v3H6a1 1 0 00-.117 1.993L6 11h3v3a1 1 0 001.993.117L11 14v-3h3a1 1 0 00.117-1.993L14 9h-3V6a1 1 0 00-1-1z" />
                                        </svg>
                                        <span className="text-gray-600">{formData.notesFile ? formData.notesFile.name : "Choose a PDF file..."}</span>
                                    </div>
                                    <input
                                        type="file"
                                        name="notesFile"
                                        accept="application/pdf"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className="px-4 py-1 bg-purple-600 text-white font-medium hover:bg-purple-700 transition rounded">Browse</span>
                                </label>
                            </div>


                            {/* Submit + Cancel Buttons */}
                            <div className="col-span-2 flex justify-between gap-2 mt-2">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                                >
                                    {editingId ? "Update Lecture" : "Add Lecture"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); setEditingId(null); }}
                                    className="flex-1 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
        </div>
    );
}
