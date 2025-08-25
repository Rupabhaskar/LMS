// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import {
// // //   collection,
// // //   addDoc,
// // //   getDocs,
// // //   doc,
// // //   deleteDoc,
// // //   updateDoc
// // // } from "firebase/firestore";
// // // import { db } from "../../../lib/firebase";
// // // import { useRouter } from "next/navigation";
// // // import CheckAdminAuth from "@/lib/CheckAdminAuth";

// // // export default function UserManagerPage() {
// // //   const router = useRouter();
// // //   const [classes, setClasses] = useState([]);
// // //   const [students, setStudents] = useState([]);
// // //   const [courses, setCourses] = useState([]);
// // //   const [chapters, setChapters] = useState([]);

// // //   const [newClass, setNewClass] = useState({ name: "" });
// // //   const [newStudent, setNewStudent] = useState({
// // //     name: "",
// // //     phone: "",
// // //     email: "",
// // //     classId: ""
// // //   });

// // //   const [selectedClass, setSelectedClass] = useState("");
// // //   const [selectedStudent, setSelectedStudent] = useState("");
// // //   const [selectedCourse, setSelectedCourse] = useState("");
// // //   const [selectedChapters, setSelectedChapters] = useState([]);

// // //   // Fetch data
// // //   useEffect(() => {
// // //     fetchClasses();
// // //     fetchStudents();
// // //     fetchCourses();
// // //   }, []);

// // //   async function fetchClasses() {
// // //     const snap = await getDocs(collection(db, "classes"));
// // //     setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// // //   }

// // //   async function fetchStudents() {
// // //     const snap = await getDocs(collection(db, "students"));
// // //     setStudents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// // //   }

// // //   async function fetchCourses() {
// // //     const snap = await getDocs(collection(db, "courses"));
// // //     setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// // //   }

// // //   async function fetchChapters(courseId) {
// // //     if (!courseId) {
// // //       setChapters([]);
// // //       return;
// // //     }
// // //     const snap = await getDocs(
// // //       collection(db, "courses", courseId, "chapters")
// // //     );
// // //     setChapters(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// // //   }

// // //   // Add Class
// // //   async function handleAddClass(e) {
// // //     e.preventDefault();
// // //     if (!newClass.name) return alert("Class name is required");
// // //     await addDoc(collection(db, "classes"), newClass);
// // //     setNewClass({ name: "" });
// // //     fetchClasses();
// // //   }

// // //   // Add Student
// // //   async function handleAddStudent(e) {
// // //     e.preventDefault();
// // //     if (!newStudent.email || !newStudent.name || !newStudent.classId) {
// // //       alert("Please fill in Name, Email, and select a Class");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch("/api/create-student", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(newStudent),
// // //       });

// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error(data.error || "Failed to add student");

// // //       alert("Student added! Default Password: Vawe@2025");
// // //       setNewStudent({ name: "", phone: "", email: "", classId: "" });
// // //       fetchStudents();
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("Error: " + error.message);
// // //     }
// // //   }

// // //   // Delete Student
// // //   async function handleDeleteStudent(id) {
// // //     if (confirm("Delete this student?")) {
// // //       await deleteDoc(doc(db, "students", id));
// // //       fetchStudents();
// // //     }
// // //   }

// // //   // Update Chapter Access
// // //   async function handleUpdateAccess(e) {
// // //     e.preventDefault();
// // //     if (!selectedStudent) return alert("Select a student first");
// // //     if (!selectedCourse) return alert("Select a course first");

// // //     const studentRef = doc(db, "students", selectedStudent);
// // //     const student = students.find((s) => s.id === selectedStudent);

// // //     const updatedAccess = {
// // //       ...(student?.chapterAccess || {}),
// // //       [selectedCourse]: selectedChapters
// // //     };

// // //     await updateDoc(studentRef, {
// // //       chapterAccess: updatedAccess
// // //     });

// // //     alert("Chapter access updated!");
// // //     fetchStudents();
// // //   }

