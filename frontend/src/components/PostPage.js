import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { deletePostAction } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class PostPage extends Component {

  state = {
    redirect: false,
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

  render() {

    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div>
          <form>
            <button type='button' onClick={() => this.handlePostDelete(this.props.id)}>
              Apagar Post
            </button>
          </form>
        </div>
        <Post id={this.props.id} />
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