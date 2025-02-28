import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Newspaper } from "lucide-react"

export default function Header() {
  return (
    <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
  )
}

