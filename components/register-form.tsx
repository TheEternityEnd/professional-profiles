"use client"; // si usas Next.js con app router

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Usuario registrado correctamente");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 p-4 border rounded-lg w-80">
      <h2 className="text-xl font-bold">Registro</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Registrarse
      </button>
    </form>
  );
}
