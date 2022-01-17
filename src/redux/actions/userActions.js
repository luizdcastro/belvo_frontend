import * as constants from '../constants'

export const createUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/user/create',
        data,
        success: (response) => setUserInfo(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
})

export const logoutUser = () => ({
    type: constants.RESET_USER_INFO,
    payload: [],
})

const setUserInfo = (response) => ({    
    type: constants.SET_USER_INFO,
    payload: {
        id: response.data.id,
        link_id: response.data.link_id,
        name: response.data.name,
        email: response.data.email,
        environment: response.data.environment,
        connected: true,
    },    
})