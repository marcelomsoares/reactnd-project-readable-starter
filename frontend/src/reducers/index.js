import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import authorization from './authorization'
import comments from './comments'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  categories,
  posts,
  authorization,
  loadingBar: loadingBarReducer,
  comments,
})