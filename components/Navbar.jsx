"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, firebaseAuth } from "../lib/firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <nav className="flex justify-between items-center bg-white shadow p-4">
      <div className="space-x-4">
        <Link href="/" className="text-blue-600 font-bold">Home</Link>
        {user && (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/practice" className="hover:underline">Practice</Link>
            <Link href="/compiler" className="hover:underline">Compiler</Link>
            <Link href="/tutorials" className="hover:underline">Tutorials</Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <button
            onClick={() => firebaseAuth.logout()}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/auth/login" className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Login</Link>
            <Link href="/auth/register" className="bg-green-500 text-white px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
