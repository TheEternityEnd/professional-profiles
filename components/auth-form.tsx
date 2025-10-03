"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(true); // por defecto: registro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegister) {
        // 1. Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        // 2. Guardar info en Firestore bajo el UID del usuario
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          title: formData.title,
          createdAt: new Date(),
        });

        alert("✅ Usuario registrado y datos guardados en Firestore");
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("✅ Sesión iniciada");
      }

      setFormData({ name: "", email: "", password: "", title: "" });
    } catch (error: any) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto border p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Registro" : "Iniciar Sesión"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Título profesional"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>

      <p className="mt-4 text-center">
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Inicia sesión aquí" : "Regístrate aquí"}
        </button>
      </p>
    </div>
  );
}
