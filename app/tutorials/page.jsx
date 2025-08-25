"use client";

import Link from "next/link";
import { db, firestoreHelpers } from "../../lib/firebase";
import { useEffect, useState } from "react";
import CheckAuth from "@/lib/CheckAuth";

export default function TutorialsPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const snap = await firestoreHelpers.getDocs(firestoreHelpers.collection(db, "courses"));
      setCourses(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchCourses();
  }, []);

  return (
    <CheckAuth>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/tutorials/${course.id}`}>
            <div className="border p-4 rounded hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </CheckAuth>
  );
}
