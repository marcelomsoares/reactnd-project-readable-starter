import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVoteOnPostAction, downVoteOnPostAction } from '../actions/shared'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

import '../css/post.css'

class Post extends Component {

  state = {
    voteScore: this.props.post.voteScore,
  }

  handleUpVote = (post) => {

    const { dispatch } = this.props

    dispatch(upVoteOnPostAction(post.id))
      .then(
        (response) => {
          if (response.post.ok) {
            this.setState(() => ({
              voteScore: post.voteScore
            }))
          } else {
            this.setState(() => ({
              voteScore: post.voteScore - 1
            }))
          }
        }
      )
  }

  handleDownVote = (post) => {

    const { dispatch } = this.props

    dispatch(downVoteOnPostAction(post.id))
      .then(
        (response) => {
          if (response.post.ok) {
            this.setState(() => ({
              voteScore: post.voteScore
            }))
          } else {
            this.setState(() => ({
              voteScore: post.voteScore + 1
            }))
          }
        }
      )
  }

  render() {
    return (
      <div className='post-container'>
        <h3 className='post-title'>{this.props.post.title}</h3>
        <span className='post-details'>Postado por {this.props.post.author} | {this.props.post.commentCount} comentários | {this.state.voteScore} pontos
          <span> </span>
          <span title='Votar +1'>
            <FaThumbsUp onClick={() => this.handleUpVote(this.props.post)} size='14' />
          </span>
          <span> </span>
          <span title='Votar -1'>
            <FaThumbsDown onClick={() => this.handleDownVote(this.props.post)} size='14' />
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
