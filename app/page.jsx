
// // // import { Suspense } from 'react';
// // // import HomePage from './components/Homepage';
// // // import Footer from './components/Footer';


// // // export default function Page() {
// // //   return (
// // //     <>
// // //     <Suspense fallback={<div>Loading home page...</div>}>
// // //       <HomePage/>
// // //     </Suspense>
// // //     <Footer/>
// // //     </>
// // //   );
// // // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { auth, firebaseAuth } from "../lib/firebase";

// // export default function HomePage() {
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const unsub = firebaseAuth.onAuthStateChanged(auth, (u) => setUser(u));
// //     return () => unsub();
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center py-16 text-center">
// //       <h1 className="text-4xl font-bold mb-4 text-gray-800">
// //         Welcome to the Programming Practice App
// //       </h1>
// //       <p className="text-lg text-gray-600 mb-8 max-w-2xl">
// //         Practice Java MCQs, coding challenges, and learn from tutorials.  
// //         Supports Java, Python, C, JavaScript, HTML & CSS.
// //       </p>

// //       {!user ? (
// //         <div className="space-x-4">
// //           <Link
// //             href="/auth/login"
// //             className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
// //           >
// //             Login
// //           </Link>
// //           <Link
// //             href="/auth/register"
// //             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
// //           >
// //             Register
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="space-x-4">
// //           <Link
// //             href="/dashboard"
// //             className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
// //           >
// //             Go to Dashboard
// //           </Link>
// //           <button
// //             onClick={() => firebaseAuth.logout()}
// //             className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { auth, firebaseAuth } from "../lib/firebase";

// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const unsub = firebaseAuth.onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });
    
//     // Trigger animations after component mounts
//     setTimeout(() => setIsVisible(true), 100);
    
//     return () => unsub();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
//         <div className="absolute top-1/4 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
//       </div>

//       {/* Navigation */}
//       <nav className="relative z-10 w-full px-8 py-6">
//         <div className="w-full flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-white font-black text-xl">V</span>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-white font-bold text-xl">VAVE Institute</span>
//               <span className="text-gray-400 text-sm">Technology Excellence</span>
//             </div>
//           </div>
          
//           {user && (
//             <div className="flex items-center space-x-6">
//               <span className="text-gray-300 font-medium">Welcome back, {user.displayName || 'Student'}!</span>
//               <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
//                 <span className="text-white text-sm font-bold">
//                   {user.email?.[0]?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section - Full Width */}
//       <section className="relative z-10 w-full px-8 pt-16 pb-24">
//         <div className="w-full">
//           <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             {/* Badge */}
//             <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
//               <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text text-sm font-bold tracking-wider uppercase">
//                 🚀 India's Premier Tech Institute
//               </span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight">
//               <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 text-transparent bg-clip-text">
//                 Code Your
//               </span>
//               <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
//                 Future Today
//               </span>
//             </h1>

//             {/* Subtitle */}
//             <p className={`text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               Master <span className="text-blue-400 font-bold">Full Stack Development</span>, 
//               <span className="text-purple-400 font-bold"> AI & Machine Learning</span>, and 
//               <span className="text-pink-400 font-bold"> Cloud Technologies</span><br />
//               at India's most innovative tech institute in <span className="text-yellow-400 font-bold">Vijayawada</span>
//             </p>

//             {/* CTA Section */}
//             <div className={`mb-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               {!user ? (
//                 <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
//                   <Link href="/auth/register" className="group relative">
//                     <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
//                     <div className="relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl text-white font-black text-xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
//                       🎯 Begin Your Journey
//                       <span className="ml-3 group-hover:translate-x-2 inline-block transition-transform duration-300">→</span>
//                     </div>
//                   </Link>
//                   <Link href="/auth/login" className="group relative">
//                     <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
//                     <div className="relative px-12 py-6 bg-transparent border-3 border-cyan-400/50 rounded-3xl text-cyan-300 font-black text-xl hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 transition-all duration-300 transform hover:scale-105 shadow-xl">
//                       🔐 Student Login
//                     </div>
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
//                   <Link href="/dashboard" className="group relative">
//                     <div className="absolute -inset-2 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
//                     <div className="relative px-12 py-6 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 rounded-3xl text-white font-black text-xl hover:from-green-700 hover:via-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
//                       📊 Open Dashboard
//                       <span className="ml-3 group-hover:translate-x-2 inline-block transition-transform duration-300">→</span>
//                     </div>
//                   </Link>
//                   <button 
//                     onClick={() => firebaseAuth.logout()}
//                     className="group relative px-10 py-5 bg-transparent border-3 border-red-500/50 rounded-3xl text-red-400 font-black text-xl hover:border-red-400 hover:bg-red-500/10 transition-all duration-300 transform hover:scale-105 shadow-xl"
//                   >
//                     🚪 Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Enhanced Stats */}
//             <div className={`grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <StatCard number="2000+" label="Alumni Placed" color="from-blue-400 to-cyan-400" />
//               <StatCard number="98%" label="Success Rate" color="from-green-400 to-emerald-400" />
//               <StatCard number="100+" label="Partner Companies" color="from-purple-400 to-pink-400" />
//               <StatCard number="15+" label="Years Excellence" color="from-yellow-400 to-orange-400" />
//             </div>

