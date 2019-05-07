import { getInitialData, getPostDataById, addPost, voteOnPost, handleDeletePost, handleEditPost, handleGetPostsByCategory } from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { setAuthorization } from '../actions/authorization'
import {
  receivePosts, getPostById, handleOrderPostsByVoteScore, handleAddPost, removePost, upVote,
  downVote, deletePost, editPost, filterByCategory, postsToState
} from '../actions/posts'
import { showLoading, hideLoading } from 'react-redux-loading'

export function getAllInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ categories, posts, authorization }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(setAuthorization(authorization))
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

export function addPostAction(p) {
  return (dispatch) => {
    return addPost(p)
      .then(dispatch(handleAddPost(p)))
  }
}

export function removePostFromState(p) {
  return removePost(p)
}

export function postsToStateAction(posts) {
  return postsToState(posts)
}

export function upVoteOnPostAction(id) {
  return (dispatch) => {
    return voteOnPost(id, { "option": "upVote" })
      .then(dispatch(upVote(id)))
  }
}

export function downVoteOnPostAction(id) {
  return (dispatch) => {
    return voteOnPost(id, { "option": "downVote" })
      .then(dispatch(downVote(id)))
  }
}

export function deletePostAction(id) {
  return (dispatch) => {
    return handleDeletePost(id)
      .then(dispatch(deletePost(id)))
  }
}

export function editPostAction(post) {
  return (dispatch) => {
    return handleEditPost(post)
      .then(dispatch(editPost(post)))
  }
}

export function filterPostsByCategoryAction(category) {
  return (dispatch) => {
    return handleGetPostsByCategory(category)
      .then(dispatch(filterByCategory(category)))
  }
}