
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { auth, db } from "../../../lib/firebase";
import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";
import CheckAdminAuth from "@/lib/CheckAdminAuth";

export default function ManageMCQs() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("java");

  const [mcqs, setMcqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("java");

  // Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setIsAdmin(true); // Replace with real admin check
        loadMCQs("java");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Load MCQs by category
  async function loadMCQs(cat) {
    const q = query(collection(db, "mcqs"), where("category", "==", cat));
    const snap = await getDocs(q);
    setMcqs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  // Save MCQ
  async function saveMCQ() {
    const filteredOptions = options.filter(opt => opt.trim() !== "");
    if (!question || filteredOptions.length < 2 || !answer) {
      alert("Please fill question, at least 2 options, and select the correct answer.");
      return;
    }
    await addDoc(collection(db, "mcqs"), {
      question,
      options: filteredOptions,
      answer,
      category
    });
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setCategory("java");
    loadMCQs(selectedCategory);
  }

  // Delete MCQ
  async function deleteMCQ(id) {
    if (confirm("Are you sure you want to delete this question?")) {
      await deleteDoc(doc(db, "mcqs", id));
      loadMCQs(selectedCategory);
    }
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
    loadMCQs(e.target.value);
  }

  if (loading) return <div>Loading...</div>;
  if (!user || !isAdmin) return <div>Access Denied</div>;

  return (
    <CheckAdminAuth>
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link href="/Admin">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        </Link>
        <h1 className="text-2xl font-bold">Manage MCQs</h1>
        <button onClick={() => signOut(auth)} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Add MCQ */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-3">Add MCQ</h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="html">HTML/CSS</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[idx] = e.target.value;
              setOptions(newOpts);
              if (answer === opt) setAnswer("");
            }}
            className="border p-2 w-full mb-2"
          />
        ))}

        {/* Select correct answer from entered options */}
        <select
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select correct answer</option>
          {options
            .filter(opt => opt.trim() !== "")
            .map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
        </select>

        <button onClick={saveMCQ} className="bg-green-600 text-white px-4 py-2 rounded">
          Save MCQ
        </button>
      </div>

      {/* Show MCQs */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Existing MCQs</h2>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border p-2"
          >
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="html">HTML/CSS</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        {mcqs.length === 0 && <p>No MCQs found for this category.</p>}

        {mcqs.map((m) => (
          <div key={m.id} className="bg-gray-50 p-3 rounded mt-2 flex justify-between items-start">
            <div>
              <p className="font-bold">{m.question}</p>
              <ul className="list-disc ml-6">
                {m.options.map((opt, i) => <li key={i}>{opt}</li>)}
              </ul>
              <p className="text-green-600">Answer: {m.answer}</p>
            </div>
            <button
              onClick={() => deleteMCQ(m.id)}
              className="bg-red-500 text-white px-3 py-1 rounded h-fit"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
   </CheckAdminAuth>
  );
}



// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { auth, db } from "../../../lib/firebase";
// import {
//   onAuthStateChanged,
//   signOut
// } from "firebase/auth";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   query,
//   where
// } from "firebase/firestore";

// export default function ManageMCQs() {
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [answer, setAnswer] = useState("");
//   const [category, setCategory] = useState("java");

//   const [mcqs, setMcqs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("java");

//   // Auth check
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (u) => {
//       setUser(u);
//       if (u) {
//         setIsAdmin(true); // Replace with real admin check
//         loadMCQs("java");
//       }
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   // Load MCQs by category
//   async function loadMCQs(cat) {
//     const q = query(collection(db, "mcqs"), where("category", "==", cat));
//     const snap = await getDocs(q);
//     setMcqs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   }

//   // Save MCQ
//   async function saveMCQ() {
//     const filteredOptions = options.filter(opt => opt.trim() !== "");
//     if (!question || filteredOptions.length < 2 || !answer) {
//       alert("Please fill question, at least 2 options, and select the correct answer.");
//       return;
//     }
//     await addDoc(collection(db, "mcqs"), {
//       question,
//       options: filteredOptions,
//       answer,
//       category
//     });
//     setQuestion("");
//     setOptions(["", "", "", ""]);
//     setAnswer("");
//     setCategory("java");
//     loadMCQs(selectedCategory);
//   }

//   function handleCategoryChange(e) {
//     setSelectedCategory(e.target.value);
//     loadMCQs(e.target.value);
//   }

//   if (loading) return <div>Loading...</div>;
//   if (!user || !isAdmin) return <div>Access Denied</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <Link href="/Admin">
//           <button className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
//         </Link>
//         <h1 className="text-2xl font-bold">Manage MCQs</h1>
//         <button onClick={() => signOut(auth)} className="bg-red-600 text-white px-4 py-2 rounded">
//           Logout
//         </button>
//       </div>

//       {/* Add MCQ */}
//       <div className="bg-white p-6 rounded shadow mb-8">
//         <h2 className="text-lg font-semibold mb-3">Add MCQ</h2>

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 w-full mb-3"
//         >
//           <option value="java">Java</option>
//           <option value="c">C</option>
//           <option value="html">HTML/CSS</option>
//           <option value="python">Python</option>
//           <option value="javascript">JavaScript</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Enter question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="border p-2 w-full mb-3"
//         />

//         {options.map((opt, idx) => (
//           <input
//             key={idx}
//             type="text"
//             placeholder={`Option ${idx + 1}`}
//             value={opt}
//             onChange={(e) => {
//               const newOpts = [...options];
//               newOpts[idx] = e.target.value;
//               setOptions(newOpts);
//               // Reset answer if it's no longer in the list
//               if (answer === opt) setAnswer("");
//             }}
//             className="border p-2 w-full mb-2"
//           />
//         ))}

//         {/* Select correct answer from entered options */}
//         <select
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           className="border p-2 w-full mb-3"
//         >
//           <option value="">Select correct answer</option>
//           {options
//             .filter(opt => opt.trim() !== "")
//             .map((opt, i) => (
//               <option key={i} value={opt}>{opt}</option>
//             ))}
//         </select>

//         <button onClick={saveMCQ} className="bg-green-600 text-white px-4 py-2 rounded">
//           Save MCQ
//         </button>
//       </div>

//       {/* Show MCQs */}
//       <div className="bg-white p-6 rounded shadow">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Existing MCQs</h2>
//           <select
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             className="border p-2"
//           >
//             <option value="java">Java</option>
//             <option value="c">C</option>
//             <option value="html">HTML/CSS</option>
//             <option value="python">Python</option>
//             <option value="javascript">JavaScript</option>
//           </select>
//         </div>

//         {mcqs.length === 0 && <p>No MCQs found for this category.</p>}

//         {mcqs.map((m) => (
//           <div key={m.id} className="bg-gray-50 p-3 rounded mt-2">
//             <p className="font-bold">{m.question}</p>
//             <ul className="list-disc ml-6">
//               {m.options.map((opt, i) => <li key={i}>{opt}</li>)}
//             </ul>
//             <p className="text-green-600">Answer: {m.answer}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