//             {/* Tech Stack Preview */}
//             <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <p className="text-gray-400 text-lg mb-6">Master the technologies that power tomorrow</p>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <TechBadge name="React" color="bg-blue-500" />
//                 <TechBadge name="Python" color="bg-yellow-500" />
//                 <TechBadge name="Java" color="bg-orange-500" />
//                 <TechBadge name="Node.js" color="bg-green-500" />
//                 <TechBadge name="AWS" color="bg-purple-500" />
//                 <TechBadge name="MongoDB" color="bg-emerald-500" />
//                 <TechBadge name="Docker" color="bg-cyan-500" />
//                 <TechBadge name="AI/ML" color="bg-pink-500" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Full Width */}
//       <section className="relative z-10 w-full px-8 py-24 bg-black/30 backdrop-blur-sm">
//         <div className="w-full">
//           <div className="text-center mb-20">
//             <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8">
//               <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
//                 Why Choose 
//               </span>
//               <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
//                 VAVE?
//               </span>
//             </h2>
//             <p className="text-2xl text-gray-400">
//               Experience next-generation tech education designed for industry leaders
//             </p>
//           </div>

//           <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
//             <FeatureCard
//               title="Full Stack Mastery"
//               description="Complete MERN/MEAN stack development with modern frameworks, microservices architecture, and cloud deployment strategies."
//               icon="🎯"
//               gradient="from-blue-600 to-cyan-500"
//               delay="0"
//             />
//             <FeatureCard
//               title="AI & Machine Learning"
//               description="Deep learning, neural networks, computer vision, and NLP with hands-on projects using TensorFlow and PyTorch."
//               icon="🧠"
//               gradient="from-purple-600 to-pink-500"
//               delay="200"
//             />
//             <FeatureCard
//               title="Cloud & DevOps"
//               description="AWS, Azure, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code for scalable applications."
//               icon="☁️"
//               gradient="from-green-600 to-teal-500"
//               delay="400"
//             />
//             <FeatureCard
//               title="Industry Mentorship"
//               description="Learn from senior developers at Google, Microsoft, Amazon with real-world project experience and code reviews."
//               icon="👨‍💻"
//               gradient="from-orange-600 to-red-500"
//               delay="600"
//             />
//             <FeatureCard
//               title="Government Certified"
//               description="AICTE approved programs with industry-recognized certifications that add credibility to your resume."
//               icon="🏆"
//               gradient="from-yellow-600 to-orange-500"
//               delay="800"
//             />
//             <FeatureCard
//               title="Job Guarantee"
//               description="100% placement assistance with 50+ hiring partners including startups and Fortune 500 companies."
//               icon="💼"
//               gradient="from-indigo-600 to-purple-600"
//               delay="1000"
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section - Full Width */}
//       <section className="relative z-10 w-full px-8 py-32">
//         <div className="w-full text-center">
//           <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8">
//             <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
//               Ready to 
//             </span>
//             <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
//               Transform?
//             </span>
//           </h2>
//           <p className="text-2xl text-gray-300 mb-16 leading-relaxed">
//             Join 2000+ successful graduates who've launched their dream careers<br />
//             with India's most innovative tech institute
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
//             <a
//               href="https://www.vaweinstitute.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative"
//             >
//               <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
//               <div className="relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl text-white font-black text-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
//                 🌐 Explore Campus
//                 <span className="ml-3 group-hover:translate-x-2 inline-block transition-transform duration-300">↗</span>
//               </div>
//             </a>
//             {!user && (
//               <Link href="/auth/register" className="group relative">
//                 <div className="relative px-12 py-6 bg-transparent border-3 border-white/30 rounded-3xl text-white font-black text-xl hover:border-white/60 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-xl">
//                   🚀 Start Free Trial
//                 </div>
//               </Link>
//             )}
//           </div>

