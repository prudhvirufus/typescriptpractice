import React, { Component } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'

import { API_FAILED } from '@ib/api-constants'

import PostModel from '../../stores/models/PostModel'

import { PostWrapper, PostNumber } from './styledComponents'

type PostProps = {
  post: PostModel
  sno: number
}

@observer
class Post extends Component<PostProps> {
  render() {
    const { post, sno } = this.props
    const { userId, title, body } = post
    return (
      <PostWrapper>
        <PostNumber>{sno}</PostNumber>
        <div
          style={{
            color: '#004d99',
            backgroundColor: '#000d1a',
            textAlign: 'center'
          }}
        >
          {title}
        </div>
        <div>{body}</div>
      </PostWrapper>
    )
  }
}

export default Post
