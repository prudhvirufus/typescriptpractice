import React, { Component } from 'react'

import { observer } from 'mobx-react'

import NoDataView from '../common/NoDataView'

import PostModel from '../../stores/models/PostModel'

import Post from '../Post'

import { PostsListWrapper } from './styledComponents'

type PostListProps = {
  posts: Array<PostModel>
}

@observer
class PostList extends Component<PostListProps> {
  render() {
    const { posts } = this.props

    if (posts.length === 0) {
      return <NoDataView />
    }
    return (
      <PostsListWrapper>
        {posts.map((postItem, index) => {
          return <Post key={postItem.id} post={postItem} sno={index + 1} />
        })}
      </PostsListWrapper>
    )
  }
}

export default PostList
