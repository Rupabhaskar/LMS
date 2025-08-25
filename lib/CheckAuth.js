

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth } from './config';


// export default function CheckAuth({ children }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         router.replace('/Admin/login');
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, [router]);

//   if (isLoading) {
//     return (
//       <main className="flex items-center justify-center h-screen">
//         <div className="text-lg font-medium">Checking authentication...</div>
//       </main>
//     );
//   }

//   return isAuthenticated ? <>{children}</> : null;
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";

export default function CheckAuth({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth/login"); // redirect if not logged in
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
