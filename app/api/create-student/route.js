// app/api/create-student/route.js
import admin from "../../../lib/firebaseAdmin";

export async function POST(req) {
  const body = await req.json();
  const { email, name, phone, classId } = body;
  const defaultPassword = "Vawe@2025";

  if (!email || !name || !classId) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password: defaultPassword,
      displayName: name,
    });

    // Save student in Firestore
    await admin.firestore().collection("students").add({
      name,
      phone,
      email,
      classId,
      uid: userRecord.uid,
      role: "student",
      password: defaultPassword, // storing plain text password is not secure
      coursesAccess: [],
    });

    return new Response(
      JSON.stringify({ success: true, uid: userRecord.uid }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
