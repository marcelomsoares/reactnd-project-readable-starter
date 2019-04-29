import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const ORDER_POSTS_BY_VOTE_SCORE = 'ORDER_POSTS_BY_VOTE_SCORE'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

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
    posts = Object.values(posts).sort((a, b) => a.voteScore - b.voteScore)
  } else {
    posts = Object.values(posts).sort((a, b) => b.voteScore - a.voteScore)
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