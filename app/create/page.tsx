'use client'

import { TaskForm } from '@/components/task-form'
import { Header } from '@/components/header'
import { TaskFormData } from '@/types/task'
import { useRouter } from 'next/navigation'

// CreateTask component for adding new tasks
export default function CreateTask() {
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

  // Handle form submission to create a new task
  const handleSubmit = async (data: TaskFormData) => {
    try {
      const response = await fetch(`${apiUrl}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      router.push('/')
    } catch (error) {
      console.error('Failed to create task:', error)
      throw error
    }
  }

  // Render the task creation form
  return (
    <main className="mx-auto max-w-2xl px-4">
      <Header />
      <TaskForm onSubmit={handleSubmit} submitLabel="Add Task" />
    </main>
  )
}

