import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

class PostPage extends Component {

  render() {
    return (
      <div>
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