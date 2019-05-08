export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'

export function getPostComments(comments) {
  return {
    type: GET_POST_COMMENTS,
    comments,
  }
}

export function upVoteComment(commentId) {
  return {
    type: UP_VOTE_COMMENT,
    commentId,
  }
}

export function downVoteComment(commentId) {
  return {
    type: DOWN_VOTE_COMMENT,
    commentId,
  }
}

export function deleteComment(commentId) {
  return {
    type: REMOVE_COMMENT,
    commentId,
  }
}

export function addComment(commentId) {
  return {
    type: ADD_COMMENT,
    commentId,
  }
}