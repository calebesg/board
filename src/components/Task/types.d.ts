export interface Task {
  id: string
  task: string
  created: Date
  createdFormatted: string
  user: {
    name: string
    id: string
  }
}
