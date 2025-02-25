"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

type FormData = z.infer<typeof formSchema>

export default function OTPVerificationPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [seconds, setSeconds] = React.useState(120)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true)
      toast("Email verified successfully")
      router.push("/login")
    } catch (error) {
      toast("Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      setIsLoading(true)
      setSeconds(120)
      toast("OTP resent successfully")
    } catch (error) {
      toast("Failed to resend OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
          <CardDescription>Enter the OTP sent to your email</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter OTP"
                        className="text-center text-2xl tracking-widest"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center text-sm">
                {seconds > 0 ? (
                  <p className="text-muted-foreground">
                    OTP will expire in: <span className="font-medium text-primary">{formatTime(seconds)}</span>
                  </p>
                ) : (
                  <Button variant="link" className="p-0" onClick={handleResendOTP} disabled={isLoading}>
                    Resend OTP
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

