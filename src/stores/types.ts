export interface TodoObject {
  id: number
  isCompleted: boolean
  title: string
}

export interface UpdateCompletionStatusRequest {
  id: string
  is_completed: boolean
}

//If there is filters for Todos
type TodoStatus = 'COMPLETED' | 'ACTIVE' | 'ALL'

export interface GetTodosRequest {
  todo_status: TodoStatus
}

export interface GetTodosResponse {
  todos: Array<TodoObject>
  total: number
}

export interface PostObject {
  userId: number
  id: number
  title: string
  body: string
}

export interface GetPostsResponse {
  posts: Array<PostObject>
  total: number
}
