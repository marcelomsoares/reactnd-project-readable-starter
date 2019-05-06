import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { upVoteOnPostAction, downVoteOnPostAction } from '../actions/shared'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

import '../css/post.css'

class Post extends Component {

  state = {
    voteScore: this.props.post !== undefined ? this.props.post.voteScore : 0,
  }

  handleUpVote = (post) => {

    const { dispatch } = this.props

    dispatch(upVoteOnPostAction(post.id))
      .then(
        (response) => {
          if (response.post.ok === true) {
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
    const data = new Date(this.props.post.timestamp)
    return (
      <div className='post-container'>
        {this.props.post &&
          <div>
            <h3 className='post-title'>
              <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
                {this.props.post.title}
              </Link>
            </h3>
            <span className='post-details'>Postado por {this.props.post.author} | às {dateFormater(data)} | {this.props.post.commentCount} comentários | {this.props.post.voteScore} pontos
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
          </div>}
      </div>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = Object.values(posts).find(p => p.id === id)
  return {
    post: post === undefined ? {} : post
  }
}

function dateFormater(date) {
  return date.toLocaleTimeString("pt-BR").concat(' de ').concat(date.toLocaleDateString("pt-BR"))
}

export default connect(mapStateToProps)(Post)
