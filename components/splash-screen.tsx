'use client'
import { useEffect, useState } from 'react'
import { Rocket } from 'lucide-react'
import { usePathname } from 'next/navigation'

// SplashScreen component to display a splash screen on app launch
export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only show splash screen on home page
    if (pathname !== '/') return

    // Show splash screen on mount (happens on both initial load and refresh)
    setIsVisible(true)

    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [pathname])

  // Don't render anything if splash screen shouldn't be visible
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#121212] text-white z-50">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-20" />
          <Rocket className="h-16 w-16 mx-auto text-blue-500 relative animate-bounce" />
        </div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-4">
            <span className="text-blue-500">Task</span>
            <span className="text-purple-500">Blaze</span>
            <span className="ml-2">🚀</span>
          </h1>
          <p className="text-xl text-gray-400 italic">
            "Organize tasks with style"
          </p>
        </div>
      </div>
    </div>
  )
} 