"use client";
import { useState } from "react";

export default function AuthForm({ onSubmit, submitLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="bg-white p-6 rounded shadow space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block font-medium">Email</label>
        <input
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {submitLabel}
      </button>
    </form>
  );
}
