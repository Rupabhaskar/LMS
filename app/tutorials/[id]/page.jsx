// // "use client";

// // import { useParams } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { onAuthStateChanged } from "firebase/auth";
// // import {
// //   auth,
// //   db
// // } from "../../../lib/firebase"; // adjust path
// // import {
// //   doc,
// //   getDoc,
// //   getDocs,
// //   collection,
// //   query,
// //   where
// // } from "firebase/firestore";

// // export default function CourseDetailsPage() {
// //   const { id: courseId } = useParams();
// //   const [course, setCourse] = useState(null);
// //   const [chapters, setChapters] = useState([]);
// //   const [assignments, setAssignments] = useState([]);
// //   const [accessibleChapters, setAccessibleChapters] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch course + chapters + assignments
// //   const fetchData = async (user) => {
// //     console.log("✅ Logged-in UID:", user.uid);
// //     let allowedChapters = [];

// //     try {
// //       // First try direct doc lookup
// //       const directRef = doc(db, "students", user.uid);
// //       const directSnap = await getDoc(directRef);

// //       let studentData = null;

// //       if (directSnap.exists()) {
// //         console.log("📄 Found student doc directly at students/{uid}");
// //         studentData = directSnap.data();
// //       } else {
// //         console.warn("⚠️ No student doc at students/{uid}, trying query...");

// //         const q = query(
// //           collection(db, "students"),
// //           where("uid", "==", user.uid)
// //         );
// //         const qSnap = await getDocs(q);

// //         if (!qSnap.empty) {
// //           console.log("📄 Found student doc via query");
// //           studentData = qSnap.docs[0].data();
// //         } else {
// //           console.error("❌ No student document found at all for UID:", user.uid);
// //         }
// //       }

// //       // Get allowed chapters from chapterAccess map
// //       if (studentData?.chapterAccess && studentData.chapterAccess[courseId]) {
// //         allowedChapters = studentData.chapterAccess[courseId];
// //         console.log("✅ Allowed chapters:", allowedChapters);
// //       } else {
// //         console.warn(`⚠️ No chapterAccess found for courseId ${courseId}`);
// //       }

// //       setAccessibleChapters(allowedChapters);

// //       // Fetch course details
// //       const courseRef = doc(db, "courses", courseId);
// //       const courseSnap = await getDoc(courseRef);
// //       if (courseSnap.exists()) {
// //         setCourse(courseSnap.data());
// //       } else {
// //         console.warn(`⚠️ No course found for ID ${courseId}`);
// //       }

// //       // Fetch chapters
// //       const chaptersRef = collection(db, "courses", courseId, "chapters");
// //       const chapterSnap = await getDocs(chaptersRef);
// //       setChapters(
// //         chapterSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// //       );

// //       // Fetch assignments
// //       const assignmentsRef = collection(db, "courses", courseId, "assignments");
// //       const assignmentSnap = await getDocs(assignmentsRef);
// //       setAssignments(
// //         assignmentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
// //       );

// //     } catch (err) {
// //       console.error("❌ Error fetching data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         fetchData(user);
// //       } else {
// //         setLoading(false);
// //       }
// //     });

// //     return () => unsubscribe();
// //   }, [courseId]);

// //   if (loading) {
// //     return <div className="p-8">Loading course details...</div>;
// //   }

// //   if (!course) {
// //     return <div className="p-8">Course not found.</div>;
// //   }

// //   return (
// //     <div className="p-8 max-w-4xl mx-auto">
// //       {/* Course Header */}
// //       <header className="mb-8">
// //         <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
// //         <p className="text-gray-700">{course.description}</p>
// //       </header>

// //       {/* Syllabus */}
// //       <section className="mb-10">
// //         <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
// //         <p className="bg-gray-50 p-4 rounded border">{course.syllabus}</p>
// //       </section>

// //       {/* Chapters */}
// //       <section className="mb-10">
// //         <h2 className="text-xl font-semibold mb-4">Chapters</h2>
// //         <div className="space-y-4">
// //           {chapters.map((chapter) => {
// //             const hasAccess = accessibleChapters.includes(chapter.id);
// //             return (
// //               <div
// //                 key={chapter.id}
// //                 className={`p-4 rounded border ${
// //                   hasAccess
// //                     ? "bg-white"
// //                     : "bg-gray-100 border-gray-300 cursor-not-allowed"
// //                 }`}
// //               >
// //                 <h3 className="font-semibold mb-2">{chapter.title}</h3>
// //                 {hasAccess ? (
// //                   <>
// //                     <p className="mb-3">{chapter.content}</p>
// //                     {chapter.videoLink && (
// //                       <video
// //                         src={chapter.videoLink}
// //                         controls
// //                         className="mt-2 w-full rounded border"
// //                       />
// //                     )}
// //                   </>
// //                 ) : (
// //                   <p className="italic text-gray-500">🔒 Locked</p>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* Assignments */}
// //       <section>
// //         <h2 className="text-xl font-semibold mb-4">Assignments</h2>
// //         {assignments.length > 0 ? (
// //           <div className="space-y-3">
// //             {assignments.map((assignment) => (
// //               <div
// //                 key={assignment.id}
// //                 className="p-3 border rounded bg-white shadow-sm"
// //               >
// //                 <h4 className="font-semibold">{assignment.title}</h4>
// //                 <p className="text-sm text-gray-600">
// //                   Due: {assignment.dueDate}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500 italic">No assignments available.</p>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }











// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../../../lib/firebase"; // adjust path
// import {
//   doc,
//   getDoc,
//   getDocs,
//   collection,
//   query,
//   where
// } from "firebase/firestore";

// export default function CourseDetailsPage() {
//   const { id: courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [chapters, setChapters] = useState([]);
//   const [assignments, setAssignments] = useState([]);
//   const [accessibleChapters, setAccessibleChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeChapter, setActiveChapter] = useState(null);

//   const fetchData = async (user) => {
//     console.log("✅ Logged-in UID:", user.uid);
//     let allowedChapters = [];

//     try {
//       // Student document
//       const directRef = doc(db, "students", user.uid);
//       const directSnap = await getDoc(directRef);
//       let studentData = null;

//       if (directSnap.exists()) {
//         studentData = directSnap.data();
//       } else {
//         const q = query(collection(db, "students"), where("uid", "==", user.uid));
//         const qSnap = await getDocs(q);
//         if (!qSnap.empty) {
//           studentData = qSnap.docs[0].data();
//         }
//       }

//       if (studentData?.chapterAccess && studentData.chapterAccess[courseId]) {
//         allowedChapters = studentData.chapterAccess[courseId];
//       }

//       setAccessibleChapters(allowedChapters);

//       // Course details
//       const courseRef = doc(db, "courses", courseId);
//       const courseSnap = await getDoc(courseRef);
//       if (courseSnap.exists()) {
//         setCourse(courseSnap.data());
//       }

//       // Chapters
//       const chaptersRef = collection(db, "courses", courseId, "chapters");
//       const chapterSnap = await getDocs(chaptersRef);
//       setChapters(chapterSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

//       // Assignments
//       const assignmentsRef = collection(db, "courses", courseId, "assignments");
//       const assignmentSnap = await getDocs(assignmentsRef);
//       setAssignments(assignmentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     } catch (err) {
//       console.error("❌ Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchData(user);
//       } else {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [courseId]);

//   // Convert YouTube URL to embed format
//   const getYouTubeEmbedUrl = (url) => {
//     try {
//       const urlObj = new URL(url);
//       if (urlObj.hostname.includes("youtube.com")) {
//         const videoId = urlObj.searchParams.get("v");
//         return `https://www.youtube.com/embed/${videoId}`;
//       } else if (urlObj.hostname.includes("youtu.be")) {
//         const videoId = urlObj.pathname.slice(1);
//         return `https://www.youtube.com/embed/${videoId}`;
//       }
//     } catch (e) {
//       console.error("Invalid video URL:", url);
//     }
//     return null;
//   };

//   if (loading) return <div className="p-8">Loading course details...</div>;
//   if (!course) return <div className="p-8">Course not found.</div>;

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       {/* Course Header */}
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
//         <p className="text-gray-700">{course.description}</p>
//       </header>

//       {/* Syllabus */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
//         <p className="bg-gray-50 p-4 rounded border">{course.syllabus}</p>
//       </section>

//       {/* Chapters */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold mb-4">Chapters</h2>
//         <div className="space-y-6">
//           {chapters.map((chapter) => {
//             const hasAccess = accessibleChapters.includes(chapter.id);
//             const embedUrl = getYouTubeEmbedUrl(chapter.video);
//             const isActive = activeChapter === chapter.id;

//             return (
//               <div
//                 key={chapter.id}
//                 onMouseEnter={() => setActiveChapter(chapter.id)}
//                 onMouseLeave={() => setActiveChapter(null)}
//                 onClick={() => setActiveChapter(chapter.id)}
//                 className={`p-6 rounded-lg border shadow-sm transition ${
//                   hasAccess
//                     ? "bg-white hover:shadow-md cursor-pointer"
//                     : "bg-gray-100 border-gray-300 cursor-not-allowed"
//                 }`}
//               >
//                 <h3 className="font-bold text-lg mb-3">{chapter.title}</h3>

//                 {hasAccess ? (
//                   <>
//                     {/* Content */}
//                     <div className="bg-gray-50 border rounded-md p-4 mb-3">
//                       <p className="whitespace-pre-wrap">{chapter.content}</p>
//                     </div>

