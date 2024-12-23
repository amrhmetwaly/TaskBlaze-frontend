export interface Task {
  id: string
  title: string
  color: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface TaskFormData {
  title: string
  color: string
}

