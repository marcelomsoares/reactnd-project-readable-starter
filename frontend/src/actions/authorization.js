export const SET_AUTHORIZATION = 'SET_AUTHORIZATION'

export function setAuthorization(authorization) {
  return {
    type: SET_AUTHORIZATION,
    authorization,
  }
}