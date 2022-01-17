import * as constants from '../constants'

export const getAccounts = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/belvo/accounts',
        data,
        success: (response) => getAccountsData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

export const getTransactions = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/belvo/transactions',
        data,
        success: (response) => getTransactionsData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

export const getBalances = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/belvo/balances',
        data,
        success: (response) => getBalancesData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

export const getOwners = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/belvo/owners',
        data,
        success: (response) => getOwnersData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

export const deleteLink = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/belvo/delete',
        data,
        success: (response) => deleteLinkData(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

export const updateLink = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/belvo/update-link',
        data,
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

const getAccountsData = (data) => ({
    type: constants.GET_ACCOUNTS,
    payload: data,
})

const getTransactionsData = (data) => ({
    type: constants.GET_TRANSACTIONS,
    payload: data,
})

const getBalancesData = (data) => ({
    type: constants.GET_BALANCES,
    payload: data,
})

const getOwnersData = (data) => ({
    type: constants.GET_OWNERS,
    payload: data,
})

const deleteLinkData = (data) => ({
    type: constants.RESET_USER_INFO,
    payload: [],
})