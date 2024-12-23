import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TaskBlaze',
  description: 'Organize tasks with style',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
  },
}

// RootLayout component to wrap the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

