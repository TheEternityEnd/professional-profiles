"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/profile-form";

interface UserData {
  name: string;
  email: string;
  title: string;
  createdAt: any;
}

export default function UserProfilePage() {
  const { uid } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Verificar si el usuario autenticado coincide con el uid de la URL
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== uid) {
      router.push("/"); // Redirige si no coincide
      return;
    }

    // Obtener datos del usuario desde Firestore
    const fetchUserData = async () => {
      const docRef = doc(db, "users", uid!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data() as UserData);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [uid, router]);

  if (loading) return <p className="text-center mt-12">Cargando perfil...</p>;

  if (showForm) {
    // Mostrar formulario de perfil para actualizar información
    return <ProfileForm />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{userData?.name}</h1>
        <p className="text-lg text-muted-foreground mb-2">{userData?.title}</p>
        <p className="text-sm text-muted-foreground mb-6">Email: {userData?.email}</p>

        {/* Botón para editar perfil */}
        <Button onClick={() => setShowForm(true)}>Editar / Completar Perfil</Button>
      </div>
    </div>
  );
}
