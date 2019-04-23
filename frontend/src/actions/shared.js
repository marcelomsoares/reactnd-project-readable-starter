import { getInitialData, getPostDataById } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { receivePosts, getPostById } from '../actions/posts'

export function getAllInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
      })
  }
}

export function getPostByIdAction(id) {
  return (dispatch) => {
    return getPostDataById(id)
      .then(({ post }) => {
        dispatch(getPostById(post))
      })
  }
}