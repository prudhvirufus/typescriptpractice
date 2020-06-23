// All the stores will be initialised here
import TodoService from '../services/TodoService/index.api'
import PostFixtureService from '../services/PostService/index.fixture'

import TodoStore from './TodoStore'
import PostStore from './PostStore'

const todoStore = new TodoStore(new TodoService())
const postStore = new PostStore(new PostFixtureService())

const stores = {
  todoStore,
  postStore
}

export default stores
