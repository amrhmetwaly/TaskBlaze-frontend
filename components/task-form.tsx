'use client'

import { TaskFormData } from '@/types/task'
import { ArrowLeft, Loader2, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#EAB308', // Yellow
  '#22C55E', // Green
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#A855F7', // Purple
  '#EC4899', // Pink
  '#78716C', // Warm Gray
]

interface TaskFormProps {
  initialData?: TaskFormData
  onSubmit: (data: TaskFormData) => Promise<void>
  submitLabel: string
}

export function TaskForm({ initialData, onSubmit, submitLabel }: TaskFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title ?? '',
    color: initialData?.color ?? COLORS[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      await onSubmit(formData)
      router.push('/')
    } catch (error) {
      console.error('Failed to submit task:', error)
      setError('Failed to submit task. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isTitleValid = formData.title.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm text-blue-500">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Ex. Brush your teeth"
            required
            className="w-full rounded-lg bg-gray-800/50 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-blue-500">Color</label>
          <div className="flex gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, color: color }))
                }
                className={`h-8 w-8 rounded-full transition-transform ${
                  formData.color === color ? 'scale-125 ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isTitleValid ? (
          <>
            Save <Check className="h-4 w-4" />
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  )
}

