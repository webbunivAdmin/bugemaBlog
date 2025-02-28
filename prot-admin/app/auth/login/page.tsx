"use client"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useSignIn } from "@/lib/hooks/use-auth"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function LoginPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: signIn, isPending } = useSignIn()

  function onSubmit(values: FormData) {
    signIn(values)
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-gradient-to-br from-[#0a1735] via-[#0c2756] to-[#061029]">
      <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1735] via-[#0c2756] to-[#061029] overflow-hidden">
          {/* Pink/magenta circles and dots */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 border-[3px] border-pink-500 rounded-full opacity-20"></div>
          <div className="absolute top-1/4 right-0 w-64 h-64 border-[3px] border-pink-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-pink-500 rounded-full opacity-10"></div>
          <div className="absolute top-20 left-1/4 w-8 h-8 bg-white rounded-full opacity-10"></div>

          {/* Dot grid patterns */}
          <div className="absolute top-10 left-10 grid grid-cols-6 gap-4">
            {Array(36)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i % 5 === 0 ? "bg-white opacity-30" : "bg-pink-500 opacity-40"}`}
                ></div>
              ))}
          </div>
          <div className="absolute bottom-10 right-10 grid grid-cols-6 gap-4">
            {Array(36)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i % 5 === 0 ? "bg-white opacity-30" : "bg-pink-500 opacity-40"}`}
                ></div>
              ))}
          </div>

          {/* Lines */}
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-blue-400 opacity-20 transform rotate-12"></div>
          <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-pink-500 opacity-20 transform -rotate-6"></div>
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Bugema University 
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;Welcome back! We're glad to see you again.&rdquo;</p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <Card className="border-0 shadow-none lg:border lg:shadow-sm ">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
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
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/auth/forgot-password"
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/register"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      Sign Up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

