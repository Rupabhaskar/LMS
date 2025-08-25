

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { db } from "@/lib/firebase";
// // import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

// // export default function ProblemPage() {
// //   const { id } = useParams();
// //   const [problem, setProblem] = useState(null);
// //   const [code, setCode] = useState("// Write your code here");
// //   const [languageId, setLanguageId] = useState(54); // 54 = C++ (GCC 9.2.0)
// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Judge0 credentials from .env.local
// //   const JUDGE0_URL = process.env.NEXT_PUBLIC_JUDGE0_URL;
// //   const JUDGE0_KEY = process.env.NEXT_PUBLIC_JUDGE0_RAPIDAPI_KEY;
// //   const JUDGE0_HOST = process.env.NEXT_PUBLIC_JUDGE0_RAPIDAPI_HOST;

// //   useEffect(() => {
// //     async function fetchProblem() {
// //       const ref = doc(db, "questions", id); // ✅ use correct collection name
// //       const snap = await getDoc(ref);
// //       if (snap.exists()) {
// //         setProblem({ id: snap.id, ...snap.data() });
// //       }
// //     }
// //     if (id) fetchProblem();
// //   }, [id]);

// //   async function runCode(testCases) {
// //     setLoading(true);
// //     let allResults = [];

// //     for (let tc of testCases) {
// //       const submissionRes = await fetch(
// //         `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "content-type": "application/json",
// //             "X-RapidAPI-Key": JUDGE0_KEY,
// //             "X-RapidAPI-Host": JUDGE0_HOST,
// //           },
// //           body: JSON.stringify({
// //             source_code: code,
// //             language_id: languageId,
// //             stdin: tc.input,
// //             expected_output: tc.output,
// //           }),
// //         }
// //       );

// //       const submissionData = await submissionRes.json();
// //       allResults.push({
// //         input: tc.input,
// //         expected: tc.output,
// //         output: submissionData.stdout?.trim() || "",
// //         status: submissionData.status?.description,
// //         pass: submissionData.status?.description === "Accepted",
// //       });
// //     }

// //     setResults(allResults);
// //     setLoading(false);
// //     return allResults;
// //   }

// //   async function handleRun() {
// //     if (!problem) return;
// //     await runCode(problem.testCases.filter((tc) => !tc.hidden));
// //   }

// //   async function handleSubmit() {
// //     if (!problem) return;
// //     const res = await runCode(problem.testCases);
// //     if (res.every((r) => r.pass)) {
// //       const ref = doc(db, "questions", id); // ✅ update correct collection
// //       await updateDoc(ref, { solvers: increment(1) });
// //       alert("✅ All test cases passed! Problem solved.");
// //     } else {
// //       alert("❌ Some test cases failed. Try again!");
// //     }
// //   }

// //   if (!problem) return <p className="p-6">Loading...</p>;

// //   return (
// //     <div className="p-6 bg-gray-100 min-h-screen">
// //       <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
// //       <pre className="bg-white p-4 rounded border mb-4 whitespace-pre-wrap">
// //         {problem.description}
// //       </pre>

// //       <h2 className="text-lg font-semibold mb-2">Visible Test Cases</h2>
// //       <ul className="mb-4">
// //         {problem.testCases
// //           .filter((tc) => !tc.hidden)
// //           .map((tc, idx) => (
// //             <li key={idx} className="bg-gray-200 p-2 rounded mb-2">
// //               <p>
// //                 <strong>Input:</strong> {tc.input}
// //               </p>
// //               <p>
// //                 <strong>Output:</strong> {tc.output}
// //               </p>
// //             </li>
// //           ))}
// //       </ul>

// //       <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
// //       <textarea
// //         value={code}
// //         onChange={(e) => setCode(e.target.value)}
// //         rows={10}
// //         className="w-full border border-gray-300 rounded p-2 mb-4 font-mono"
// //       ></textarea>