// // //   return (
// // //   <CheckAdminAuth>
// // //     <div className="p-8 bg-gray-100 min-h-screen">
// // //       <button
// // //         onClick={() => router.back()}
// // //         className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
// // //       >
// // //         ⬅ Back
// // //       </button>
// // //       <h1 className="text-3xl font-bold mb-6">User Manager</h1>

// // //       {/* Add Class */}
// // //       <div className="bg-white p-6 rounded shadow mb-8">
// // //         <h2 className="text-xl font-semibold mb-4">Add Class</h2>
// // //         <form onSubmit={handleAddClass} className="flex gap-4">
// // //           <input
// // //             className="border p-2 rounded flex-1"
// // //             placeholder="Class Name"
// // //             value={newClass.name}
// // //             onChange={(e) => setNewClass({ name: e.target.value })}
// // //           />
// // //           <button
// // //             type="submit"
// // //             className="bg-blue-500 text-white px-4 py-2 rounded"
// // //           >
// // //             Add
// // //           </button>
// // //         </form>
// // //       </div>

// // //       {/* Add Student */}
// // //       <div className="bg-white p-6 rounded shadow mb-8">
// // //         <h2 className="text-xl font-semibold mb-4">Add Student</h2>
// // //         <form onSubmit={handleAddStudent} className="grid grid-cols-2 gap-4">
// // //           <input
// // //             className="border p-2 rounded"
// // //             placeholder="Name"
// // //             value={newStudent.name}
// // //             onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
// // //           />
// // //           <input
// // //             className="border p-2 rounded"
// // //             placeholder="Phone"
// // //             value={newStudent.phone}
// // //             onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
// // //           />
// // //           <input
// // //             className="border p-2 rounded"
// // //             placeholder="Email"
// // //             value={newStudent.email}
// // //             onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
// // //           />
// // //           <select
// // //             className="border p-2 rounded"
// // //             value={newStudent.classId}
// // //             onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
// // //           >
// // //             <option value="">Select Class</option>
// // //             {classes.map((c) => (
// // //               <option key={c.id} value={c.id}>
// // //                 {c.name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //           <button
// // //             type="submit"
// // //             className="bg-green-500 text-white px-4 py-2 rounded col-span-2"
// // //           >
// // //             Add Student
// // //           </button>
// // //         </form>
// // //       </div>

// // //       {/* Grant Chapter Access */}
// // //       <div className="bg-white p-6 rounded shadow mb-8">
// // //         <h2 className="text-xl font-semibold mb-4">Grant Chapter Access</h2>
// // //         <form onSubmit={handleUpdateAccess} className="space-y-4">

// // //           {/* Select Class */}
// // //           <select
// // //             value={selectedClass}
// // //             onChange={(e) => {
// // //               setSelectedClass(e.target.value);
// // //               setSelectedStudent("");
// // //               setSelectedCourse("");
// // //               setSelectedChapters([]);
// // //             }}
// // //             className="border p-2 rounded w-full"
// // //           >
// // //             <option value="">Select Class</option>
// // //             {classes.map((c) => (
// // //               <option key={c.id} value={c.id}>
// // //                 {c.name}
// // //               </option>
// // //             ))}
// // //           </select>

// // //           {/* Select Student */}
// // //           <select
// // //             value={selectedStudent}
// // //             onChange={(e) => {
// // //               setSelectedStudent(e.target.value);
// // //               setSelectedCourse("");
// // //               setSelectedChapters([]);
// // //             }}
// // //             className="border p-2 rounded w-full"
// // //           >
// // //             <option value="">Select Student</option>
// // //             {students
// // //               .filter((s) => s.classId === selectedClass)
// // //               .map((s) => (
// // //                 <option key={s.id} value={s.id}>
// // //                   {s.name} ({s.email})
// // //                 </option>
// // //               ))}
// // //           </select>

// // //           {/* Select Course */}
// // //           <select
// // //             value={selectedCourse}
// // //             onChange={(e) => {
// // //               const courseId = e.target.value;
// // //               setSelectedCourse(courseId);
// // //               fetchChapters(courseId);
// // //               const student = students.find((s) => s.id === selectedStudent);
// // //               if (student?.chapterAccess) {
// // //                 setSelectedChapters(student.chapterAccess[courseId] || []);
// // //               }
// // //             }}
// // //             className="border p-2 rounded w-full"
// // //           >
// // //             <option value="">Select Course</option>
// // //             {courses.map((course) => (
// // //               <option key={course.id} value={course.id}>
// // //                 {course.title}
// // //               </option>
// // //             ))}
// // //           </select>

