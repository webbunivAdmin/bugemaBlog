"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  showStrength?: boolean
}

export function PasswordInput({ className, onChange, showStrength = false, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [strength, setStrength] = React.useState(0)

  const calculateStrength = (value: string) => {
    let score = 0
    if (!value) return score

    // Length check
    if (value.length >= 8) score += 20

    // Contains number
    if (/\d/.test(value)) score += 20

    // Contains lowercase
    if (/[a-z]/.test(value)) score += 20

    // Contains uppercase
    if (/[A-Z]/.test(value)) score += 20

    // Contains special character
    if (/[^A-Za-z0-9]/.test(value)) score += 20

    return score
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (showStrength) {
      setStrength(calculateStrength(value))
    }
    onChange?.(e)
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 20) return "bg-destructive"
    if (strength <= 40) return "bg-orange-500"
    if (strength <= 60) return "bg-yellow-500"
    if (strength <= 80) return "bg-lime-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          onChange={handleChange}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
      {showStrength && <Progress value={strength} className={cn("h-1 w-full", getStrengthColor(strength))} />}
    </div>
  )
}

