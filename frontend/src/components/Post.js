import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

import '../css/post.css'

class Post extends Component {

  upVote = (id) => {
    console.log('upVote')
    console.log(id)
  }

  downVote = (id) => {
    console.log('downVote')
    console.log(id)
  }

  render() {
    return (
      <div className='post-container'>
        <h3 className='post-title'>{this.props.post.title}</h3>
        <span className='post-details'>Postado por {this.props.post.author} | {this.props.post.commentCount} comentários | {this.props.post.voteScore} pontos
          <span> </span>
          <span title='Votar +1'>
            <FaThumbsUp onClick={() => this.upVote(this.props.id)} size='14' />
          </span>
          <span> </span>
          <span title='Votar -1'>
            <FaThumbsDown onClick={() => this.downVote(this.props.id)} size='14' />
          </span>
        </span>
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
