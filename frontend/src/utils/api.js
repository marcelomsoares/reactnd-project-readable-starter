const AUTHORIZATION_VALUE = 'YOU'
const DATA_SERVER_URL = 'http://localhost:3001'

export function getInitialData() {
  return Promise.all([
    getCategoriesFromServer(),
    getPostsFromServer(),
    getAuthorizationValue(),
  ]).then(([categories, posts, authorization]) => ({
    categories: categories.categories,
    posts: posts,
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

export function voteOnPost(id, voteValue) {
  return Promise.all([
    sendVoteToServer(id, voteValue)
  ]).then(([post]) => ({
    post,
  }))
}

function getCategoriesFromServer() {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/categories"), 'GET').then(categories => categories.json())
}

function getPostsFromServer() {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts"), 'GET').then(posts => posts.json())
}

function getPostByIdFromServer(id) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts/").concat(id), 'GET').then(post => post.json())
}

function savePostOnServer(p) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/posts/"), 'POST', p)
}

function sendVoteToServer(id, voteValue) {
  return sendDataToUrl(DATA_SERVER_URL.concat("/posts/").concat(id), 'POST', voteValue)
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