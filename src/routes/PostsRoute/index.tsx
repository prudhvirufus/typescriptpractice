import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import LoadingWrapperWithFailure from '../../components/common/LoadingWrapperWithFailure'
import TodoFooter from '../../components/TodoFooter'
import PostStore from '../../stores/PostStore'
import { PostsWrapper } from './styledComponents'
import PostList from '../../components/PostList'

interface PostsRouteProps {}

interface InjectedProps extends PostsRouteProps {
  postStore: PostStore
}

@inject('postStore')
@observer
class PostsRoute extends Component<PostsRouteProps> {
  constructor(props: Readonly<PostsRouteProps>) {
    super(props)
  }

  componentDidMount() {
    this.getPosts()
  }

  getInjectedProps = (): InjectedProps => this.props as InjectedProps

  getPostStore = () => {
    return this.getInjectedProps().postStore
  }

  getPosts = () => {
    this.getPostStore().getPostList()
  }

  renderSuccessUI = observer(() => {
    const { posts, totalPosts } = this.getPostStore()
    return (
      <PostsWrapper>
        <PostList posts={posts} />
        <TodoFooter todosLeftCount={totalPosts} />
      </PostsWrapper>
    )
  })

  render() {
    const { getPostsListAPIStatus, getPostsListAPIError } = this.getPostStore()
    return (
      <LoadingWrapperWithFailure
        apiStatus={getPostsListAPIStatus}
        apiError={getPostsListAPIError}
        onRetry={this.getPosts}
        renderSuccessUI={this.renderSuccessUI}
      />
    )
  }
}

export default PostsRoute
