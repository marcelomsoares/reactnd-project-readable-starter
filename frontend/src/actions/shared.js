import {
  getInitialData, getPostDataById, addPost, voteOnPost, handleDeletePost,
  handleEditPost, handleGetPostsByCategory, handleGetPostComments, voteOnComment,
  handleDeleteComment, handleAddComment, handleEditComment
} from '../utils/api'
import { receiveCategories } from '../actions/categories'
import { setAuthorization } from '../actions/authorization'
import {
  receivePosts, getPostById, handleOrderPostsByVoteScore, handleAddPost, removePost, upVote,
  downVote, deletePost, editPost, filterByCategory, postsToState, incrementCommentCount, decrementCommentCount
} from '../actions/posts'
import { getPostComments, upVoteComment, downVoteComment, deleteComment, addComment, editComment } from '../actions/comments'
import { showLoading, hideLoading } from 'react-redux-loading'

export function getAllInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ categories, posts, authorization }) => {
        dispatch(receiveCategories(categories))
        dispatch(receivePosts(posts))
        dispatch(setAuthorization(authorization))
        dispatch(hideLoading())
      })
  }
}

export function getPostByIdAction(id) {
  return (dispatch) => {
    return getPostDataById(id)
      .then(({ post }) => {
        dispatch(getPostById(post))
      })
  }
}

export function handleOrderPostsByVoteScoreAction(posts, order) {
  return (dispatch) => {
    dispatch(handleOrderPostsByVoteScore(posts, order))
  }
}

export function addPostAction(p) {
  return (dispatch) => {
    return addPost(p)
      .then(dispatch(handleAddPost(p)))
  }
}

export function addCommentAction(c) {
  return (dispatch) => {
    return handleAddComment(c)
      .then(dispatch(addComment(c)))
  }
}

export function removePostFromState(p) {
  return removePost(p)
}

export function removeCommentFromState(c) {
  return deleteComment(c.id)
}

export function postsToStateAction(posts) {
  return postsToState(posts)
}

export function upVoteOnPostAction(id) {
  return (dispatch) => {
    return voteOnPost(id, { "option": "upVote" })
      .then(dispatch(upVote(id)))
  }
}

export function downVoteOnPostAction(id) {
  return (dispatch) => {
    return voteOnPost(id, { "option": "downVote" })
      .then(dispatch(downVote(id)))
  }
}

export function upVoteOnCommentAction(id) {
  return (dispatch) => {
    return voteOnComment(id, { "option": "upVote" })
      .then(dispatch(upVoteComment(id)))
  }
}

export function downVoteOnCommentAction(id) {
  return (dispatch) => {
    return voteOnComment(id, { "option": "downVote" })
      .then(dispatch(downVoteComment(id)))
  }
}

export function deletePostAction(id) {
  return (dispatch) => {
    return handleDeletePost(id)
      .then(dispatch(deletePost(id)))
  }
}

export function deleteCommentAction(id) {
  return (dispatch) => {
    return handleDeleteComment(id)
      .then(dispatch(deleteComment(id)))
  }
}

export function editPostAction(post) {
  return (dispatch) => {
    return handleEditPost(post)
      .then(dispatch(editPost(post)))
  }
}

export function editCommentAction(comment) {
  return (dispatch) => {
    return handleEditComment(comment)
      .then(dispatch(editComment(comment)))
  }
}

export function filterPostsByCategoryAction(category) {
  return (dispatch) => {
    return handleGetPostsByCategory(category)
      .then(dispatch(filterByCategory(category)))
  }
}

export function getPostCommentsAction(p) {
  return (dispatch) => {
    return handleGetPostComments(p)
      .then((response) => dispatch(getPostComments(response.comments)))
  }
}

export function incrementCommentCountAction(postId) {
  return incrementCommentCount(postId)
}

export function decrementCommentCountAction(postId) {
  return decrementCommentCount(postId)
}