import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterPostsByCategoryAction, postsToStateAction } from '../actions/shared'
import Post from './Post'
import { getValues } from '../utils/myUtils'

import '../css/post.css'

class CategoryPosts extends Component {

  componentDidMount() {
    this.handleCategoryChanges()
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.handleCategoryChanges()
    }
  }

  handleCategoryChanges = () => {
    const { dispatch } = this.props

    dispatch(filterPostsByCategoryAction(this.props.category))
      .then(
        (response) => {
          dispatch(postsToStateAction(response.posts))
        }
      )
  }

  render() {
    return (
      <div>
        <ul className='posts-list'>
          {this.props.posts && (
            this.props.posts.map((p) => (
              <li key={p.id}>
                <Post post={p} />
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const { category } = props.match.params
  return {
    posts: getValues(posts),
    category,
  }
}

export default connect(mapStateToProps)(CategoryPosts)