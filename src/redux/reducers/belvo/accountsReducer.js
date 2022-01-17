import * as constants from '../../constants'

export default function accountsReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ACCOUNTS:
            return { ...action.payload }
        case constants.RESET_USER_INFO:
            return { ...action.payload }
        default:
            return state
    }
}