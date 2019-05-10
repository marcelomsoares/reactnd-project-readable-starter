import {
  RECEIVE_POSTS, GET_POST_BY_ID, ORDER_POSTS_BY_VOTE_SCORE,
  ADD_POST, REMOVE_POST, UP_VOTE, DOWN_VOTE, DELETE_POST,
  EDIT_POST, FILTER_BY_CATEGORY, POSTS_TO_STATE,
  INCREMENT_COMMENT_COUNT, DECREMENT_COMMENT_COUNT
} from '../actions/posts'

export default function posts(state = {}, action) {
  let newState = []
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts,
      }
    case ORDER_POSTS_BY_VOTE_SCORE:
      return {
        ...state,
        ...action.posts,
      }
    case GET_POST_BY_ID:
      return {
        ...state,
        ...action.posts,
      }
    case ADD_POST:
      newState = Object.values(state)
      newState.push(action.post)
      return {
        ...newState
      }
    case REMOVE_POST:
      newState = Object.values(state)
      newState = newState.filter(p => p.id !== action.post.id)
      return {
        ...newState
      }
    case UP_VOTE:
      newState = Object.values(state)
      newState.filter((p) => p.id === action.postId)
        .map((p) => p.voteScore += 1)
      return {
        ...newState,
      }
    case DOWN_VOTE:
      newState = Object.values(state)
      newState.filter((p) => p.id === action.postId)
        .map((p) => p.voteScore -= 1)
      return {
        ...newState,
      }
    case DELETE_POST:
      newState = Object.values(state)
      newState = newState.filter((x) => x.id !== action.postId)
      return {
        ...newState,
      }
    case EDIT_POST:
      newState = Object.values(state)
      newState = newState.filter(p => p.id !== action.post.id)
      newState.push(action.post)
      return {
        ...newState,
      }
    case FILTER_BY_CATEGORY:
      return {
        ...state,
      }
    case POSTS_TO_STATE:
      return {
        ...action.posts
      }
    case INCREMENT_COMMENT_COUNT:
      newState = Object.values(state)
      newState.map(p => p.id === action.postId ? p.commentCount += 1 : p.commentCount)
      return {
        ...newState
      }
    case DECREMENT_COMMENT_COUNT:
      newState = Object.values(state)
      newState.map(p => p.id === action.postId ? p.commentCount -= 1 : p.commentCount)
      return {
        ...newState
      }
    default:
      return state
  }
}