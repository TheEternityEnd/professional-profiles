"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"

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

export function ProfileForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [headline, setHeadline] = useState("")
  const [about, setAbout] = useState("")
  const [location, setLocation] = useState("")
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState("")

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        degree: "",
        institution: "",
        year: "",
      },
    ])
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()])
      setCurrentSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store in localStorage for demo purposes
    const profileData = {
      name,
      headline,
      about,
      location,
      experiences,
      education,
      skills,
    }
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    router.push("/profile/user")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
          <CardDescription>Cuéntanos sobre ti</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Pérez" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Título Profesional</Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Desarrollador Full Stack | Especialista en React"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Madrid, España"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">Acerca de</Label>
            <Textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Describe tu experiencia, pasiones y objetivos profesionales..."
              rows={6}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experiencia Profesional</CardTitle>
          <CardDescription>Añade tu historial laboral</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-4 p-4 border border-border rounded-lg relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeExperience(exp.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                    placeholder="Desarrollador Senior"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Tech Company"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fecha Inicio</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fecha Fin</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    placeholder="Dejar vacío si es actual"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Describe tus responsabilidades y logros..."
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addExperience} className="w-full bg-transparent">
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Experiencia
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Educación</CardTitle>
          <CardDescription>Añade tu formación académica</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-4 p-4 border border-border rounded-lg relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeEducation(edu.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Ingeniería Informática"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institución</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="Universidad Politécnica"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Año</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                    placeholder="2020"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addEducation} className="w-full bg-transparent">
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Educación
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Habilidades</CardTitle>
          <CardDescription>Añade tus competencias profesionales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="JavaScript, React, Node.js..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addSkill()
                }
              }}
            />
            <Button type="button" onClick={addSkill}>
              Añadir
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Crear Perfil
      </Button>
    </form>
  )
}
