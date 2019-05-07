import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllInitialData } from '../actions/shared'
import Post from './Post'

import '../css/post.css'

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch(getAllInitialData())
  }

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