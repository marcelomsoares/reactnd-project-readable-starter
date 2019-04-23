import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPostByIdAction } from '../actions/shared'

class Post extends Component {

  componentDidMount() {
    this.props.dispatch(getPostByIdAction(this.props.id))
  }

  render() {
    return (
      <div>
        {this.props.id}
      </div>
      )
  }
}

function mapStateToProps({ post }, { id }) {
  return {
    id,
    post,
  }
}

export default connect(mapStateToProps)(Post)