// // //           {/* Select Chapters */}
// // //           {selectedCourse && chapters.length > 0 && (
// // //             <div className="space-y-2 border p-3 rounded">
// // //               <p className="font-semibold">Select Chapters</p>
// // //               {chapters.map((chapter) => (
// // //                 <label key={chapter.id} className="flex items-center space-x-2">
// // //                   <input
// // //                     type="checkbox"
// // //                     checked={selectedChapters.includes(chapter.id)}
// // //                     onChange={(e) => {
// // //                       if (e.target.checked) {
// // //                         setSelectedChapters([...selectedChapters, chapter.id]);
// // //                       } else {
// // //                         setSelectedChapters(
// // //                           selectedChapters.filter((id) => id !== chapter.id)
// // //                         );
// // //                       }
// // //                     }}
// // //                   />
// // //                   <span>{chapter.title}</span>
// // //                 </label>
// // //               ))}
// // //             </div>
// // //           )}

// // //           <button
// // //             type="submit"
// // //             className="bg-blue-500 text-white px-4 py-2 rounded"
// // //           >
// // //             Save Access
// // //           </button>
// // //         </form>
// // //       </div>

// // //       {/* Students List */}
// // //       <div className="bg-white p-6 rounded shadow">
// // //         <h2 className="text-xl font-semibold mb-4">Students</h2>
// // //         {students.length === 0 ? (
// // //           <p className="text-gray-500">No students yet.</p>
// // //         ) : (
// // //           <table className="w-full border">
// // //             <thead>
// // //               <tr className="bg-gray-200">
// // //                 <th className="border p-2">Name</th>
// // //                 <th className="border p-2">Email</th>
// // //                 <th className="border p-2">Phone</th>
// // //                 <th className="border p-2">Class</th>
// // //                 <th className="border p-2">Password</th>
// // //                 <th className="border p-2">Chapter Access</th>
// // //                 <th className="border p-2">Action</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {students.map((s) => (
// // //                 <tr key={s.id}>
// // //                   <td className="border p-2">{s.name}</td>
// // //                   <td className="border p-2">{s.email}</td>
// // //                   <td className="border p-2">{s.phone}</td>
// // //                   <td className="border p-2">
// // //                     {classes.find((c) => c.id === s.classId)?.name || "N/A"}
// // //                   </td>
// // //                   <td className="border p-2">{s.password}</td>
// // //                   <td className="border p-2">
// // //                     {s.chapterAccess
// // //                       ? Object.entries(s.chapterAccess)
// // //                           .map(([courseId, chaps]) => {
// // //                             const courseTitle =
// // //                               courses.find((c) => c.id === courseId)?.title ||
// // //                               courseId;
// // //                             return `${courseTitle}: ${chaps.length} chapters`;
// // //                           })
// // //                           .join(", ")
// // //                       : "None"}
// // //                   </td>
// // //                   <td className="border p-2">
// // //                     <button
// // //                       onClick={() => handleDeleteStudent(s.id)}
// // //                       className="bg-red-500 text-white px-3 py-1 rounded"
// // //                     >
// // //                       Delete
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         )}
// // //       </div>
// // //     </div>
// // //     </CheckAdminAuth>
// // //   );
// // // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import {
// //   collection,
// //   getDocs,
// //   addDoc,
// //   doc,
// //   deleteDoc,
// //   updateDoc
// // } from "firebase/firestore";
// // import { db } from "../../../lib/firebase";
// // import { useRouter } from "next/navigation";
// // import CheckAdminAuth from "@/lib/CheckAdminAuth";
// // import AdmissionForm from "@/components/AdmissionForm"; // ✅ Import new form

// // export default function UserManagerPage() {
// //   const router = useRouter();
// //   const [classes, setClasses] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [courses, setCourses] = useState([]);
// //   const [chapters, setChapters] = useState([]);

