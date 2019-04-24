import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'

import '../css/post.css'

class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard-container'>
        <ul className='posts-list'>
          {this.props.postsIds ?
            (this.props.postsIds.map((id) => (
              <li key={id}>
                <Post id={id} />
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
    postsIds: Object.values(posts).map(obj => obj.id)
  }
}

export default connect(mapStateToProps)(Dashboard)