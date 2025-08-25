"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import CheckAdminAuth from "@/lib/CheckAdminAuth";

export default function AdminPage() {
    const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", syllabus: "", courseCode: "" });
  const [newChapter, setNewChapter] = useState({ id: null, title: "", content: "", video: "" });
  const [newAssignment, setNewAssignment] = useState({ id: null, title: "", dueDate: "" });
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Fetch courses with chapters + assignments
  async function fetchCourses() {
    const snap = await getDocs(collection(db, "courses"));
    const courseList = [];

    for (const courseDoc of snap.docs) {
      const courseData = { id: courseDoc.id, ...courseDoc.data(), chapters: [], assignments: [] };

      const chapterSnap = await getDocs(collection(db, "courses", courseDoc.id, "chapters"));
      courseData.chapters = chapterSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const assignmentSnap = await getDocs(collection(db, "courses", courseDoc.id, "assignments"));
      courseData.assignments = assignmentSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      courseList.push(courseData);
    }

    setCourses(courseList);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add or Update Course
  async function handleAddOrUpdateCourse(e) {
    e.preventDefault();
    const syllabusArray = newCourse.syllabus.split(",").map((s) => s.trim());
    if (newCourse.id) {
      await updateDoc(doc(db, "courses", newCourse.id), {
        title: newCourse.title,
        description: newCourse.description,
        courseCode: newCourse.courseCode,
        syllabus: syllabusArray
      });
    } else {
      await addDoc(collection(db, "courses"), {
        title: newCourse.title,
        description: newCourse.description,
        courseCode: newCourse.courseCode,
        syllabus: syllabusArray
      });
    }
    setNewCourse({ title: "", description: "", syllabus: "", courseCode: "" });
    fetchCourses();
  }

  async function handleDeleteCourse(id) {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteDoc(doc(db, "courses", id));
      fetchCourses();
    }
  }

  // Add or Update Chapter
  async function handleAddOrUpdateChapter(courseId, e) {
    e.preventDefault();
    if (newChapter.id) {
      await updateDoc(doc(db, "courses", courseId, "chapters", newChapter.id), {
        title: newChapter.title,
        content: newChapter.content,
        video: newChapter.video
      });
    } else {
      await addDoc(collection(db, "courses", courseId, "chapters"), {
        title: newChapter.title,
        content: newChapter.content,
        video: newChapter.video
      });
    }
    setNewChapter({ id: null, title: "", content: "", video: "" });
    fetchCourses();
  }

  async function handleDeleteChapter(courseId, chapterId) {
    if (confirm("Delete this chapter?")) {
      await deleteDoc(doc(db, "courses", courseId, "chapters", chapterId));
      fetchCourses();
    }
  }

  // Add or Update Assignment
  async function handleAddOrUpdateAssignment(courseId, e) {
    e.preventDefault();
    if (newAssignment.id) {
      await updateDoc(doc(db, "courses", courseId, "assignments", newAssignment.id), {
        title: newAssignment.title,
        dueDate: newAssignment.dueDate
      });
    } else {
      await addDoc(collection(db, "courses", courseId, "assignments"), {
        title: newAssignment.title,
        dueDate: newAssignment.dueDate
      });
    }
    setNewAssignment({ id: null, title: "", dueDate: "" });
    fetchCourses();
  }

  async function handleDeleteAssignment(courseId, assignmentId) {
    if (confirm("Delete this assignment?")) {
      await deleteDoc(doc(db, "courses", courseId, "assignments", assignmentId));
      fetchCourses();
    }
  }

  return (
    <CheckAdminAuth>
    <div className="p-8 bg-gray-100 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        ⬅ Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add / Edit Course */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{newCourse.id ? "Edit Course" : "Add New Course"}</h2>
        <form onSubmit={handleAddOrUpdateCourse} className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Course Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Course Code (Unique)" value={newCourse.courseCode} onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })} />
          <textarea className="border p-2 rounded col-span-2" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
          <textarea className="border p-2 rounded col-span-2" placeholder="Syllabus (comma separated)" value={newCourse.syllabus} onChange={(e) => setNewCourse({ ...newCourse, syllabus: e.target.value })} />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">{newCourse.id ? "Update Course" : "Add Course"}</button>
        </form>
      </div>

      {/* Course List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Courses</h2>
        {courses.map((course) => (
          <div key={course.id} className="border rounded p-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm">{course.description}</p>
                <p className="text-xs text-gray-500">Code: {course.courseCode}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => setNewCourse(course)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setSelectedCourseId(selectedCourseId === course.id ? null : course.id)}>{selectedCourseId === course.id ? "Hide" : "View"}</button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCourseId === course.id && (
              <div className="mt-4">
                {/* Chapters */}
                <h4 className="font-semibold">Chapters</h4>
                {course.chapters.map((ch) => (
                  <div key={ch.id} className="border p-3 rounded mb-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">{ch.title}</p>
                        <p className="text-sm text-gray-600">{ch.content}</p>
                        {ch.video && <a href={ch.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch Video</a>}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-yellow-600" onClick={() => setNewChapter(ch)}>Edit</button>
                        <button className="text-red-600" onClick={() => handleDeleteChapter(course.id, ch.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Chapter Form */}
                <form onSubmit={(e) => handleAddOrUpdateChapter(course.id, e)} className="grid grid-cols-2 gap-2 mt-2">
                  <input className="border p-2 rounded" placeholder="Chapter Title" value={newChapter.title} onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })} />
                  <input className="border p-2 rounded" placeholder="Video URL" value={newChapter.video} onChange={(e) => setNewChapter({ ...newChapter, video: e.target.value })} />
                  <textarea className="border p-2 rounded col-span-2" placeholder="Content" value={newChapter.content} onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })} />
                  <button className="bg-green-500 text-white px-4 py-2 rounded col-span-2">{newChapter.id ? "Update Chapter" : "Add Chapter"}</button>
                </form>

                {/* Assignments */}
                <h4 className="font-semibold mt-4">Assignments</h4>
                {course.assignments.map((a) => (
                  <div key={a.id} className="border p-3 rounded mb-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">{a.title}</p>
                        <p className="text-sm text-gray-600">Due: {a.dueDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-yellow-600" onClick={() => setNewAssignment(a)}>Edit</button>
                        <button className="text-red-600" onClick={() => handleDeleteAssignment(course.id, a.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Assignment Form */}
                <form onSubmit={(e) => handleAddOrUpdateAssignment(course.id, e)} className="grid grid-cols-2 gap-2 mt-2">
                  <input className="border p-2 rounded" placeholder="Assignment Title" value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} />
                  <input type="date" className="border p-2 rounded" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })} />
                  <button className="bg-purple-500 text-white px-4 py-2 rounded col-span-2">{newAssignment.id ? "Update Assignment" : "Add Assignment"}</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </CheckAdminAuth>
  );
}
