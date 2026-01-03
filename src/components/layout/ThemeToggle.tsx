"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (isChecked: boolean) => {
    setTheme(isChecked ? "dark" : "light")
  }

  // Ensure the component only renders on the client where the theme can be determined.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Render a placeholder or nothing on the server to avoid hydration mismatch
    return <div className="h-10 w-24" />;
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
        aria-label="Toggle theme"
      />
      <Moon className="h-5 w-5" />
    </div>
  )
}
