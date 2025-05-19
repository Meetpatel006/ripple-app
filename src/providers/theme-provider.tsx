"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Script to avoid theme flash on page load
const themeScript = `
  let isDarkMode = false;
  
  // Check localStorage
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    isDarkMode = true;
  } else if (storedTheme === 'light') {
    isDarkMode = false;
  } else {
    // Check system preference
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply theme immediately to avoid flash
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
`

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: themeScript,
        }}
      />
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </>
  )
}
