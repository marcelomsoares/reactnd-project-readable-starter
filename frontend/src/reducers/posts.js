import {
  RECEIVE_POSTS, GET_POST_BY_ID, ORDER_POSTS_BY_VOTE_SCORE,
  ADD_POST, REMOVE_POST, UP_VOTE, DOWN_VOTE, DELETE_POST,
  EDIT_POST, FILTER_BY_CATEGORY, POSTS_TO_STATE,
  INCREMENT_COMMENT_COUNT, DECREMENT_COMMENT_COUNT
} from '../actions/posts'

import { getValues } from '../utils/myUtils'

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
      const newStateAddPost = getValues(state).push(action.post)
      return {
        ...newStateAddPost
      }
    case REMOVE_POST:
      const newStateRemovePost = getValues(state).filter(p => p.id !== action.post.id)
      return {
        ...newStateRemovePost
      }
    case UP_VOTE:
      const newStateUpVote = getValues(state).filter((p) => p.id === action.postId)
        .map((p) => p.voteScore += 1)
      return {
        ...newStateUpVote,
      }
    case DOWN_VOTE:
      const newStateDownVote = getValues(state).filter((p) => p.id === action.postId)
        .map((p) => p.voteScore -= 1)
      return {
        ...newStateDownVote,
      }
    case DELETE_POST:
      const newStateDeletePost = getValues(state).filter((x) => x.id !== action.postId)
      return {
        ...newStateDeletePost,
      }
    case EDIT_POST:
      const newStateEditPost = getValues(state).filter(p => p.id !== action.post.id).push(action.post)
      return {
        ...newStateEditPost,
      }
    case FILTER_BY_CATEGORY:
      const newStateFilterByCategory = getValues(state).filter(p => p.category !== action.category)
      return {
        ...newStateFilterByCategory,
      }
    case POSTS_TO_STATE:
      return {
        ...action.posts
      }
    case INCREMENT_COMMENT_COUNT:
      const newStateIncrementCommentCount = getValues(state).map(p => p.id === action.postId ? p.commentCount += 1 : p.commentCount)
      return {
        ...newStateIncrementCommentCount
      }
    case DECREMENT_COMMENT_COUNT:
      const newStateDecrementCommentCount = getValues(state).map(p => p.id === action.postId ? p.commentCount -= 1 : p.commentCount)
      return {
        ...newStateDecrementCommentCount
      }
    default:
      return state
  }
}