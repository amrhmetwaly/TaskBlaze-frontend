'use client'
import { Header } from '@/components/header'
import { TaskList } from '@/components/task-list'
import { Task } from '@/types/task'
import { FileText, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SplashScreen } from '@/components/splash-screen'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/tasks`)
      const data = await response.json()
      console.log(data)
      setTasks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await fetch(`${apiUrl}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      )
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete task')
      }
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <main className="mx-auto max-w-2xl px-4">
      <SplashScreen />
      <Header />

      <Link
        href="/create"
        className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        Create Task
      </Link>

      <div className="mb-4 flex justify-between text-sm">
        <div className="flex items-center gap-2">
          Tasks <span className="rounded-full bg-gray-800 px-2">{tasks.length}</span>
        </div>
        <div className="flex items-center gap-2 text-purple-500">
          Completed{' '}
          <span className="rounded-full bg-gray-800 px-2">
            {completedTasks.length} of {tasks.length}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center text-gray-400">
          <FileText className="h-12 w-12" />
          <div>
            <p className="mb-1">You don't have any tasks registered yet.</p>
            <p>Create tasks and organize your to-do items.</p>
          </div>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </main>
  )
}

