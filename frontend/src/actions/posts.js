import { showLoading, hideLoading } from 'react-redux-loading'
import { getValues } from '../utils/myUtils'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const ORDER_POSTS_BY_VOTE_SCORE = 'ORDER_POSTS_BY_VOTE_SCORE'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'
export const POSTS_TO_STATE = 'POSTS_TO_STATE'
export const INCREMENT_COMMENT_COUNT = 'INCREMENT_COMMENT_COUNT'
export const DECREMENT_COMMENT_COUNT = 'DECREMENT_COMMENT_COUNT'

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function getPostById(post) {
  return {
    type: GET_POST_BY_ID,
    post,
  }
}

export function orderPostsByVoteScore(posts, order) {
  if (order === 'ASC') {
    posts = getValues(posts).sort((a, b) => a.voteScore - b.voteScore)
  } else {
    posts = getValues(posts).sort((a, b) => b.voteScore - a.voteScore)
  }
  return {
    type: ORDER_POSTS_BY_VOTE_SCORE,
    posts,
  }
}

export function handleOrderPostsByVoteScore(posts, order) {
  return (dispatch) => {
    dispatch(orderPostsByVoteScore(posts, order))
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function handleAddPost(post) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(addPost(post))
    dispatch(hideLoading())
  }
}

export function removePost(post) {
  return {
    type: REMOVE_POST,
    post,
  }
}

export function postsToState(posts) {
  return {
    type: POSTS_TO_STATE,
    posts,
  }
}

export function upVote(postId) {
  return {
    type: UP_VOTE,
    postId,
  }
}

export function downVote(postId) {
  return {
    type: DOWN_VOTE,
    postId,
  }
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId,
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  }
}

export function filterByCategory(category) {
  return {
    type: FILTER_BY_CATEGORY,
    category,
  }
}

export function incrementCommentCount(postId) {
  return {
    type: INCREMENT_COMMENT_COUNT,
    postId,
  }
}

export function decrementCommentCount(postId) {
  return {
    type: DECREMENT_COMMENT_COUNT,
    postId,
  }
}