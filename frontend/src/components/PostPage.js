import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import EditPost from './EditPost'
import { deletePostAction } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import '../css/post.css'

class PostPage extends Component {

  state = {
    redirect: false,
    editing: false,
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

function mapStateToProps({ posts, post }, props) {
  const { id, category } = props.match.params
  return {
    id,
    posts,
    post,
    category,
  }
}

export default connect(mapStateToProps)(PostPage)