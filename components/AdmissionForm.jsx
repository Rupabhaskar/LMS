// // "use client";

// // import { useState } from "react";
// // import { collection, addDoc } from "firebase/firestore";
// // import { db } from "@/lib/firebase";
// // import CheckAdminAuth from "@/lib/CheckAdminAuth";

// // export default function AdmissionForm() {
// //   const [formData, setFormData] = useState({
// //     regdNo: "",
// //     studentName: "",
// //     fatherName: "",
// //     presentAddress: "",
// //     aadharNo: "",
// //     gender: "",
// //     dob: "",
// //     email: "",
// //     phone1: "",
// //     phone2: "",
// //     qualification: "",
// //     college: "",
// //     degree: "",
// //     branch: "",
// //     yearOfPassing: "",
// //     workExperience: "",
// //     skillSet: "",
// //     courseTitle: "",
// //     company: "",
// //     dateOfJoining: "",
// //     timings: "",
// //     totalFee: "",
// //     installment1: "",
// //     installment2: "",
// //     due: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await addDoc(collection(db, "students"), formData);
// //       alert("Student added successfully!");
// //       setFormData({
// //         regdNo: "",
// //         studentName: "",
// //         fatherName: "",
// //         presentAddress: "",
// //         aadharNo: "",
// //         gender: "",
// //         dob: "",
// //         email: "",
// //         phone1: "",
// //         phone2: "",
// //         qualification: "",
// //         college: "",
// //         degree: "",
// //         branch: "",
// //         yearOfPassing: "",
// //         workExperience: "",
// //         skillSet: "",
// //         courseTitle: "",
// //         company: "",
// //         dateOfJoining: "",
// //         timings: "",
// //         totalFee: "",
// //         installment1: "",
// //         installment2: "",
// //         due: "",
// //       });
// //     } catch (error) {
// //       console.error("Error adding student: ", error);
// //       alert("Error saving student.");
// //     }
// //   };

// //   return (
// //     <CheckAdminAuth>
// //     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
// //       <h2 className="text-2xl font-bold mb-4 text-center">Admission Form</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* Example field */}
// //         <div>
// //           <label className="block font-medium">Student Name</label>
// //           <input
// //             type="text"
// //             name="studentName"
// //             value={formData.studentName}
// //             onChange={handleChange}
// //             className="w-full border p-2 rounded"
// //           />
// //         </div>

// //         {/* Add all other fields here (same as before) */}

// //         <div className="text-center">
// //           <button
// //             type="submit"
// //             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //     </CheckAdminAuth>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import CheckAdminAuth from "@/lib/CheckAdminAuth";

// export default function AdmissionForm() {
//   const [formData, setFormData] = useState({
//     regdNo: "",
//     studentName: "",
//     fatherName: "",
//     presentAddress: "",
//     aadharNo: "",
//     gender: "",
//     dob: "",
//     email: "",
//     phone1: "",
//     phone2: "",
//     qualification: "",
//     college: "",
//     degree: "",
//     branch: "",
//     yearOfPassing: "",
//     workExperience: "",
//     skillSet: "",
//     courseTitle: "",
//     company: "",
//     dateOfJoining: "",
//     timings: "",
//     totalFee: "",
//     installment1: "",
//     installment2: "",
//     due: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "students"), formData);
//       alert("✅ Student added successfully!");
//       setFormData({
//         regdNo: "",
//         studentName: "",
//         fatherName: "",
//         presentAddress: "",
//         aadharNo: "",
//         gender: "",
//         dob: "",
//         email: "",
//         phone1: "",
//         phone2: "",
//         qualification: "",
//         college: "",
//         degree: "",
//         branch: "",
//         yearOfPassing: "",
//         workExperience: "",
//         skillSet: "",
//         courseTitle: "",
//         company: "",
//         dateOfJoining: "",
//         timings: "",
//         totalFee: "",
//         installment1: "",
//         installment2: "",
//         due: "",
//       });
//     } catch (error) {
//       console.error("Error adding student: ", error);
//       alert("❌ Error saving student.");
//     }
//   };