// //   const [newClass, setNewClass] = useState({ name: "" });
// //   const [newStudent, setNewStudent] = useState({
// //     name: "",
// //     phone: "",
// //     email: "",
// //     classId: ""
// //   });

// //   const [selectedClass, setSelectedClass] = useState("");
// //   const [selectedStudent, setSelectedStudent] = useState("");
// //   const [selectedCourse, setSelectedCourse] = useState("");
// //   const [selectedChapters, setSelectedChapters] = useState([]);

// //   // Fetch data
// //   useEffect(() => {
// //     fetchClasses();
// //     fetchStudents();
// //     fetchCourses();
// //   }, []);

// //   async function fetchClasses() {
// //     const snap = await getDocs(collection(db, "classes"));
// //     setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// //   }

// //   async function fetchStudents() {
// //     const snap = await getDocs(collection(db, "students"));
// //     setStudents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// //   }

// //   async function fetchCourses() {
// //     const snap = await getDocs(collection(db, "courses"));
// //     setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// //   }

// //   async function fetchChapters(courseId) {
// //     if (!courseId) {
// //       setChapters([]);
// //       return;
// //     }
// //     const snap = await getDocs(
// //       collection(db, "courses", courseId, "chapters")
// //     );
// //     setChapters(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
// //   }

// //   // Add Class
//   // async function handleAddClass(e) {
//   //   e.preventDefault();
//   //   if (!newClass.name) return alert("Class name is required");
//   //   await addDoc(collection(db, "classes"), newClass);
//   //   setNewClass({ name: "" });
//   //   fetchClasses();
//   // }

// //   // Add Student
// //   async function handleAddStudent(e) {
// //     e.preventDefault();
// //     if (!newStudent.email || !newStudent.name || !newStudent.classId) {
// //       alert("Please fill in Name, Email, and select a Class");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("/api/create-student", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(newStudent),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "Failed to add student");

// //       alert("Student added! Default Password: Vawe@2025");
// //       setNewStudent({ name: "", phone: "", email: "", classId: "" });
// //       fetchStudents();
// //     } catch (error) {
// //       console.error(error);
// //       alert("Error: " + error.message);
// //     }
// //   }

// //   // Delete Student
// //   async function handleDeleteStudent(id) {
// //     if (confirm("Delete this student?")) {
// //       await deleteDoc(doc(db, "students", id));
// //       fetchStudents();
// //     }
// //   }

// //   // Update Chapter Access
// //   async function handleUpdateAccess(e) {
// //     e.preventDefault();
// //     if (!selectedStudent) return alert("Select a student first");
// //     if (!selectedCourse) return alert("Select a course first");

// //     const studentRef = doc(db, "students", selectedStudent);
// //     const student = students.find((s) => s.id === selectedStudent);

// //     const updatedAccess = {
// //       ...(student?.chapterAccess || {}),
// //       [selectedCourse]: selectedChapters
// //     };

// //     await updateDoc(studentRef, {
// //       chapterAccess: updatedAccess
// //     });

// //     alert("Chapter access updated!");
// //     fetchStudents();
// //   }

// //   return (
// //     <CheckAdminAuth>
// //       <div className="p-8 bg-gray-100 min-h-screen">
// //         <button
// //           onClick={() => router.back()}
// //           className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
// //         >
// //           ⬅ Back
// //         </button>
// //         <h1 className="text-3xl font-bold mb-6">User Manager</h1>

// //         {/* Add Class */}
// //       <div className="bg-white p-6 rounded shadow mb-8">
// //         <h2 className="text-xl font-semibold mb-4">Add Class</h2>
// //         <form onSubmit={handleAddClass} className="flex gap-4">
// //           <input
// //             className="border p-2 rounded flex-1"
// //             placeholder="Class Name"
// //             value={newClass.name}
// //             onChange={(e) => setNewClass({ name: e.target.value })}
// //           />
// //           <button
// //             type="submit"
// //             className="bg-blue-500 text-white px-4 py-2 rounded"
// //           >
// //             Add
// //           </button>
// //         </form>
// //       </div>

