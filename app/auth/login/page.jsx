"use client";
import AuthForm from "../../../components/AuthForm";
import { firebaseAuth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(email, password) {
    try {
      await firebaseAuth.login(email, password);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <AuthForm onSubmit={handleLogin} submitLabel="Login" />
    </div>
  );
}
