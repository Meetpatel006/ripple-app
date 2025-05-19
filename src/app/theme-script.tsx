"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeScript() {
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Get saved theme from localStorage or default to system
    const savedTheme = localStorage.getItem("theme") || "system"
    setTheme(savedTheme)
  }, [setTheme])

  return null
}
