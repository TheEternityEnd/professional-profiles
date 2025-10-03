import { ProfileForm } from "@/components/profile-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RegisterForm from "@/components/register-form"
import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">ProNetwork</h1>
          <Link href="/profile/demo">
            <Button variant="outline">Ver Perfil Demo</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
              Crea tu perfil profesional
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Comparte tu experiencia, habilidades y logros con el mundo profesional
            </p>
          </div>

          {/* Formulario de Perfil */}
          <ProfileForm />

          {/* Autenticación */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <RegisterForm />
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  )
}