// //         {/* ✅ Admission Form replaces Add Student */}
// //         <div className="bg-white p-6 rounded shadow mb-8">
// //           <AdmissionForm />
// //         </div>

// //          {/* Grant Chapter Access */}
// //       <div className="bg-white p-6 rounded shadow mb-8">
// //         <h2 className="text-xl font-semibold mb-4">Grant Chapter Access</h2>
// //         <form onSubmit={handleUpdateAccess} className="space-y-4">

// //           {/* Select Class */}
// //           <select
// //             value={selectedClass}
// //             onChange={(e) => {
// //               setSelectedClass(e.target.value);
// //               setSelectedStudent("");
// //               setSelectedCourse("");
// //               setSelectedChapters([]);
// //             }}
// //             className="border p-2 rounded w-full"
// //           >
// //             <option value="">Select Class</option>
// //             {classes.map((c) => (
// //               <option key={c.id} value={c.id}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Select Student */}
// //           <select
// //             value={selectedStudent}
// //             onChange={(e) => {
// //               setSelectedStudent(e.target.value);
// //               setSelectedCourse("");
// //               setSelectedChapters([]);
// //             }}
// //             className="border p-2 rounded w-full"
// //           >
// //             <option value="">Select Student</option>
// //             {students
// //               .filter((s) => s.classId === selectedClass)
// //               .map((s) => (
// //                 <option key={s.id} value={s.id}>
// //                   {s.name} ({s.email})
// //                 </option>
// //               ))}
// //           </select>

// //           {/* Select Course */}
// //           <select
// //             value={selectedCourse}
// //             onChange={(e) => {
// //               const courseId = e.target.value;
// //               setSelectedCourse(courseId);
// //               fetchChapters(courseId);
// //               const student = students.find((s) => s.id === selectedStudent);
// //               if (student?.chapterAccess) {
// //                 setSelectedChapters(student.chapterAccess[courseId] || []);
// //               }
// //             }}
// //             className="border p-2 rounded w-full"
// //           >
// //             <option value="">Select Course</option>
// //             {courses.map((course) => (
// //               <option key={course.id} value={course.id}>
// //                 {course.title}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Select Chapters */}
// //           {selectedCourse && chapters.length > 0 && (
// //             <div className="space-y-2 border p-3 rounded">
// //               <p className="font-semibold">Select Chapters</p>
// //               {chapters.map((chapter) => (
// //                 <label key={chapter.id} className="flex items-center space-x-2">
// //                   <input
// //                     type="checkbox"
// //                     checked={selectedChapters.includes(chapter.id)}
// //                     onChange={(e) => {
// //                       if (e.target.checked) {
// //                         setSelectedChapters([...selectedChapters, chapter.id]);
// //                       } else {
// //                         setSelectedChapters(
// //                           selectedChapters.filter((id) => id !== chapter.id)
// //                         );
// //                       }
// //                     }}
// //                   />
// //                   <span>{chapter.title}</span>
// //                 </label>
// //               ))}
// //             </div>
// //           )}

// //           <button
// //             type="submit"
// //             className="bg-blue-500 text-white px-4 py-2 rounded"
// //           >
// //             Save Access
// //           </button>
// //         </form>
// //       </div>

