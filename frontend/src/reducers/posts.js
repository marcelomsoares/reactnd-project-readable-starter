import { RECEIVE_POSTS, GET_POST_BY_ID, ORDER_POSTS_BY_VOTE_SCORE, ADD_POST } from '../actions/posts'

export default function posts(state = {}, action) {
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
      return {
        ...state,
        newPost: action.post
      }
    default:
      return state
  }
}