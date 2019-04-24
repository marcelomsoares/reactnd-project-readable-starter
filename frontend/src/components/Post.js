import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../css/post.css'

class Post extends Component {

  render() {
    return (
      <div className='post-container'>
        <h3 className='post-title'>{this.props.post.title}</h3>
        <span className='post-details'>Postado por {this.props.post.author} | {this.props.post.commentCount} comentários | {this.props.post.voteScore} pontos</span>
        <p className='post-body'>{this.props.post.body}</p>
      </div>
      )
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = Object.values(posts).find(p => p.id === id)
  return {
    post
  }
}

export default connect(mapStateToProps)(Post)
