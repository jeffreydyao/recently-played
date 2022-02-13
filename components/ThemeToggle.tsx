import React from 'react'
import { Moon, Sun } from "phosphor-react";
import { useTheme } from 'next-themes'


const ThemeToggle = () => {
  // resolvedTheme allows differentiation between system 'dark' and system 'light' - 
  // theme only returns 'system'
  const { theme, resolvedTheme, setTheme } = useTheme() 
  if (resolvedTheme === 'dark') {
    return (
      <button onClick={() => setTheme('light')} aria-label='Light mode'>
        <Sun className="w-6 h-6 fill-stone-900 dark:fill-neutral-100"/>
      </button>
    )
  } else {
    return (
      <button onClick={() => setTheme('dark')} aria-label='Dark mode'>
        <Moon className="w-6 h-6 fill-stone-900 dark:fill-neutral-100"/>
      </button>
    )
  }
}

export default ThemeToggle