// //       <div className="space-x-2">
// //         <button
// //           onClick={handleRun}
// //           disabled={loading}
// //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
// //         >
// //           {loading ? "Running..." : "Run Code"}
// //         </button>
// //         <button
// //           onClick={handleSubmit}
// //           disabled={loading}
// //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
// //         >
// //           {loading ? "Submitting..." : "Submit"}
// //         </button>
// //       </div>

// //       {results.length > 0 && (
// //         <div className="mt-6">
// //           <h3 className="font-bold mb-2">Results</h3>
// //           {results.map((r, idx) => (
// //             <div
// //               key={idx}
// //               className={`p-3 rounded mb-2 ${
// //                 r.pass ? "bg-green-100" : "bg-red-100"
// //               }`}
// //             >
// //               <p>
// //                 <strong>Input:</strong> {r.input}
// //               </p>
// //               <p>
// //                 <strong>Expected:</strong> {r.expected}
// //               </p>
// //               <p>
// //                 <strong>Output:</strong> {r.output}
// //               </p>
// //               <p>
// //                 <strong>Status:</strong> {r.status}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { db } from "@/lib/firebase";
// import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

// export default function ProblemPage() {
//   const { id } = useParams();
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("// Write your code here");
//   const [languageId, setLanguageId] = useState(54); // Default C++
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const JUDGE0_URL = process.env.NEXT_PUBLIC_JUDGE0_URL;
//   const JUDGE0_KEY = process.env.NEXT_PUBLIC_JUDGE0_RAPIDAPI_KEY;
//   const JUDGE0_HOST = process.env.NEXT_PUBLIC_JUDGE0_RAPIDAPI_HOST;

//   useEffect(() => {
//     async function fetchProblem() {
//       const ref = doc(db, "questions", id); // <-- Make sure it's your correct collection
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         setProblem({ id: snap.id, ...snap.data() });
//       }
//     }
//     fetchProblem();
//   }, [id]);

//   async function runCode(testCases) {
//     setLoading(true);
//     let allResults = [];

//     for (let tc of testCases) {
//       const submissionRes = await fetch(
//         `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             "X-RapidAPI-Key": JUDGE0_KEY,
//             "X-RapidAPI-Host": JUDGE0_HOST,
//           },
//           body: JSON.stringify({
//             source_code: code,
//             language_id: languageId,
//             stdin: tc.input,
//             expected_output: tc.output,
//           }),
//         }
//       );

//       const submissionData = await submissionRes.json();
//       allResults.push({
//         input: tc.input,
//         expected: tc.output,
//         output: submissionData.stdout?.trim(),
//         status: submissionData.status?.description,
//         pass: submissionData.status?.description === "Accepted",
//       });
//     }

//     setResults(allResults);
//     setLoading(false);
//     return allResults;
//   }

//   async function handleRun() {
//     await runCode(problem.testCases.filter((tc) => !tc.hidden));
//   }

//   async function handleSubmit() {
//     const res = await runCode(problem.testCases);
//     if (res.every((r) => r.pass)) {
//       const ref = doc(db, "questions", id);
//       await updateDoc(ref, { solvers: increment(1) });
//       alert("✅ All test cases passed! Problem solved.");
//     } else {
//       alert("❌ Some test cases failed. Try again!");
//     }
//   }

//   if (!problem) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
//       <pre className="bg-white p-4 rounded border mb-4 whitespace-pre-wrap">
//         {problem.description}
//       </pre>

//       <h2 className="text-lg font-semibold mb-2">Test Cases</h2>
//       <ul className="mb-4">
//         {problem.testCases
//           .filter((tc) => !tc.hidden)
//           .map((tc, idx) => (
//             <li key={idx} className="bg-gray-200 p-2 rounded mb-2">
//               <p>
//                 <strong>Input:</strong> {tc.input}
//               </p>
//               <p>
//                 <strong>Output:</strong> {tc.output}
//               </p>
//             </li>
//           ))}
//       </ul>