// //       {/* Students List */}
// //       <div className="bg-white p-6 rounded shadow">
// //         <h2 className="text-xl font-semibold mb-4">Students</h2>
// //         {students.length === 0 ? (
// //           <p className="text-gray-500">No students yet.</p>
// //         ) : (
// //           <table className="w-full border">
// //             <thead>
// //               <tr className="bg-gray-200">
// //                 <th className="border p-2">Name</th>
// //                 <th className="border p-2">Email</th>
// //                 <th className="border p-2">Phone</th>
// //                 <th className="border p-2">Class</th>
// //                 <th className="border p-2">Password</th>
// //                 <th className="border p-2">Chapter Access</th>
// //                 <th className="border p-2">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {students.map((s) => (
// //                 <tr key={s.id}>
// //                   <td className="border p-2">{s.name}</td>
// //                   <td className="border p-2">{s.email}</td>
// //                   <td className="border p-2">{s.phone}</td>
// //                   <td className="border p-2">
// //                     {classes.find((c) => c.id === s.classId)?.name || "N/A"}
// //                   </td>
// //                   <td className="border p-2">{s.password}</td>
// //                   <td className="border p-2">
// //                     {s.chapterAccess
// //                       ? Object.entries(s.chapterAccess)
// //                           .map(([courseId, chaps]) => {
// //                             const courseTitle =
// //                               courses.find((c) => c.id === courseId)?.title ||
// //                               courseId;
// //                             return `${courseTitle}: ${chaps.length} chapters`;
// //                           })
// //                           .join(", ")
// //                       : "None"}
// //                   </td>
// //                   <td className="border p-2">
// //                     <button
// //                       onClick={() => handleDeleteStudent(s.id)}
// //                       className="bg-red-500 text-white px-3 py-1 rounded"
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //       </div>
// //     </CheckAdminAuth>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   deleteDoc,
//   updateDoc,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../../../lib/firebase";
// import { useRouter } from "next/navigation";
// import CheckAdminAuth from "@/lib/CheckAdminAuth";
// import AdmissionForm from "@/components/AdmissionForm";

// export default function UserManagerPage() {
//   const router = useRouter();
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [chapters, setChapters] = useState([]);

//   // State
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedChapters, setSelectedChapters] = useState([]);
//   const [searchPhone, setSearchPhone] = useState("");

//   // Fetch data
//   useEffect(() => {
//     fetchClasses();
//     fetchStudents();
//     fetchCourses();
//   }, []);

//   async function fetchClasses() {
//     const snap = await getDocs(collection(db, "classes"));
//     setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   }

//   async function fetchStudents() {
//     const snap = await getDocs(collection(db, "students"));
//     setStudents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   }

//   async function fetchCourses() {
//     const snap = await getDocs(collection(db, "courses"));
//     setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   }

//   async function fetchChapters(courseId) {
//     if (!courseId) {
//       setChapters([]);
//       return;
//     }
//     const snap = await getDocs(collection(db, "courses", courseId, "chapters"));
//     setChapters(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   }

//   // Delete Student
//   async function handleDeleteStudent(id) {
//     if (confirm("Delete this student?")) {
//       await deleteDoc(doc(db, "students", id));
//       fetchStudents();
//     }
//   }

//   // Update Chapter Access
//   async function handleUpdateAccess(e) {
//     e.preventDefault();
//     if (!selectedStudent) return alert("Select a student first");
//     if (!selectedCourse) return alert("Select a course first");

//     const studentRef = doc(db, "students", selectedStudent);
//     const student = students.find((s) => s.id === selectedStudent);

//     const updatedAccess = {
//       ...(student?.chapterAccess || {}),
//       [selectedCourse]: selectedChapters,
//     };

//     await updateDoc(studentRef, {
//       chapterAccess: updatedAccess,
//     });

//     alert("Chapter access updated!");
//     fetchStudents();
//   }

//   // 🔍 Search by phone number
//   function handleSearchByPhone() {
//     const found = students.find((s) => s.phone === searchPhone.trim());
//     if (found) {
//       setSelectedStudent(found.id);
//       setSelectedClass(found.classId);
//       alert(`Student Found: ${found.name}`);
//     } else {
//       alert("No student found with this phone number.");
//     }
//   }

//   return (
//     <CheckAdminAuth>
//       <div className="p-8 bg-gray-100 min-h-screen">
//         <button
//           onClick={() => router.back()}
//           className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//         >
//           ⬅ Back
//         </button>
//         <h1 className="text-3xl font-bold mb-6">User Manager</h1>

//         {/* ✅ Admission Form (with unique phone validation inside form) */}
//         <div className="bg-white p-6 rounded shadow mb-8">
//           <AdmissionForm onStudentAdded={fetchStudents} />
//         </div>

//         {/* Grant Chapter Access */}
//         <div className="bg-white p-6 rounded shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">Grant Chapter Access</h2>
//           <form onSubmit={handleUpdateAccess} className="space-y-4">
            
