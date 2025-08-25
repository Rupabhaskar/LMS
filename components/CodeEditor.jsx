// "use client";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// export default function CodeEditor({ language = "java", starterCode = "" }) {
//   const [code, setCode] = useState(starterCode || getDefaultStarter(language));
//   const [output, setOutput] = useState("");

//   async function runCode() {
//     setOutput("Running...");
//     try {
//       const res = await fetch("/api/compile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ language, source: code, stdin: "" })
//       });
//       const data = await res.json();
//       const stdout = data.stdout || data.compile_output || data.stderr || "";
//       setOutput(stdout);
//     } catch (err) {
//       setOutput("Error: " + err.message);
//     }
//   }

//   return (
//     <div>
//       <div className="h-96 border rounded">
//         <MonacoEditor
//           height="100%"
//           defaultLanguage={mapLanguage(language)}
//           defaultValue={code}
//           onChange={(value) => setCode(value || "")}
//         />
//       </div>
//       <button
//         onClick={runCode}
//         className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Run
//       </button>
//       <pre className="mt-4 p-2 bg-black text-white rounded">{output}</pre>
//     </div>
//   );
// }

// function getDefaultStarter(lang) {
//   if (lang === "java") return `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`;
//   if (lang === "python") return `print("Hello, World!")`;
//   if (lang === "c") return `#include <stdio.h>\nint main(){ printf("Hello, World!\\n"); return 0; }`;
//   return "";
// }

// function mapLanguage(lang) {
//   if (lang === "java") return "java";
//   if (lang === "python") return "python";
//   if (lang === "c") return "c";
//   if (lang === "javascript") return "javascript";
//   return "plaintext";
// }


"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor({ language = "java", starterCode = "" }) {
  const [code, setCode] = useState(starterCode || getDefaultStarter(language));
  const [output, setOutput] = useState("");

  // ✅ Update code when language changes
  useEffect(() => {
    setCode(starterCode || getDefaultStarter(language));
  }, [language, starterCode]);

  async function runCode() {
    setOutput("Running...");
    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, source: code, stdin: "" })
      });
      const data = await res.json();
      const stdout = data.stdout || data.compile_output || data.stderr || "";
      setOutput(stdout);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  return (
    <div>
      <div className="h-96 border rounded">
        <MonacoEditor
          height="100%"
          language={mapLanguage(language)} // ✅ use language instead of defaultLanguage
          value={code}                    // ✅ bind editor value to state
          onChange={(value) => setCode(value || "")}
          options={{ fontSize: 14 }}
        />
      </div>
      <button
        onClick={runCode}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Run
      </button>
      <pre className="mt-4 p-2 bg-black text-white rounded">{output}</pre>
    </div>
  );
}

function getDefaultStarter(lang) {
  if (lang === "java") return `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`;
  if (lang === "python") return `print("Hello, Python!")`;
  if (lang === "c") return `#include <stdio.h>\nint main(){\n printf("Hello, C!\\n");\n return 0;\n }`;
  if (lang === "javascript") return `console.log("Hello, JavaScript!");`;
  return "";
}

function mapLanguage(lang) {
  if (lang === "java") return "java";
  if (lang === "python") return "python";
  if (lang === "c") return "c";
  if (lang === "javascript") return "javascript";
  return "plaintext";
}
