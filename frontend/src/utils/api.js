const AUTHORIZATION_VALUE = 'YOU'
const DATA_SERVER_URL = 'http://localhost:3001'

export function getInitialData() {
  return Promise.all([
    getCategoriesFromServer(),
    getPostsFromServer(),
    getAuthorizationValue(),
  ]).then(([categories, posts, authorization]) => ({
    categories: categories.categories,
    posts: posts.sort((a, b) => b.voteScore - a.voteScore),
    authorization: authorization,
  }))
}

export function getPostDataById(id) {
  return Promise.all([
    getPostByIdFromServer(id),
  ]).then(([post]) => ({
    post,
  }))
}

export function addPost(p) {
  return Promise.all([
    savePostOnServer(p)
  ]).then(([post]) => ({
    post,
  }))
}

export function handleAddComment(c) {
  return Promise.all([
    saveCommentOnServer(c)
  ]).then(([comment]) => ({
    comment,
  }))
}

export function voteOnPost(id, voteValue) {
  return Promise.all([
    sendVoteToServer(id, voteValue)
  ]).then(([post]) => ({
    post,
  }))
}

export function voteOnComment(id, voteValue) {
  return Promise.all([
    sendCommentVoteToServer(id, voteValue)
  ]).then(([comment]) => ({
    comment,
  }))
}

export function handleDeletePost(postId) {
  return Promise.all([
    markPostAsDeletedOnServer(postId)
  ]).then(([post]) => ({
    post,
  }))
}

export function handleDeleteComment(commentId) {
  return Promise.all([
    markCommentAsDeletedOnServer(commentId)
  ]).then(([comment]) => ({
    comment,
  }))
}

export function handleEditPost(post) {
  return Promise.all([
    editPostOnServer(post)
  ]).then(([post]) => ({
    post,
  }))
}

export function handleEditComment(comment) {
  return Promise.all([
    editCommentOnServer(comment)
  ]).then(([comment]) => ({
    comment,
  }))
}

export function handleGetPostsByCategory(category) {
  return Promise.all([
    getPostsFromServerByCategory(category)
  ]).then(([posts]) => ({
    posts,
  })
  )
}

export function handleGetPostComments(p) {
  return Promise.all([
    getPostCommentsFromServer(p)
  ]).then(([comments]) => ({
    comments,
  }))
}

function getCategoriesFromServer() {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/categories"), 'GET').then(categories => categories.json())
}

function getPostsFromServer() {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts"), 'GET').then(posts => posts.json())
}

function getPostCommentsFromServer(p) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts/".concat(p.id).concat("/comments")), 'GET').then(comments => comments.json())
}

function getPostsFromServerByCategory(category) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/").concat(category).concat("/posts"), 'GET').then(posts => posts.json())
}

function getPostByIdFromServer(id) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts/").concat(id), 'GET').then(post => post.json())
}

function savePostOnServer(p) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/posts/"), 'POST', p)
}

function saveCommentOnServer(c) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/comments/"), 'POST', c)
}

function sendVoteToServer(id, voteValue) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/posts/").concat(id), 'POST', voteValue)
}

function sendCommentVoteToServer(id, voteValue) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/comments/").concat(id), 'POST', voteValue)
}

function markPostAsDeletedOnServer(id) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts/").concat(id), 'DELETE').then(post => post.json())
}

function markCommentAsDeletedOnServer(id) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/comments/").concat(id), 'DELETE').then(comment => comment.json())
}

function editPostOnServer(p) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/posts/".concat(p.id)), 'PUT', p)
}

function editCommentOnServer(c) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/comments/".concat(c.id)), 'PUT', c)
}

function fetchDataFromUrl(url, method) {
  return fetch(url, {
    method,
    headers: {
      "Authorization": AUTHORIZATION_VALUE,
      "Content-Type": "application/json",
    }
  })
}

function sendDataToUrl(url, method, data) {
  return fetch(url, {
    method,
    headers: {
      "Authorization": AUTHORIZATION_VALUE,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

function getAuthorizationValue() {
  return {
    authorization: AUTHORIZATION_VALUE
  }
}