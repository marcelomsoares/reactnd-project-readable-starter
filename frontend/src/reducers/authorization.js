import { SET_AUTHORIZATION } from '../actions/authorization'

export default function authorization(state = {}, action) {
    switch(action.type) {
      case SET_AUTHORIZATION:
        return {
          ...state,
          ...action.authorization,
        }
      default:
        return state
    }
  }