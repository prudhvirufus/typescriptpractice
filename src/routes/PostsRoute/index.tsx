import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'
import LoadingWrapperWithFailure from '../../components/common/LoadingWrapperWithFailure'
import TodoFooter from '../../components/TodoFooter'
import PostStore from '../../stores/PostStore'
import { PostsWrapper } from './styledComponents'
import PostList from '../../components/PostList'

interface PostsRouteProps extends WithTranslation {}

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
    const { t } = this.props
    return (
      <PostsWrapper>
        <div style={{ color: 'orange' }}> {t('posts:names.prudhvi')}</div>
        <div style={{ color: 'white' }}>
          {t('posts:cars.carsLeft', { count: 2, cars: 90 })}
        </div>
        <div style={{ color: 'lightgreen' }}>
          {t('posts:cars.blasted', { blasted: 6 })}
        </div>
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
export default withTranslation('translation', { withRef: true })(PostsRoute)
