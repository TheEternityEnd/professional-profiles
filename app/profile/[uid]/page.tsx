"use client";

import { useState, useEffect } from "react";
import { ProfileView } from "@/components/profile-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push("/"); // si no hay usuario autenticado, redirige
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log("No existe el perfil del usuario");
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
              ProNetwork
            </h1>
          </Link>
          <div className="flex gap-2">
            <Link href="/profile-form">
              <Button>Editar Mi Perfil</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Volver</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {profileData ? (
          <ProfileView profileData={profileData} />
        ) : (
          <p>Cargando perfil...</p>
        )}
      </main>
    </div>
  );
}