//             {/* 🔍 Search by Phone */}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Search by Phone"
//                 value={searchPhone}
//                 onChange={(e) => setSearchPhone(e.target.value)}
//                 className="border p-2 rounded flex-1"
//               />
//               <button
//                 type="button"
//                 onClick={handleSearchByPhone}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Search
//               </button>
//             </div>

//             {/* Select Class */}
//             <select
//               value={selectedClass}
//               onChange={(e) => {
//                 setSelectedClass(e.target.value);
//                 setSelectedStudent("");
//                 setSelectedCourse("");
//                 setSelectedChapters([]);
//               }}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Select Class</option>
//               {classes.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             {/* Select Student */}
//             <select
//               value={selectedStudent}
//               onChange={(e) => {
//                 setSelectedStudent(e.target.value);
//                 setSelectedCourse("");
//                 setSelectedChapters([]);
//               }}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Select Student</option>
//               {students
//                 .filter((s) => s.classId === selectedClass)
//                 .map((s) => (
//                   <option key={s.id} value={s.id}>
//                     {s.name} ({s.phone})
//                   </option>
//                 ))}
//             </select>

//             {/* Select Course */}
//             <select
//               value={selectedCourse}
//               onChange={(e) => {
//                 const courseId = e.target.value;
//                 setSelectedCourse(courseId);
//                 fetchChapters(courseId);
//                 const student = students.find((s) => s.id === selectedStudent);
//                 if (student?.chapterAccess) {
//                   setSelectedChapters(student.chapterAccess[courseId] || []);
//                 }
//               }}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.title}
//                 </option>
//               ))}
//             </select>

//             {/* Select Chapters */}
//             {selectedCourse && chapters.length > 0 && (
//               <div className="space-y-2 border p-3 rounded">
//                 <p className="font-semibold">Select Chapters</p>
//                 {chapters.map((chapter) => (
//                   <label key={chapter.id} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedChapters.includes(chapter.id)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedChapters([...selectedChapters, chapter.id]);
//                         } else {
//                           setSelectedChapters(
//                             selectedChapters.filter((id) => id !== chapter.id)
//                           );
//                         }
//                       }}
//                     />
//                     <span>{chapter.title}</span>
//                   </label>
//                 ))}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Save Access
//             </button>
//           </form>
//         </div>

//         {/* Students List */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Students</h2>
//           {students.length === 0 ? (
//             <p className="text-gray-500">No students yet.</p>
//           ) : (
//             <table className="w-full border">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Name</th>
//                   <th className="border p-2">Email</th>
//                   <th className="border p-2">Phone</th>
//                   <th className="border p-2">Class</th>
//                   <th className="border p-2">Password</th>
//                   <th className="border p-2">Chapter Access</th>
//                   <th className="border p-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s) => (
//                   <tr key={s.id}>
//                     <td className="border p-2">{s.name}</td>
//                     <td className="border p-2">{s.email}</td>
//                     <td className="border p-2">{s.phone}</td>
//                     <td className="border p-2">
//                       {classes.find((c) => c.id === s.classId)?.name || "N/A"}
//                     </td>
//                     <td className="border p-2">{s.password}</td>
//                     <td className="border p-2">
//                       {s.chapterAccess
//                         ? Object.entries(s.chapterAccess)
//                             .map(([courseId, chaps]) => {
//                               const courseTitle =
//                                 courses.find((c) => c.id === courseId)?.title ||
//                                 courseId;
//                               return `${courseTitle}: ${chaps.length} chapters`;
//                             })
//                             .join(", ")
//                         : "None"}
//                     </td>
//                     <td className="border p-2">
//                       <button
//                         onClick={() => handleDeleteStudent(s.id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </CheckAdminAuth>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import CheckAdminAuth from "@/lib/CheckAdminAuth";
import AdmissionForm from "@/components/AdmissionForm";

