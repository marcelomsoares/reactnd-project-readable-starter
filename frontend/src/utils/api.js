const AUTHORIZATION_VALUE = 'YOU'
const DATA_SERVER_URL = 'http://localhost:3001'

export function getInitialData() {
  return Promise.all([
    getCategoriesFromServer(),
    getPostsFromServer(),
  ]).then(([ categories, posts ]) => ({
    categories: categories.categories,
    posts: posts,
  }))
}

export function getPostDataById(id) {
  return Promise.all([
    getPostByIdFromServer(id),
  ]).then(([ post ]) => ({
    post,
  }))
}

export function getCategoriesFromServer() {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/categories"), 'GET').then(categories => categories.json())
}

export function getPostsFromServer() {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts"), 'GET').then(posts => posts.json())
}

export function getPostByIdFromServer(id) {
  return fetchDataFromUrl(DATA_SERVER_URL.concat("/posts/").concat(id), 'GET').then(post => post.json())
}

function fetchDataFromUrl(url, method) {
  return fetch(url, {
    method,
    headers: {
      "Authorization" : AUTHORIZATION_VALUE,
    }
  })
}