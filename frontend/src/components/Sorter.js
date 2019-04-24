import React, { Component } from 'react'
import { connect } from 'react-redux'
import { orderPostsByVoteScoreAction } from '../actions/shared'

class Sorter extends Component {

  render() {
    return (
      <div>
        <button onClick={orderAsc}>ASC</button>
      </div>
    )
  }
}

function orderAsc() {
  return props.dispatch(orderPostsByVoteScoreAction(this.props.posts, 'ASC'))
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

export default connect(mapStateToProps)(Sorter)