import { RECEIVE_POSTS, GET_POST_BY_ID, ORDER_POSTS_BY_VOTE_SCORE, ADD_POST, REMOVE_POST } from '../actions/posts'

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
      let newState = Object.values(state)
      newState.push(action.post)
      return {
        ...newState
      }
    case REMOVE_POST:      
      let postRemoved = Object.values(state)
      postRemoved = postRemoved.filter(p => p.id !== action.post.id)
      return {        
        ...postRemoved
      }
    default:
      return state
  }
}