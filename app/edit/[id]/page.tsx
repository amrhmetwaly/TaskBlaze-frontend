'use client'

import { TaskForm } from '@/components/task-form'
import { Header } from '@/components/header'
import { Task, TaskFormData } from '@/types/task'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditTask() {
  const params = useParams()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://10.0.0.184:3000';

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/tasks/${params.id}`)
        if (!response.ok) {
          throw new Error('Task not found')
        }
        const data = await response.json()
        setTask(data)
      } catch (error) {
        console.error('Failed to fetch task:', error)
        router.push('/')
      }
    }

    fetchTask()
  }, [params.id, router])

  const handleSubmit = async (data: TaskFormData) => {
    const response = await fetch(`${apiUrl}/api/tasks/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to update task')
    }
  }

  if (!task) {
    return null
  }

  return (
    <main className="mx-auto max-w-2xl px-4">
      <Header />
      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        submitLabel="Save"
      />
    </main>
  )
}

