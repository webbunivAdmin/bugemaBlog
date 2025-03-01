"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { ImageUpload } from "@/components/ui/image-upload"
import { toast } from "sonner"
import { useSignUp } from "@/lib/hooks/use-auth"
import Image from "next/image"

const formSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.string().optional(),
  accountType: z.enum(["Admin", "Writer"]).default("Writer"),
})

type FormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const router = useRouter()
  const backgroundRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
      accountType: "Writer",
    },
  })

  const { mutate: signUp, isPending } = useSignUp()

  async function onSubmit(values: FormData) {
    signUp(values)
  }

  // Animation for floating particles
  useEffect(() => {
    const createParticle = () => {
      if (!backgroundRef.current) return null

      const particle = document.createElement("div")
      const size = Math.random() * 10 + 2
      const duration = Math.random() * 15 + 5
      const xPos = Math.random() * 100
      const delay = Math.random() * 5

      particle.className = "absolute rounded-full"
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.background = Math.random() > 0.6 ? "rgba(236, 72, 153, 0.2)" : "rgba(255, 255, 255, 0.2)"
      particle.style.left = `${xPos}%`
      particle.style.bottom = "-20px"
      particle.style.animation = `float ${duration}s ease-in infinite ${delay}s`

      return particle
    }

    // Create initial particles
    const particles = []
    for (let i = 0; i < 20; i++) {
      const particle = createParticle()
      if (particle && backgroundRef.current) {
        backgroundRef.current.appendChild(particle)
        particles.push(particle)
      }
    }

    // Add new particles periodically
    const interval = setInterval(() => {
      const particle = createParticle()
      if (particle && backgroundRef.current) {
        backgroundRef.current.appendChild(particle)
        particles.push(particle)

        // Remove old particles to prevent too many DOM elements
        if (particles.length > 50) {
          const oldParticle = particles.shift()
          oldParticle?.remove()
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      particles.forEach((p) => p.remove())
    }
  }, [])

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-gradient-to-br from-[#0a1735] via-[#0c2756] to-[#061029]">
      <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-[#0a1735] via-[#0c2756] to-[#061029] overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 opacity-30 bg-[length:400%_400%] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-background"></div>

          {/* Animated glowing orbs */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 border-[3px] border-pink-500 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute top-1/4 right-0 w-64 h-64 border-[3px] border-pink-500 rounded-full opacity-20 animate-pulse-slower"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-pink-500 rounded-full opacity-10 animate-float-slow"></div>
          <div className="absolute top-20 left-1/4 w-8 h-8 bg-white rounded-full opacity-10 animate-float"></div>

          {/* Animated dot grid patterns */}
          <div className="absolute top-10 left-10 grid grid-cols-6 gap-4 animate-fade-in-out">
            {Array(36)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i % 5 === 0 ? "bg-white opacity-30" : "bg-pink-500 opacity-40"} ${i % 3 === 0 ? "animate-pulse-random" : ""}`}
                  style={{ animationDelay: `${(i * 0.1) % 2}s` }}
                ></div>
              ))}
          </div>
          <div className="absolute bottom-10 right-10 grid grid-cols-6 gap-4 animate-fade-in-out-delay">
            {Array(36)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i % 5 === 0 ? "bg-white opacity-30" : "bg-pink-500 opacity-40"} ${i % 4 === 0 ? "animate-pulse-random" : ""}`}
                  style={{ animationDelay: `${(i * 0.15) % 3}s` }}
                ></div>
              ))}
          </div>

          {/* Animated lines */}
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-blue-400 opacity-20 transform rotate-12 animate-glow"></div>
          <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-pink-500 opacity-20 transform -rotate-6 animate-glow-delay"></div>

          {/* Shooting stars */}
          <div
            className="absolute h-0.5 w-0.5 bg-white rounded-full animate-shooting-star"
            style={{ top: "15%", left: "10%" }}
          ></div>
          <div
            className="absolute h-0.5 w-0.5 bg-white rounded-full animate-shooting-star-delay"
            style={{ top: "45%", left: "25%" }}
          ></div>
          <div
            className="absolute h-0.5 w-0.5 bg-white rounded-full animate-shooting-star-delay-2"
            style={{ top: "75%", left: "15%" }}
          ></div>

          {/* Nebula effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 blur-3xl animate-nebula"></div>
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">

          <Image src="https://cloud.appwrite.io/v1/storage/buckets/676995bd003a7bc1e278/files/67a9b43a0028ad0400db/view?project=674dcf7b003d57db960a&mode=admin" alt="Bugema University Logo" width={40} height={40} />

          Bugema University
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has transformed the way we manage our operations at Bugema University, making everything more streamlined and efficient.&rdquo;
            </p>
            <footer className="text-sm">Bugema Ubiversity Data Team</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:w-[500px] sm:w-[350px]">
          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Choose your preferred sign up method to join our platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Create a password" showStrength {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            onError={() => {
                              toast.error("Failed to upload image. Please try again.")
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-center text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-100px); }
        }
        
        @keyframes pulse-random {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes shooting-star {
          0% { 
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            transform: translateX(300px) translateY(300px) scale(0.1);
            opacity: 1;
          }
          100% {
            transform: translateX(500px) translateY(500px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes nebula {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-fade-in-out {
          animation: fadeInOut 8s ease-in-out infinite;
        }
        
        .animate-fade-in-out-delay {
          animation: fadeInOut 8s ease-in-out 4s infinite;
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        
        .animate-glow-delay {
          animation: glow 4s ease-in-out 2s infinite;
        }
        
        .animate-shooting-star {
          animation: shooting-star 6s ease-out infinite;
        }
        
        .animate-shooting-star-delay {
          animation: shooting-star 8s ease-out 3s infinite;
        }
        
        .animate-shooting-star-delay-2 {
          animation: shooting-star 7s ease-out 5s infinite;
        }
        
        .animate-nebula {
          animation: nebula 20s ease-in-out infinite;
        }
        
        .animate-gradient-background {
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

