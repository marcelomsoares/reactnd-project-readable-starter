import {
  RECEIVE_POSTS, GET_POST_BY_ID, ORDER_POSTS_BY_VOTE_SCORE,
  ADD_POST, REMOVE_POST, UP_VOTE, DOWN_VOTE, DELETE_POST,
  EDIT_POST
} from '../actions/posts'

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
    case UP_VOTE:
      let updatedPostValue = Object.values(state)
      updatedPostValue.filter((p) => p.id === action.postId)
        .map((p) => p.voteScore += 1)
      return {
        ...updatedPostValue,
      }
    case DOWN_VOTE:
      let updatedPostValueDown = Object.values(state)
      updatedPostValueDown.filter((p) => p.id === action.postId)
        .map((p) => p.voteScore -= 1)
      return {
        ...updatedPostValueDown,
      }
    case DELETE_POST:
      let remainingPosts = Object.values(state)
      remainingPosts = remainingPosts.filter((x) => x.id !== action.postId)
      return {
        ...remainingPosts,
      }
    case EDIT_POST:
      let editedPosts = Object.values(state)
      editedPosts = editedPosts.filter(p => p.id !== action.post.id)
      editedPosts.push(action.post)
      return {
        ...editedPosts,
      }
    default:
      return state
  }
}