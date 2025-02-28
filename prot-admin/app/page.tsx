import { Newspaper, Users, BarChart3 } from "lucide-react"

import Header from "@/components/home/header"
import HeroSection from "@/components/home/hero-section"
import StatsSection from "@/components/home/stats-section"
import FeaturesSection from "@/components/home/features-section"
import CTASection from "@/components/home/cta-section"
import Footer from "@/components/home/footer"

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
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection stats={stats} />
        <FeaturesSection features={features} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

