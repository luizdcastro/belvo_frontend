import { combineReducers } from 'redux'

import user from './user/UserReducer'
import owners from './belvo/ownersReducer'
import accounts from './belvo/accountsReducer'
import balances from './belvo/balancesReducer'
import transactions from './belvo/transactionsReducer'

const rootReducer = combineReducers({
    user, 
    owners,
    accounts,
    balances,
    transactions,
});

export default rootReducer