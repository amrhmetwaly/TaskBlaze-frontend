'use client'

import { Task } from '@/types/task'
import { Trash, CheckCircle, Circle } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 rounded-lg"
          style={{ borderColor: task.color, borderWidth: '2px', borderStyle: 'solid' }}
        >
          <div className="flex items-center gap-2">
            <button onClick={() => onToggle(task.id, !task.completed)}>
              {task.completed ? (
                <CheckCircle className="text-purple-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
            </button>
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </div>
          <button onClick={() => onDelete(task.id)}>
            <Trash className="text-gray-400 hover:text-red-500" />
          </button>
        </div>
      ))}
    </div>
  )
}