//       <div className="mb-4">
//         <label className="block font-semibold mb-1">Select Language</label>
//         <select
//           value={languageId}
//           onChange={(e) => setLanguageId(Number(e.target.value))}
//           className="border border-gray-300 rounded p-2 w-full"
//         >
//           <option value={50}>C (GCC 9.2.0)</option>
//           <option value={54}>C++ (GCC 9.2.0)</option>
//           <option value={62}>Java (OpenJDK 13.0.1)</option>
//           <option value={71}>Python (3.8.1)</option>
//         </select>
//       </div>

//       <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         rows={10}
//         className="w-full border border-gray-300 rounded p-2 mb-4 font-mono"
//       ></textarea>

//       <div className="space-x-2">
//         <button
//           onClick={handleRun}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Run Code
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </div>

//       {results.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-bold mb-2">Results</h3>
//           {results.map((r, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded mb-2 ${
//                 r.pass ? "bg-green-100" : "bg-red-100"
//               }`}
//             >
//               <p>
//                 <strong>Input:</strong> {r.input}
//               </p>
//               <p>
//                 <strong>Expected:</strong> {r.expected}
//               </p>
//               <p>
//                 <strong>Output:</strong> {r.output}
//               </p>
//               <p>
//                 <strong>Status:</strong> {r.status}
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
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import CheckAuth from "@/lib/CheckAuth";