export default function UserManagerPage() {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);

  // 🔹 State
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [assignClass, setAssignClass] = useState("");

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);

  // Fetch Data
  useEffect(() => {
    fetchClasses();
    fetchStudents();
    fetchCourses();
  }, []);

  async function fetchClasses() {
    const snap = await getDocs(collection(db, "classes"));
    setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  async function fetchStudents() {
    const snap = await getDocs(collection(db, "students"));
    setStudents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  async function fetchCourses() {
    const snap = await getDocs(collection(db, "courses"));
    setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  async function fetchChapters(courseId) {
    if (!courseId) {
      setChapters([]);
      return;
    }
    const snap = await getDocs(collection(db, "courses", courseId, "chapters"));
    setChapters(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  // 🔹 Search Student by Phone
  function handleSearchStudent() {
    const found = students.find((s) => s.phone === searchPhone.trim());
    if (found) {
      setSelectedStudent(found.id);
      setAssignClass(found.classId || "");
      alert(`Student Found: ${found.name}`);
    } else {
      alert("No student found with this phone number.");
    }
  }

  // 🔹 Assign Student to Class
  async function handleAssignStudentToClass(e) {
    e.preventDefault();
    if (!selectedStudent) return alert("Search and select a student first.");
    if (!assignClass) return alert("Select a class first.");

    await updateDoc(doc(db, "students", selectedStudent), {
      classId: assignClass,
    });

    alert("✅ Student assigned to class!");
    fetchStudents();
  }

  // 🔹 Assign Course & Chapters to Class
  async function handleAssignCourseToClass(e) {
    e.preventDefault();
    if (!selectedClass) return alert("Select a class first.");
    if (!selectedCourse) return alert("Select a course first.");

    const classRef = doc(db, "classes", selectedClass);
    const cls = classes.find((c) => c.id === selectedClass);

    const updatedAccess = {
      ...(cls?.chapterAccess || {}),
      [selectedCourse]: selectedChapters,
    };

    await updateDoc(classRef, { chapterAccess: updatedAccess });

    alert("✅ Course & chapters assigned to class!");
    fetchClasses();
  }

  // 🔹 Delete Student
  async function handleDeleteStudent(id) {
    if (confirm("Delete this student?")) {
      await deleteDoc(doc(db, "students", id));
      fetchStudents();
    }
  }

  return (
    <CheckAdminAuth>
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          ⬅ Back
        </button>

        <h1 className="text-3xl font-bold mb-6">User Manager</h1>

        {/* ✅ Admission Form */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <AdmissionForm onStudentAdded={fetchStudents} />
        </div>

        {/* 🔹 Assign Student to Class */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Assign Student to Class</h2>
          <form onSubmit={handleAssignStudentToClass} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Phone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <button
                type="button"
                onClick={handleSearchStudent}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>

            {/* Select Class for Student */}
            <select
              value={assignClass}
              onChange={(e) => setAssignClass(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Assign Student
            </button>
          </form>
        </div>

        {/* 🔹 Assign Course & Chapters to Class */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Assign Courses to Class</h2>
          <form onSubmit={handleAssignCourseToClass} className="space-y-4">
            {/* Select Class */}
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedCourse("");
                setSelectedChapters([]);
              }}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Select Course */}
            <select
              value={selectedCourse}
              onChange={(e) => {
                const courseId = e.target.value;
                setSelectedCourse(courseId);
                fetchChapters(courseId);
              }}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            {/* Select Chapters */}
            {selectedCourse && chapters.length > 0 && (
              <div className="space-y-2 border p-3 rounded">
                <p className="font-semibold">Select Chapters</p>
                {chapters.map((chapter) => (
                  <label key={chapter.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(chapter.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChapters([...selectedChapters, chapter.id]);
                        } else {
                          setSelectedChapters(
                            selectedChapters.filter((id) => id !== chapter.id)
                          );
                        }
                      }}
                    />
                    <span>{chapter.title}</span>
                  </label>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Assign Course
            </button>
          </form>
        </div>

        {/* Students List */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          {students.length === 0 ? (
            <p className="text-gray-500">No students yet.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="border p-2">{s.name}</td>
                    <td className="border p-2">{s.phone}</td>
                    <td className="border p-2">
                      {classes.find((c) => c.id === s.classId)?.name || "N/A"}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDeleteStudent(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </CheckAdminAuth>
  );
}
