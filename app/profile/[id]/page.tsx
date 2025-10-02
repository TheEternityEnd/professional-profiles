import { ProfileView } from "@/components/profile-view"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Demo data for the demo profile
const demoProfile = {
  name: "María García",
  headline: "Desarrolladora Full Stack | Especialista en React y Node.js",
  about:
    "Desarrolladora apasionada con más de 5 años de experiencia creando aplicaciones web modernas y escalables. Me especializo en el ecosistema de JavaScript, con un enfoque particular en React, Next.js y Node.js. Me encanta resolver problemas complejos y crear experiencias de usuario excepcionales.",
  location: "Barcelona, España",
  experiences: [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      startDate: "2021-03",
      endDate: "",
      description:
        "Liderando el desarrollo de aplicaciones web empresariales utilizando React, Next.js y Node.js. Implementación de arquitecturas escalables y mejores prácticas de desarrollo.",
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Digital Innovations",
      startDate: "2019-06",
      endDate: "2021-02",
      description:
        "Desarrollo de interfaces de usuario responsivas y accesibles. Colaboración con equipos de diseño y backend para crear experiencias fluidas.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Ingeniería Informática",
      institution: "Universidad Politécnica de Cataluña",
      year: "2019",
    },
    {
      id: "2",
      degree: "Master en Desarrollo Web",
      institution: "ESADE Business School",
      year: "2020",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
    "Tailwind CSS",
  ],
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const isDemo = params.id === "demo"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-foreground hover:text-accent transition-colors">ProNetwork</h1>
          </Link>
          <div className="flex gap-2">
            {isDemo && (
              <Link href="/">
                <Button>Crear Mi Perfil</Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="outline">Volver</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProfileView profileData={isDemo ? demoProfile : null} />
      </main>
    </div>
  )
}