//   return (
//     <CheckAdminAuth>
//       <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//           🎓 Admission Form
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* Personal Info */}
//           <section>
//             <h3 className="text-xl font-semibold mb-4 border-b pb-2">
//               Personal Information
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium">Regd. No.</label>
//                 <input
//                   type="text"
//                   name="regdNo"
//                   value={formData.regdNo}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Student Name</label>
//                 <input
//                   type="text"
//                   name="studentName"
//                   value={formData.studentName}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Father's Name</label>
//                 <input
//                   type="text"
//                   name="fatherName"
//                   value={formData.fatherName}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Aadhar No.</label>
//                 <input
//                   type="text"
//                   name="aadharNo"
//                   value={formData.aadharNo}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <label className="block font-medium">Present Address</label>
//                 <textarea
//                   name="presentAddress"
//                   value={formData.presentAddress}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Contact Info */}
//           <section>
//             <h3 className="text-xl font-semibold mb-4 border-b pb-2">
//               Contact Information
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Phone 1</label>
//                 <input
//                   type="tel"
//                   name="phone1"
//                   value={formData.phone1}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Phone 2</label>
//                 <input
//                   type="tel"
//                   name="phone2"
//                   value={formData.phone2}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Education */}
//           <section>
//             <h3 className="text-xl font-semibold mb-4 border-b pb-2">
//               Educational Details
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium">Qualification</label>
//                 <input
//                   type="text"
//                   name="qualification"
//                   value={formData.qualification}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">College / University</label>
//                 <input
//                   type="text"
//                   name="college"
//                   value={formData.college}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Degree</label>
//                 <input
//                   type="text"
//                   name="degree"
//                   value={formData.degree}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Branch</label>
//                 <input
//                   type="text"
//                   name="branch"
//                   value={formData.branch}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Year of Passing</label>
//                 <input
//                   type="number"
//                   name="yearOfPassing"
//                   value={formData.yearOfPassing}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Course Details */}
//           <section>
//             <h3 className="text-xl font-semibold mb-4 border-b pb-2">
//               Course Details
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium">Course / Project Title</label>
//                 <input
//                   type="text"
//                   name="courseTitle"
//                   value={formData.courseTitle}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Company</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Date of Joining</label>
//                 <input
//                   type="date"
//                   name="dateOfJoining"
//                   value={formData.dateOfJoining}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Timings</label>
//                 <input
//                   type="text"
//                   name="timings"
//                   value={formData.timings}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Fee Details */}
//           <section>
//             <h3 className="text-xl font-semibold mb-4 border-b pb-2">
//               Fee Details
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium">Total Fee</label>
//                 <input
//                   type="number"
//                   name="totalFee"
//                   value={formData.totalFee}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Installment 1</label>
//                 <input
//                   type="number"
//                   name="installment1"
//                   value={formData.installment1}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Installment 2</label>
//                 <input
//                   type="number"
//                   name="installment2"
//                   value={formData.installment2}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Due</label>
//                 <input
//                   type="number"
//                   name="due"
//                   value={formData.due}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Submit */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
//             >
//               Submit Admission
//             </button>
//           </div>
//         </form>
//       </div>
//     </CheckAdminAuth>
//   );
// }

"use client";

import { useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CheckAdminAuth from "@/lib/CheckAdminAuth";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    regdNo: "",
    studentName: "",
    fatherName: "",
    presentAddress: "",
    aadharNo: "",
    gender: "",
    dob: "",
    email: "",
    phone1: "",
    phone2: "",
    qualification: "",
    college: "",
    degree: "",
    branch: "",
    yearOfPassing: "",
    workExperience: "",
    skillSet: "",
    courseTitle: "",
    company: "",
    dateOfJoining: "",
    timings: "",
    totalFee: "",
    installment1: "",
    installment2: "",
    due: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!formData.regdNo) {
      alert("❌ Registration No. is required.");
      return;
    }
    if (!formData.phone1) {
      alert("❌ Primary Phone (Phone 1) is required.");
      return;
    }
    if (!formData.studentName || !formData.email) {
      alert("❌ Student Name and Email are required.");
      return;
    }

    // 👇 Map AdmissionForm fields to what API expects
    const payload = {
      name: formData.studentName,
      email: formData.email,
      phone: formData.phone1,
      classId: formData.courseTitle || "general", // fallback if no course chosen
    };

    const res = await fetch("/api/create-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add student");

    alert("✅ Student added successfully! Default Password: Vawe@2025");

    // Reset form
    setFormData({
      regdNo: "",
      studentName: "",
      fatherName: "",
      presentAddress: "",
      aadharNo: "",
      gender: "",
      dob: "",
      email: "",
      phone1: "",
      phone2: "",
      qualification: "",
      college: "",
      degree: "",
      branch: "",
      yearOfPassing: "",
      workExperience: "",
      skillSet: "",
      courseTitle: "",
      company: "",
      dateOfJoining: "",
      timings: "",
      totalFee: "",
      installment1: "",
      installment2: "",
      due: "",
    });

  } catch (error) {
    console.error("Error adding student: ", error);
    alert("❌ Error saving student. " + error.message);
  }
};



  return (
    <CheckAdminAuth>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          🎓 Admission Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Personal Info */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Regd. No. (Unique)</label>
                <input
                  type="text"
                  name="regdNo"
                  value={formData.regdNo}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Aadhar No.</label>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-medium">Present Address</label>
                <textarea
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Phone 1 (Primary)</label>
                <input
                  type="tel"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <p className="text-sm text-gray-500">⚠️ Must be unique</p>
              </div>
              <div>
                <label className="block font-medium">Phone 2</label>
                <input
                  type="tel"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Educational Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">College / University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Year of Passing</label>
                <input
                  type="number"
                  name="yearOfPassing"
                  value={formData.yearOfPassing}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Course Details */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Course Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Course / Project Title</label>
                <input
                  type="text"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Timings</label>
                <input
                  type="text"
                  name="timings"
                  value={formData.timings}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Fee Details */}
          <section>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Fee Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Total Fee</label>
                <input
                  type="number"
                  name="totalFee"
                  value={formData.totalFee}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Installment 1</label>
                <input
                  type="number"
                  name="installment1"
                  value={formData.installment1}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Installment 2</label>
                <input
                  type="number"
                  name="installment2"
                  value={formData.installment2}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Due</label>
                <input
                  type="number"
                  name="due"
                  value={formData.due}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Submit Admission
            </button>
          </div>
        </form>
      </div>
    </CheckAdminAuth>
  );
}




