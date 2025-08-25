
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CheckAuth from "@/lib/CheckAuth";

export default function PracticePage() {
  const router = useRouter();
  const categories = ["java", "python", "c", "html", "javascript", "coding"];
  const [mcqs, setMcqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Fetch MCQs when category changes (except coding)
  useEffect(() => {
    if (!selectedCategory) return;
    async function fetchMCQs() {
      const q = query(
        collection(db, "mcqs"),
        where("category", "==", selectedCategory)
      );
      const snap = await getDocs(q);
      let questions = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Shuffle randomly
      questions = questions.sort(() => 0.5 - Math.random());

      setMcqs(questions);
      setAnswers({});
      setShowResult(false);
    }
    fetchMCQs();
  }, [selectedCategory]);

  function handleOptionSelect(qId, option) {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  }

  function handleSubmit() {
    setShowResult(true);
  }

  return (
    <CheckAuth>
    <div className="p-6 bg-gray-100 min-h-screen">
      {!selectedCategory ? (
        // Category selection
        <div>
          <h1 className="text-2xl font-bold mb-4">Choose a Category</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "coding") {
                    router.push("/practice/coding-questions");
                  } else {
                    setSelectedCategory(cat);
                  }
                }}
                className="bg-blue-500 text-white p-6 rounded-lg shadow hover:bg-blue-600 text-lg font-semibold"
              >
                {cat === "coding" ? "Coding Questions" : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // MCQ quiz view
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              {selectedCategory.toUpperCase()} MCQs
            </h1>
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>

          <div className="space-y-6">
            {mcqs.map((q, idx) => (
              <div
                key={q.id}
                className="border p-4 rounded bg-white shadow"
              >
                <div className="font-semibold mb-2">
                  {idx + 1}. {q.question}
                </div>
                {q.options.map((opt, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt}
                      onChange={() => handleOptionSelect(q.id, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
                {showResult && (
                  <div
                    className={`mt-2 font-bold ${
                      q.answer === answers[q.id]
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Correct Answer: {q.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showResult && mcqs.length > 0 && (
            <button
              onClick={handleSubmit}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded text-lg font-semibold"
            >
              Submit
            </button>
          )}

          {showResult && (
            <div className="mt-6 p-4 bg-gray-200 rounded">
              <h2 className="text-xl font-bold">Your Result</h2>
              <p>
                Score:{" "}
                {Object.keys(answers).filter(
                  (id) =>
                    mcqs.find((q) => q.id === id)?.answer === answers[id]
                ).length}{" "}
                / {mcqs.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
    </CheckAuth>
  );
}





// "use client";
// import { useEffect, useState } from "react";
// import { db } from "../../lib/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// export default function PracticePage() {
//   const categories = ["java", "python", "c", "html", "javascript"];
//   const [mcqs, setMcqs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [showResult, setShowResult] = useState(false);

//   // Fetch MCQs when category changes
//   useEffect(() => {
//     if (!selectedCategory) return;
//     async function fetchMCQs() {
//       const q = query(
//         collection(db, "mcqs"),
//         where("category", "==", selectedCategory)
//       );
//       const snap = await getDocs(q);
//       let questions = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//       // Shuffle randomly
//       questions = questions.sort(() => 0.5 - Math.random());

//       setMcqs(questions);
//       setAnswers({});
//       setShowResult(false);
//     }
//     fetchMCQs();
//   }, [selectedCategory]);

//   function handleOptionSelect(qId, option) {
//     setAnswers((prev) => ({
//       ...prev,
//       [qId]: option,
//     }));
//   }

//   function handleSubmit() {
//     setShowResult(true);
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {!selectedCategory ? (
//         // Category selection
//         <div>
//           <h1 className="text-2xl font-bold mb-4">Choose a Category</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className="bg-blue-500 text-white p-6 rounded-lg shadow hover:bg-blue-600 text-lg font-semibold"
//               >
//                 {cat.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         // MCQ list
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold">
//               {selectedCategory.toUpperCase()} MCQs
//             </h1>
//             <button
//               onClick={() => setSelectedCategory(null)}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           </div>

//           <div className="space-y-6">
//             {mcqs.map((q, idx) => (
//               <div
//                 key={q.id}
//                 className="border p-4 rounded bg-white shadow"
//               >
//                 <div className="font-semibold mb-2">
//                   {idx + 1}. {q.question}
//                 </div>
//                 {q.options.map((opt, i) => (
//                   <label key={i} className="block">
//                     <input
//                       type="radio"
//                       name={q.id}
//                       checked={answers[q.id] === opt}
//                       onChange={() => handleOptionSelect(q.id, opt)}
//                       className="mr-2"
//                     />
//                     {opt}
//                   </label>
//                 ))}
//                 {showResult && (
//                   <div
//                     className={`mt-2 font-bold ${
//                       q.answer === answers[q.id]
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     Correct Answer: {q.answer}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {!showResult && mcqs.length > 0 && (
//             <button
//               onClick={handleSubmit}
//               className="mt-6 bg-green-600 text-white px-6 py-2 rounded text-lg font-semibold"
//             >
//               Submit
//             </button>
//           )}

//           {showResult && (
//             <div className="mt-6 p-4 bg-gray-200 rounded">
//               <h2 className="text-xl font-bold">Your Result</h2>
//               <p>
//                 Score:{" "}
//                 {Object.keys(answers).filter(
//                   (id) =>
//                     mcqs.find((q) => q.id === id)?.answer === answers[id]
//                 ).length}{" "}
//                 / {mcqs.length}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
