// "use client";
// import { useEffect, useState } from "react";
// import { auth, firebaseAuth } from "../../lib/firebase";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsub = firebaseAuth.onAuthStateChanged(auth, (u) => {
//       if (!u) router.push("/auth/login");
//       else setUser(u);
//     });
//     return () => unsub();
//   }, [router]);

//   if (!user) return null;

//   return (
//     <div className="space-y-4 text-center">
//       <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
//       <div className="space-x-4">
//         <button onClick={() => router.push("/practice")} className="bg-blue-500 text-white px-4 py-2 rounded">Practice MCQs</button>
//         <button onClick={() => router.push("/compiler")} className="bg-green-500 text-white px-4 py-2 rounded">Compiler</button>
//         <button onClick={() => router.push("/tutorials")} className="bg-purple-500 text-white px-4 py-2 rounded">Tutorials</button>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { auth, firebaseAuth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/auth/login");
      } else {
        setUser(u);

        // 🔹 Fetch role from Firestore (users collection)
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setRole(snap.data().role || "user"); // default = user
        } else {
          setRole("user");
        }
      }
    });
    return () => unsub();
  }, [router]);

  if (!user) return null;

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/practice")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Practice MCQs
        </button>
        <button
          onClick={() => router.push("/compiler")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Compiler
        </button>
        <button
          onClick={() => router.push("/tutorials")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Tutorials
        </button>

        {/* 🔹 Show Admin Panel button only if role === "admin" */}
        {role === "admin" && (
          <button
            onClick={() => router.push("/Admin")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
}
