import { getInitialData, getPostDataById } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { receivePosts, getPostById, handleOrderPostsByVoteScore } from '../actions/posts'
import { showLoading, hideLoading } from 'react-redux-loading'

export function getAllInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(hideLoading())
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

export function handleOrderPostsByVoteScoreAction(posts, order) {  
  return (dispatch) => {
    dispatch(handleOrderPostsByVoteScore(posts, order))    
  }
}