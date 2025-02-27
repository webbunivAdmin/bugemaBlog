import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Newspaper, Users, BarChart3 } from "lucide-react"

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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className=" px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <Newspaper className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">Blog Platform</span>
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className=" text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create, Share, and Grow Your Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start your blogging journey today with our powerful platform. Write, publish, and reach your audience
                  with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="px-8">
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full border-t bg-muted/50 py-12 md:py-24 lg:py-32">
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform provides all the tools you need to create and grow your blog.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">{feature.content}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full border-t bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Start Your Blog Today</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of writers who trust our platform for their blogging needs.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8">
                    Get Started
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
              <Newspaper className="h-6 w-6" />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; 2025 Bugema University Data Team. All rights reserved.
              </p>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

