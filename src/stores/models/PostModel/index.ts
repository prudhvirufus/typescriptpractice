import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, APIStatus } from '@ib/api-constants'

import { PostObject } from '../../types'

class PostModel {
  id: number
  userId: number
  title: string
  body: string

  constructor(post: PostObject) {
    this.id = post.id
    this.userId = post.userId
    this.title = post.title
    this.body = post.body
  }
}

export default PostModel
