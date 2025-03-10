"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Users, GraduationCap, Newspaper, BarChart3 } from "lucide-react"
import { motion } from "framer-motion";


export default function HomePage() {
  const features = [
    {
      icon: Newspaper,
      title: "Easy to Use",
      description: "Intuitive interface designed for writers of all skill levels.",
      content: "Start writing immediately with our user-friendly editor. No technical knowledge required.",
    },
    {
      icon: Users,
      title: "Powerful Features",
      description: "Everything you need to create and manage your blog.",
      content: "Rich text editor, image uploads, SEO tools, and analytics all in one place.",
    },
    {
      icon: BarChart3,
      title: "Grow Your Audience",
      description: "Built-in tools to help you reach more readers.",
      content: "SEO optimization, social sharing, and analytics to help you grow your audience.",
    },
  ]

  const stats = [
    { id: 1, name: "Active Writers", value: "1,000+" },
    { id: 2, name: "Articles Published", value: "50,000+" },
    { id: 3, name: "Monthly Readers", value: "1M+" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className=" px-8 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1">
              <Link href="/" className="mr-6 flex items-center space-x-2">
              <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-5, 5, -5] }} // Floating effect
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                <Image src="https://cloud.appwrite.io/v1/storage/buckets/676995bd003a7bc1e278/files/67a9b43a0028ad0400db/view?project=674dcf7b003d57db960a&mode=admin" alt="Bugema University Logo" width={40} height={40} />
                  
                </motion.div>
                <span className="hidden font-bold sm:inline-block">Bugema University</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="hidden sm:flex">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/lib.jpg')] bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Bugema University
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                  Empowering minds, transforming lives, and shaping the future through quality education.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://bugemauniv.ac.ug/">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://bugemauniv.ac.ug/">
                  <Button variant="outline" size="lg" className="bg-white text-black hover:bg-zinc-100">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="text-3xl font-bold md:text-4xl">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Bugema?</h2>
                <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  Discover the advantages of studying at Bugema University.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col items-center text-center">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{feature.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your Journey Today
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the Bugema University community and unlock your potential.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://erms.bugemauniv.ac.ug/application/">
                  <Button size="lg" className="bg-white text-primary hover:bg-zinc-100">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
              <Image src="https://cloud.appwrite.io/v1/storage/buckets/676995bd003a7bc1e278/files/67a9b43a0028ad0400db/view?project=674dcf7b003d57db960a&mode=admin" alt="Bugema University Logo" width={40} height={40} />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Bugema University. All rights reserved.
              </p>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="https://bugemauniv.ac.ug/" className="text-sm font-medium hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="https://bugemauniv.ac.ug/" className="text-sm font-medium hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </footer>

    </div>
  )
}

