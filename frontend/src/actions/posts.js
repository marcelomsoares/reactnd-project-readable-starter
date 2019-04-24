export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const ORDER_POSTS_BY_VOTE_SCORE = 'ORDER_POSTS_BY_VOTE_SCORE'

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

export function orderPostsByVoteScore(posts, order) {
  console.log(posts)
  if (order === 'ASC') {
    posts = Object.values(posts).sort((a, b) => b.voteScore - a.voteScore)
  } else {
    posts = Object.values(posts).sort((a, b) => a.voteScore - b.voteScore)
  }
  console.log(posts)
  return {
    type: ORDER_POSTS_BY_VOTE_SCORE,
    posts,
  }
}