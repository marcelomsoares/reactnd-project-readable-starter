export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'

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