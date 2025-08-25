// "use client";
// import { useEffect, useState } from "react";
// import { db } from "../../../lib/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import Link from "next/link";

// export default function CodingQuestionsPage() {
//   const difficulties = ["easy", "medium", "hard"];
//   const [difficulty, setDifficulty] = useState("easy");
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     async function fetchQuestions() {
//       const q = query(
//         collection(db, "codingQuestions"),
//         where("difficulty", "==", difficulty)
//       );
//       const snap = await getDocs(q);
//       setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//     }
//     fetchQuestions();
//   }, [difficulty]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <Link href="/practice">
//           <button className="bg-gray-500 text-white px-4 py-2 rounded">
//             Back
//           </button>
//         </Link>
//         <h1 className="text-2xl font-bold">Coding Questions</h1>
//       </div>

//       {/* Difficulty Selection */}
//       <div className="flex space-x-4 mb-6">
//         {difficulties.map((diff) => (
//           <button
//             key={diff}
//             onClick={() => setDifficulty(diff)}
//             className={`px-4 py-2 rounded font-semibold ${
//               difficulty === diff
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-black"
//             }`}
//           >
//             {diff.charAt(0).toUpperCase() + diff.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Questions List */}
//       {questions.length === 0 ? (
//         <p>No questions available.</p>
//       ) : (
//         <div className="space-y-4">
//           {questions.map((q, idx) => (
//             <div
//               key={q.id}
//               className="bg-white p-4 rounded shadow border"
//             >
//               <h2 className="font-semibold mb-2">
//                 {idx + 1}. {q.title}
//               </h2>
//               <pre className="bg-gray-100 p-3 rounded mb-2 text-sm overflow-x-auto">
//                 {q.description}
//               </pre>
//               <p className="text-gray-600">
//                 Difficulty:{" "}
//                 <span className="font-bold capitalize">{q.difficulty}</span>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import CheckAuth from "@/lib/CheckAuth";

export default function CodingQuestionsPage() {
  const difficulties = ["easy", "medium", "hard"];
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const q = query(
        collection(db, "questions"),
        where("category", "==", difficulty.charAt(0).toUpperCase() + difficulty.slice(1))
      );
      const snap = await getDocs(q);
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    fetchQuestions();
  }, [difficulty]);

  return (
    <CheckAuth>
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link href="/practice">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            Back
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Coding Questions</h1>
      </div>

      {/* Difficulty Selection */}
      <div className="flex space-x-4 mb-6">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setDifficulty(diff)}
            className={`px-4 py-2 rounded font-semibold ${
              difficulty === diff
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white p-4 rounded shadow border">
              <h2 className="font-semibold mb-2">
                {idx + 1}. {q.title}
              </h2>
              <p className="text-gray-700 mb-2">
                Solvers: <span className="font-bold">{q.solvers || 0}</span>
              </p>
             <Link href={`/practice/coding-questions/${q.id}`}>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Solve
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </CheckAuth>
  );
}
