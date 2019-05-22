import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllInitialData } from '../actions/shared'
import Post from './Post'
import { getValues } from '../utils/myUtils'

import '../css/post.css'

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch(getAllInitialData())
  }

  render() {
    return (
      <div className='dashboard-container'>
        <ul className='posts-list'>
          {this.props.posts ?
            (this.props.posts.map((post) => (
              <li key={post.id}>
                <Post post={post} commentCount={post.commentCount} />
              </li>
            )))
            : null}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: getValues(posts)
  }
}

export default connect(mapStateToProps)(Dashboard)