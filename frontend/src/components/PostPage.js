import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import EditPost from './EditPost'
import Comment from './Comment'
import NewComment from './NewComment'
import PageNotFound from './PageNotFound'
import { deletePostAction, getPostCommentsAction, addPostAction } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import '../css/post.css'

class PostPage extends Component {

  state = {
    redirect: false,
    editing: false,
    getComments: true,
  }

  handleGetPostComments = () => {
    const { dispatch } = this.props

    dispatch(getPostCommentsAction(this.props.post))
      .then(
        (response) => {
          this.setState(() => ({
            comments: response.comments,
            getComments: false,
          }))
        }
      )
  }

  handlePostDelete = (postId) => {

    const { dispatch, post } = this.props

    dispatch(deletePostAction(postId))
      .then(
        (response) => {
          if (response.post.deleted === true) {
            this.setState(() => ({
              redirect: true,
            }))
          } else {
            dispatch(addPostAction(post))
            alert('Ocorreu um erro ao deletar o post. Tente novamente mais tarde')
          }
        }
      )
      .catch(err => {
        dispatch(addPostAction(post))
        alert('Ocorreu um erro ao deletar o post. Tente novamente mais tarde')
      })
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

    if (this.props.post !== undefined && (this.props.category !== this.props.post.category)) {
      return (
        <PageNotFound />
      )
    }

    if (this.props.post !== undefined && this.state.getComments === true) {
      this.handleGetPostComments(this.props.post)
    }

    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

    if (this.props.post === undefined) {
      return <PageNotFound />
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
            <Post post={this.props.post} commentCount={this.props.post.commentCount} />
            <div>
              <NewComment id={this.props.id} />
              <ul className='comments-list'>
                {this.props.comments && (
                  this.props.comments.map((comment) => (
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
    comments: Object.values(comments).sort((a, b) => b.voteScore - a.voteScore),
  }
}

export default connect(mapStateToProps)(PostPage)