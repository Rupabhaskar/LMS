"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CheckAdminAuth from "@/lib/CheckAdminAuth";
import { useRouter } from "next/navigation";

export default function StudentListPage() {
      const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    const snap = await getDocs(collection(db, "students"));
    setStudents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  async function handleDeleteStudent(id) {
    if (confirm("Delete this student?")) {
      await deleteDoc(doc(db, "students", id));
      fetchStudents();
    }
  }

  if (loading) {
    return (
      <CheckAdminAuth>
        <p className="text-center text-gray-600 mt-10">Loading students...</p>
      </CheckAdminAuth>
    );
  }

  return (
    <CheckAdminAuth>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
        <button
          onClick={() => router.back()}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          👨‍🎓 Students List
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Regd. No</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Course</th>
                  <th className="border p-2">Total Fee</th>
                  <th className="border p-2">Due</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="border p-2">{s.regdNo || "-"}</td>
                    <td className="border p-2">{s.studentName}</td>
                    <td className="border p-2">{s.email}</td>
                    <td className="border p-2">
                      {s.phone1 || s.phone2 || "-"}
                    </td>
                    <td className="border p-2">{s.courseTitle || "-"}</td>
                    <td className="border p-2">{s.totalFee || "-"}</td>
                    <td className="border p-2">{s.due || "-"}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDeleteStudent(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CheckAdminAuth>
  );
}
