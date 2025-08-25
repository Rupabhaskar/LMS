// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { language, source, stdin } = await req.json();

//   const langMap = {
//     c: 50,
//     cpp: 54,
//     java: 62,
//     python: 71,
//     javascript: 63
//   };
//   const language_id = langMap[language] || 62;

//   const JUDGE0_URL = process.env.JUDGE0_URL;
//   const JUDGE0_RAPIDAPI_KEY = process.env.JUDGE0_RAPIDAPI_KEY;
//   const JUDGE0_RAPIDAPI_HOST = process.env.JUDGE0_RAPIDAPI_HOST;

//   try {
//     const submissionRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-RapidAPI-Key": JUDGE0_RAPIDAPI_KEY,
//         "X-RapidAPI-Host": JUDGE0_RAPIDAPI_HOST
//       },
//       body: JSON.stringify({
//         source_code: source,
//         stdin: stdin || "",
//         language_id
//       })
//     });
//     const result = await submissionRes.json();
//     return NextResponse.json(result);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req) {
  const { language, source, stdin } = await req.json();

  // Judge0 language ID map
  const langMap = {
    c: 50,
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63
  };

  const language_id = langMap[language] || 62; // fallback Java

  // Read environment variables
  const JUDGE0_URL = process.env.JUDGE0_URL;
  const JUDGE0_RAPIDAPI_KEY = process.env.JUDGE0_RAPIDAPI_KEY;
  const JUDGE0_RAPIDAPI_HOST = process.env.JUDGE0_RAPIDAPI_HOST;

  if (!JUDGE0_URL || !JUDGE0_RAPIDAPI_KEY || !JUDGE0_RAPIDAPI_HOST) {
    return NextResponse.json(
      { error: "Missing Judge0 environment variables" },
      { status: 500 }
    );
  }

  try {
    const submissionRes = await fetch(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": JUDGE0_RAPIDAPI_KEY,
          "X-RapidAPI-Host": JUDGE0_RAPIDAPI_HOST,
        },
        body: JSON.stringify({
          source_code: source,
          stdin: stdin || "",
          language_id
        }),
      }
    );

    const result = await submissionRes.json();

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
