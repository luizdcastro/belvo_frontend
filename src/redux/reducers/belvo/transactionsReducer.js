import * as constants from '../../constants'

export default function transactionsReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_TRANSACTIONS:
            return { ...action.payload }
        case constants.RESET_USER_INFO:
            return { ...action.payload }
        default:
            return state
    }
}