import { GetPostsResponse } from '../../stores/types'

interface PostService {
  getPostsAPI: () => Promise<GetPostsResponse>
}

export default PostService