export default function ProblemPage() {
  const params = useParams();
  const id = params?.id; // safer access
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [languageId, setLanguageId] = useState(62); // Default: Java (OpenJDK 13.0.1)
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // These will not work client side from process.env, so remove them
  // We'll use our own API route to call Judge0 instead

  const languages = [
    { id: 50, name: "C (GCC 9.2.0)" },
    { id: 54, name: "C++ (GCC 9.2.0)" },
    { id: 62, name: "Java (OpenJDK 13.0.1)" },
    { id: 71, name: "Python (3.8.1)" },
    { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  ];

  // Fetch problem from Firestore
  useEffect(() => {
    if (!id) return;
    async function fetchProblem() {
      try {
        const ref = doc(db, "questions", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProblem({ id: snap.id, ...snap.data() });
          if (snap.data().defaultLanguageId) {
            setLanguageId(snap.data().defaultLanguageId);
          }
        } else {
          console.error(`Problem with ID ${id} not found.`);
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    }
    fetchProblem();
  }, [id]);

  // Run code using your local API route /api/compile
  async function runCode(testCases) {
    if (!testCases || testCases.length === 0) {
      alert("No test cases found.");
      return;
    }

    setLoading(true);
    let allResults = [];

    for (let tc of testCases) {
      try {
        const res = await fetch("/api/compile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: languages.find((l) => l.id === languageId)?.name.toLowerCase() || "java",
            source: code,
            stdin: tc.input,
          }),
        });

        const submissionData = await res.json();
        const actualOutput = (submissionData.stdout || "").trim();
        const expectedOutput = (tc.output || "").trim();

        allResults.push({
          input: tc.input,
          expected: expectedOutput,
          actual: actualOutput,
          status: submissionData.status?.description || "Error",
          pass: actualOutput.toLowerCase() === expectedOutput.toLowerCase(),
        });
      } catch (err) {
        allResults.push({
          input: tc.input,
          expected: tc.output,
          actual: "Error running code",
          status: "Error",
          pass: false,
        });
      }
    }

    setResults(allResults);
    setLoading(false);
    return allResults;
  }

  async function handleRun() {
    if (!problem) return;
    await runCode(problem.testCases.filter(tc => !tc.hidden));
  }

  async function handleSubmit() {
    if (!problem) return;
    const res = await runCode(problem.testCases);
    if (res.every(r => r.pass)) {
      const ref = doc(db, "questions", id);
      await updateDoc(ref, { solvers: increment(1) });
      alert("✅ All test cases passed! Problem solved.");
    } else {
      alert("❌ Some test cases failed. Try again!");
    }
  }

  if (!id) {
    return <p className="p-6 text-red-600">❌ Error: No problem ID in URL</p>;
  }

  if (!problem) {
    return <p className="p-6">Loading...</p>;
  }

  const passedCount = results.filter(r => r.pass).length;
  const totalCount = results.length;

  return (
    <CheckAuth>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
      <p className="text-gray-700 mb-4">Solved by {problem.solvers || 0} people</p>
      <pre className="bg-white p-4 rounded border mb-4 whitespace-pre-wrap">
        {problem.description}
      </pre>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Language:</label>
        <select
          value={languageId}
          onChange={(e) => setLanguageId(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Visible Test Cases */}
      <h2 className="text-lg font-semibold mb-2">Sample Test Cases</h2>
      <ul className="mb-4">
        {problem.testCases.filter(tc => !tc.hidden).map((tc, idx) => (
          <li key={idx} className="bg-gray-200 p-2 rounded mb-2">
            <p><strong>Input:</strong> {tc.input}</p>
            <p><strong>Expected Output:</strong> {tc.output}</p>
          </li>
        ))}
      </ul>

      {/* Code Editor */}
      <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={12}
        className="w-full border border-gray-300 rounded p-2 mb-4 font-mono"
      ></textarea>

      <div className="space-x-2">
        <button
          onClick={handleRun}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Run Code
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">
            Results ({passedCount}/{totalCount} Passed)
          </h3>
          {results.map((r, idx) => (
            <div
              key={idx}
              className={`p-3 rounded mb-2 ${
                r.pass ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <p><strong>Input:</strong> {r.input}</p>
              <p><strong>Expected Output:</strong> {r.expected}</p>
              <p><strong>Actual Output:</strong> {r.actual}</p>
              <p><strong>Status:</strong> {r.status}</p>
              <p>{r.pass ? "✅ Passed" : "❌ Failed"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </CheckAuth>
  );
}














// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { db } from "@/lib/firebase";
// import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

// export default function ProblemPage() {
//   const params = useParams();
//   const id = params?.id; // safer access-
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("// Write your code here");
//   const [languageId, setLanguageId] = useState(62); // Default: C++ (GCC 9.2.0)
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const JUDGE0_URL = process.env.JUDGE0_URL;
//   const JUDGE0_KEY = process.env.JUDGE0_RAPIDAPI_KEY;
//   const JUDGE0_HOST = process.env.JUDGE0_RAPIDAPI_HOST;

//   const languages = [
//     { id: 50, name: "C (GCC 9.2.0)" },
//     { id: 54, name: "C++ (GCC 9.2.0)" },
//     { id: 62, name: "Java (OpenJDK 13.0.1)" },
//     { id: 71, name: "Python (3.8.1)" },
//   ];

//   // Fetch problem
//   useEffect(() => {
//     if (!id) return;
//     async function fetchProblem() {
//       try {
//         const ref = doc(db, "questions", id);
//         const snap = await getDoc(ref);
//         if (snap.exists()) {
//           setProblem({ id: snap.id, ...snap.data() });
//         } else {
//           console.error(`Problem with ID ${id} not found.`);
//         }
//       } catch (error) {
//         console.error("Error fetching problem:", error);
//       }
//     }
//     fetchProblem();
//   }, [id]);

//   async function runCode(testCases) {
//     if (!JUDGE0_URL || !JUDGE0_KEY || !JUDGE0_HOST) {
//       alert("❌ Judge0 API keys or URL are missing in your .env file");
//       return;
//     }

//     setLoading(true);
//     let allResults = [];

//     for (let tc of testCases) {
//       try {
//         const submissionRes = await fetch(
//           `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
//           {
//             method: "POST",
//             headers: {
//               "content-type": "application/json",
//               "X-RapidAPI-Key": JUDGE0_KEY,
//               "X-RapidAPI-Host": JUDGE0_HOST,
//             },
//             body: JSON.stringify({
//               source_code: code,
//               language_id: languageId,
//               stdin: tc.input,
//             }),
//           }
//         );

//         const submissionData = await submissionRes.json();
//         const actualOutput = (submissionData.stdout || "").trim();
//         const expectedOutput = (tc.output || "").trim();

//         allResults.push({
//           input: tc.input,
//           expected: expectedOutput,
//           actual: actualOutput,
//           status: submissionData.status?.description || "Error",
//           pass: actualOutput.toLowerCase() === expectedOutput.toLowerCase(),
//         });
//       } catch (err) {
//         allResults.push({
//           input: tc.input,
//           expected: tc.output,
//           actual: "Error running code",
//           status: "Error",
//           pass: false,
//         });
//       }
//     }

//     setResults(allResults);
//     setLoading(false);
//     return allResults;
//   }

//   async function handleRun() {
//     if (!problem) return;
//     await runCode(problem.testCases.filter(tc => !tc.hidden));
//   }

//   async function handleSubmit() {
//     if (!problem) return;
//     const res = await runCode(problem.testCases);
//     if (res.every(r => r.pass)) {
//       const ref = doc(db, "questions", id);
//       await updateDoc(ref, { solvers: increment(1) });
//       alert("✅ All test cases passed! Problem solved.");
//     } else {
//       alert("❌ Some test cases failed. Try again!");
//     }
//   }

//   if (!id) {
//     return <p className="p-6 text-red-600">❌ Error: No problem ID in URL</p>;
//   }

//   if (!problem) {
//     return <p className="p-6">Loading...</p>;
//   }

//   const passedCount = results.filter(r => r.pass).length;
//   const totalCount = results.length;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
//       <p className="text-gray-700 mb-4">Solved by {problem.solvers || 0} people</p>
//       <pre className="bg-white p-4 rounded border mb-4 whitespace-pre-wrap">
//         {problem.description}
//       </pre>

//       {/* Language Selector */}
//       <div className="mb-4">
//         <label className="mr-2 font-semibold">Language:</label>
//         <select
//           value={languageId}
//           onChange={(e) => setLanguageId(Number(e.target.value))}
//           className="border p-2 rounded"
//         >
//           {languages.map((lang) => (
//             <option key={lang.id} value={lang.id}>
//               {lang.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Visible Test Cases */}
//       <h2 className="text-lg font-semibold mb-2">Sample Test Cases</h2>
//       <ul className="mb-4">
//         {problem.testCases.filter(tc => !tc.hidden).map((tc, idx) => (
//           <li key={idx} className="bg-gray-200 p-2 rounded mb-2">
//             <p><strong>Input:</strong> {tc.input}</p>
//             <p><strong>Expected Output:</strong> {tc.output}</p>
//           </li>
//         ))}
//       </ul>

//       {/* Code Editor */}
//       <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         rows={12}
//         className="w-full border border-gray-300 rounded p-2 mb-4 font-mono"
//       ></textarea>

//       <div className="space-x-2">
//         <button
//           onClick={handleRun}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Run Code
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </div>

//       {/* Results */}
//       {results.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-bold mb-2">
//             Results ({passedCount}/{totalCount} Passed)
//           </h3>
//           {results.map((r, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded mb-2 ${
//                 r.pass ? "bg-green-100" : "bg-red-100"
//               }`}
//             >
//               <p><strong>Input:</strong> {r.input}</p>
//               <p><strong>Expected Output:</strong> {r.expected}</p>
//               <p><strong>Actual Output:</strong> {r.actual}</p>
//               <p><strong>Status:</strong> {r.status}</p>
//               <p>{r.pass ? "✅ Passed" : "❌ Failed"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
