import { RECEIVE_POSTS, GET_POST_BY_ID } from '../actions/posts'

export default function posts(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts,
      }
    case GET_POST_BY_ID:
      return {
        ...state,
        ...action.posts,
      }
    default:
      return state
  }
}