//                     {/* Show video only if active */}
//                     {isActive && embedUrl && (
//                       <div className="aspect-w-16 aspect-h-9">
//                         <iframe
//                           src={embedUrl}
//                           title={chapter.title}
//                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                           allowFullScreen
//                           className="w-full h-full rounded-md border"
//                         ></iframe>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <p className="italic text-gray-500">🔒 Locked</p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* Assignments */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4">Assignments</h2>
//         {assignments.length > 0 ? (
//           <div className="space-y-3">
//             {assignments.map((assignment) => (
//               <div
//                 key={assignment.id}
//                 className="p-3 border rounded bg-white shadow-sm"
//               >
//                 <h4 className="font-semibold">{assignment.title}</h4>
//                 <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 italic">No assignments available.</p>
//         )}
//       </section>
//     </div>
//   );
// }



"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where
} from "firebase/firestore";
import CheckAuth from "@/lib/CheckAuth";

export default function CourseDetailsPage() {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [accessibleChapters, setAccessibleChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (urlObj.hostname.includes("youtu.be")) {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (err) {
      console.error("Invalid video URL:", url);
    }
    return null;
  };

  const fetchData = async (user) => {
    let allowedChapters = [];

    try {
      // Get student data
      const directRef = doc(db, "students", user.uid);
      const directSnap = await getDoc(directRef);
      let studentData = null;

      if (directSnap.exists()) {
        console.log("📄 Found student doc directly");
        studentData = directSnap.data();
      } else {
        console.warn("⚠️ No direct student doc, trying query...");
        const q = query(collection(db, "students"), where("uid", "==", user.uid));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          studentData = qSnap.docs[0].data();
        } else {
          console.error("❌ No student document found");
        }
      }

      // Allowed chapters
      if (studentData?.chapterAccess && studentData.chapterAccess[courseId]) {
        allowedChapters = studentData.chapterAccess[courseId];
        console.log("✅ Allowed chapters:", allowedChapters);
      }

      setAccessibleChapters(allowedChapters);

      // Course details
      const courseRef = doc(db, "courses", courseId);
      const courseSnap = await getDoc(courseRef);
      if (courseSnap.exists()) {
        setCourse(courseSnap.data());
      }

      // Chapters
      const chaptersRef = collection(db, "courses", courseId, "chapters");
      const chapterSnap = await getDocs(chaptersRef);
      const chapterData = chapterSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("📚 Chapters from Firestore:", chapterData);
      setChapters(chapterData);

      // Assignments
      const assignmentsRef = collection(db, "courses", courseId, "assignments");
      const assignmentSnap = await getDocs(assignmentsRef);
      setAssignments(
        assignmentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [courseId]);

  if (loading) return <div className="p-8">Loading course details...</div>;
  if (!course) return <div className="p-8">Course not found.</div>;

  return (
    <CheckAuth>
    <div className="p-8 max-w-4xl mx-auto">
      {/* Course Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-700">{course.description}</p>
      </header>

      {/* Syllabus */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
        <p className="bg-gray-50 p-4 rounded border">{course.syllabus}</p>
      </section>

      {/* Chapters */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Chapters</h2>
        <div className="space-y-10">
          {chapters.map((chapter) => {
            const hasAccess = accessibleChapters.includes(chapter.id);
            const embedUrl = getYouTubeEmbedUrl(chapter.video); // Change to chapter.videoLink if that's your field
            const isActive = activeChapter === chapter.id;

            console.log(`🎥 Chapter ${chapter.id} video:`, chapter.video, "Embed:", embedUrl);

            return (
              <div
                key={chapter.id}
                onClick={() => hasAccess && setActiveChapter(chapter.id)}
                onMouseEnter={() => hasAccess && setActiveChapter(chapter.id)}
                onMouseLeave={() => setActiveChapter(null)}
                className={`relative rounded-lg border shadow-sm transition overflow-hidden ${
                  hasAccess
                    ? "bg-white hover:shadow-md cursor-pointer"
                    : "bg-gray-100 border-gray-300 cursor-not-allowed"
                }`}
              >
                {/* Text */}
                <div className="p-6 relative z-10 bg-white/80 backdrop-blur-sm">
                  <h3 className="font-bold text-lg mb-3">{chapter.title}</h3>
                  {hasAccess ? (
                    <p className="whitespace-pre-wrap">{chapter.content}</p>
                  ) : (
                    <p className="italic text-gray-500">🔒 Locked</p>
                  )}
                </div>

                {/* Fullscreen-style Video */}
                {hasAccess && isActive && embedUrl && (
                  <div className="relative h-[70vh] sm:h-[90vh] w-full overflow-hidden">
                    <div className="absolute inset-0 z-0 scale-[1.4] origin-center">
                      <iframe
                        src={`${embedUrl}?autoplay=1&mute=1`}
                        title={chapter.title}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Assignments */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Assignments</h2>
        {assignments.length > 0 ? (
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-3 border rounded bg-white shadow-sm"
              >
                <h4 className="font-semibold">{assignment.title}</h4>
                <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No assignments available.</p>
        )}
      </section>
    </div>
    </CheckAuth>
  );
}
