import { Rocket } from 'lucide-react'

export function Header() {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Rocket className="h-6 w-6 text-blue-500" />
      <h1 className="text-2xl font-semibold">
        <span className="text-blue-500">Todo</span>{' '}
        <span className="text-purple-500">App</span>
      </h1>
    </div>
  )
}

