import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import EditPost from './EditPost'
import Comment from './Comment'
import { deletePostAction, getPostCommentsAction } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import '../css/post.css'

class PostPage extends Component {

  state = {
    redirect: false,
    editing: false,
    comments: null,
  }

  handleGetPostComments = () => {
    const { dispatch } = this.props

    dispatch(getPostCommentsAction(this.props.post))
      .then(
        (response) => {
          this.setState(() => ({
            comments: response.comments,
          }))
        }
      )
  }

  handlePostDelete = (postId) => {

    const { dispatch } = this.props

    dispatch(deletePostAction(postId))
      .then(
        (response) => {
          if (response.post.deleted === true) {
            this.setState(() => ({
              redirect: true,
            }))
          }
        }
      )
  }

  showEditPostForm = () => {
    this.setState(() => ({
      editing: true,
    }))
  }

  hideEditPostForm = () => {
    this.setState(() => ({
      editing: false,
    }))
  }

  render() {

    if (this.props.post !== undefined && this.state.comments === null) {
      this.handleGetPostComments(this.props.post)
    }

    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        {this.state.editing === false && (
          <div>
            <form className='form-post-page'>
              <button type='button' onClick={() => this.handlePostDelete(this.props.id)}>
                Apagar Post
              </button>

              <button type='button' onClick={() => this.showEditPostForm()}>
                Editar Post
              </button>
            </form>
            <Post id={this.props.id} />
            <div>
              <ul className='comments-list'>
                {this.state.comments && (
                  this.state.comments.map((comment) => (
                    <li key={comment.id}>
                      <Comment comment={comment} />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}

        {this.state.editing === true && (
          <div>
            <EditPost id={this.props.id} handleCancel={this.hideEditPostForm} />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, props) {
  const { id, category } = props.match.params
  return {
    id,
    posts,
    post: Object.values(posts).find(p => p.id === id),
    category,
    comments,
  }
}

export default connect(mapStateToProps)(PostPage)