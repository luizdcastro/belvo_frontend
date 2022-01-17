import * as constants from '../../constants'

export default function userReducer(state = [], action) {
  switch (action.type) {
    case constants.SET_USER_INFO:
      return { ...action.payload }
    case constants.RESET_USER_INFO:
      return { ...action.payload  }
    default:
      return state
  }
}