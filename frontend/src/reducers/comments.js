import {
  GET_POST_COMMENTS, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT,
  ADD_COMMENT, REMOVE_COMMENT
} from '../actions/comments'

export default function comments(state = {}, action) {
  let updatedCommentList = []
  switch (action.type) {
    case GET_POST_COMMENTS:
      return {
        ...action.comments,
      }
    case UP_VOTE_COMMENT:
      updatedCommentList = Object.values(state)
      updatedCommentList.filter((p) => p.id === action.commentId)
        .map((p) => p.voteScore += 1)
      return {
        ...updatedCommentList,
      }
    case DOWN_VOTE_COMMENT:
      updatedCommentList = Object.values(state)
      updatedCommentList.filter((p) => p.id === action.commentId)
        .map((p) => p.voteScore -= 1)
      return {
        ...updatedCommentList,
      }
    case ADD_COMMENT:
      updatedCommentList = Object.values(state)
      updatedCommentList.push(action.comment)
      return {
        ...updatedCommentList,
      }
    case REMOVE_COMMENT:
      updatedCommentList = Object.values(state)
      updatedCommentList = updatedCommentList.filter(c => c.id !== action.commentId)
      return {
        ...updatedCommentList,
      }
    default:
      return state
  }
}