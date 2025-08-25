"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db, firestoreHelpers } from "../../lib/firebase";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = firestoreHelpers.doc(db, "users", u.uid);
        const snap = await firestoreHelpers.getDoc(ref);
        setIsAdmin(snap.exists() && snap.data().role === "admin");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  function logout() {
    signOut(auth);
  }

  if (loading) return <div>Loading...</div>;
  if (!user || !isAdmin) return <div>Access Denied</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="Admin/mcqs">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            <h2 className="text-xl font-bold mb-2">Manage MCQs</h2>
            <p>Add, edit, and delete multiple-choice questions.</p>
          </div>
        </Link>

        <Link href="/Admin/coding">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            <h2 className="text-xl font-bold mb-2">Manage Coding Questions</h2>
            <p>Create and manage programming challenges.</p>
          </div>
        </Link>

        <Link href="/Admin/tutorials">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            <h2 className="text-xl font-bold mb-2">Manage Tutorials</h2>
            <p>Publish and update tutorials for learners.</p>
          </div>
        </Link>
         <Link href="/Admin/userManager">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            <h2 className="text-xl font-bold mb-2">Manage User</h2>
            <p>Mananing the Users</p>
          </div>
        </Link>
        <Link href="/Admin/StudentInfo">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer text-center">
            <h2 className="text-xl font-bold mb-2">View Details</h2>
            <p>Student Info</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
