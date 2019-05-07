export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

export function getPostComments(comments) {
  return {
    type: GET_POST_COMMENTS,
    comments,
  }
}