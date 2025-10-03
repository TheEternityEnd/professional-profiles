"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Briefcase, GraduationCap, Award } from "lucide-react"

interface Experience {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: string
  degree: string
  institution: string
  year: string
}

interface ProfileData {
  name: string
  headline: string
  about: string
  location: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
}

export function ProfileView({ profileData }: { profileData: ProfileData | null }) {
  const [profile, setProfile] = useState<ProfileData | null>(profileData)

  useEffect(() => {
    if (!profileData) {
      const stored = localStorage.getItem("userProfile")
      if (stored) {
        setProfile(JSON.parse(stored))
      }
    }
  }, [profileData])

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">No se encontró información del perfil</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Presente"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32 text-3xl">
              <AvatarFallback className="bg-accent text-accent-foreground">{getInitials(profile.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h1>
                <p className="text-lg text-muted-foreground">{profile.headline}</p>
              </div>

              {profile.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Acerca de
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed whitespace-pre-line">{profile.about}</p>
        </CardContent>
      </Card>

      {/* Experience Section */}
      {profile.experiences?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Experiencia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-accent pl-4 space-y-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-muted-foreground font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && <p className="text-foreground leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education Section */}
      {profile.education?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Educación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-accent pl-4 space-y-1">
                <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-muted-foreground font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.year}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills Section */}
      {profile.skills?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Habilidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
