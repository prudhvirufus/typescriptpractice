import { observable, action, computed } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, APIStatus } from '@ib/api-constants'

import PostFixtureService from '../../services/PostService/index.fixture'

import PostModel from '../models/PostModel'
import { GetPostsResponse } from '../types'

class PostStore {
  postService: PostFixtureService
  @observable getPostsListAPIStatus!: APIStatus
  @observable getPostsListAPIError!: Error | null
  @observable posts!: Array<PostModel>
  @observable totalPosts!: number

  constructor(postService: PostFixtureService) {
    this.postService = postService
    this.init()
  }
  @action.bound
  init() {
    this.getPostsListAPIStatus = API_INITIAL
    this.getPostsListAPIError = null
    this.posts = []
    this.totalPosts = 0
  }

  @action.bound
  setGetPostListAPIStatus(status: number) {
    this.getPostsListAPIStatus = status
  }

  @action.bound
  setGetPostListAPIError(error: Error | null) {
    this.getPostsListAPIError = error
  }

  @action.bound
  setPostListResponse(response: GetPostsResponse | null) {
    if (response) {
      this.posts = response.posts.map(post => {
        return new PostModel(post)
      })
      this.totalPosts = response.total
    }
  }

  @action.bound
  getPostList() {
    const getPostsPromise = this.postService.getPostsAPI()
    return bindPromiseWithOnSuccess(getPostsPromise)
      .to(this.setGetPostListAPIStatus, this.setPostListResponse)
      .catch(this.setGetPostListAPIError)
  }
}
export default PostStore