//           {/* Contact Info */}
//           <div className="grid sm:grid-cols-3 gap-8 text-center">
//             <ContactCard icon="📍" title="Visit Us" info="Vijayawada, Andhra Pradesh" />
//             <ContactCard icon="📞" title="Call Us" info="+91 9876543210" />
//             <ContactCard icon="✉️" title="Email Us" info="info@vaweinstitute.com" />
//           </div>
//         </div>
//       </section>

//       {/* Footer - Full Width */}
//       <footer className="relative z-10 w-full border-t border-gray-800 bg-black/50 backdrop-blur-sm">
//         <div className="w-full px-8 py-16">
//           <div className="flex flex-col items-center space-y-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-black text-xl">V</span>
//               </div>
//               <div className="text-center">
//                 <span className="text-white font-black text-2xl block">VAVE Institute of Technology</span>
//                 <span className="text-gray-400 text-sm">Shaping Tomorrow's Tech Leaders</span>
//               </div>
//             </div>
            
//             <p className="text-gray-300 text-center text-lg leading-relaxed">
//               Empowering the next generation of technology professionals with cutting-edge education,<br />
//               industry partnerships, and career-focused training programs.
//             </p>
            
//             <div className="text-gray-500 text-center">
//               <p className="text-lg">&copy; 2024 VAVE Institute of Technology. All rights reserved.</p>
//               <p className="mt-2 text-gray-400">Vijayawada, India • Global Virtual Campus • ISO 9001:2015 Certified</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function StatCard({ number, label, color }) {
//   return (
//     <div className="text-center group cursor-pointer">
//       <div className={`text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r ${color} text-transparent bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300`}>
//         {number}
//       </div>
//       <div className="text-gray-400 text-lg font-bold uppercase tracking-wider">
//         {label}
//       </div>
//     </div>
//   );
// }

// function TechBadge({ name, color }) {
//   return (
//     <div className={`px-4 py-2 ${color} rounded-full text-white font-bold text-sm hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg`}>
//       {name}
//     </div>
//   );
// }

// function ContactCard({ icon, title, info }) {
//   return (
//     <div className="group cursor-pointer">
//       <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
//       <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
//       <p className="text-gray-400">{info}</p>
//     </div>
//   );
// }

// function FeatureCard({ title, description, icon, gradient, delay }) {
//   return (
//     <div 
//       className={`group relative p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-gray-800 hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/20`}
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       {/* Background glow effect */}
//       <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
      
//       {/* Icon */}
//       <div className="text-6xl mb-8 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
//         {icon}
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         <h3 className="text-2xl font-black mb-6 text-white group-hover:text-gray-100 transition-colors duration-300">
//           {title}
//         </h3>
//         <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
//           {description}
//         </p>
//       </div>
      
//       {/* Bottom accent */}
//       <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, firebaseAuth } from "../lib/firebase";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          VAVE Institute of Technology
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mb-8 leading-relaxed">
          Learn <span className="font-semibold">Java, Python, C Programming, Web Technologies, and Full Stack Development</span>  
          with{" "}
          <span className="font-semibold">Government-Recognized Certifications</span>.  
          Join from anywhere with our live virtual classes or train at our Vijayawada campus.
        </p>

        {!user ? (
          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="bg-white text-blue-800 px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-green-600 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-purple-600 transition"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => firebaseAuth.logout()}
              className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Why Choose Us?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
          <FeatureCard
            title="Full Stack Development"
            description="Master front-end, back-end, and databases with real projects."
          />
          <FeatureCard
            title="Programming Languages"
            description="Java, Python, C — from beginner to advanced."
          />
          <FeatureCard
            title="Web Technologies"
            description="HTML, CSS, JavaScript, React, and modern frameworks."
          />
          <FeatureCard
            title="Flexible Learning"
            description="Attend in-person or join our virtual live classes."
          />
          <FeatureCard
            title="Government Certifications"
            description="Industry-recognized certificates to boost your career."
          />
          <FeatureCard
            title="Career Support"
            description="Placement assistance and interview preparation."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-16 px-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white">
        <h2 className="text-3xl font-bold mb-6">Start Your Tech Journey Today</h2>
        <p className="mb-8 max-w-3xl mx-auto">
          Whether you want to master a single language or become a full-stack developer,
          we have the right program for you. Learn from expert trainers with hands-on experience.
        </p>
        <a
          href="https://www.vaweinstitute.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-blue-800 px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-gray-200 transition"
        >
          Visit Our Official Website
        </a>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition text-left w-full">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

