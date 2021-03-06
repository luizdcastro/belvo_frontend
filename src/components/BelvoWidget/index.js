import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { createUser } from '../../redux/actions/userActions'
import { getOwners, getAccounts, getBalances, getTransactions } from '../../redux/actions/belvoActions'
import { connect } from "react-redux"

const BelvoWidget = ({
    country,
    environment,
    dispatchCreateUser,
    dispatchGetOwners,
    dispatchGetAccounts,
    dispatchGetTransactions,
    dispatchGetBalances,
}) => {
    const history = useHistory()
    const [update, setUpdate] = useState(false)
    const [updateLink, setUpdateLink] = useState("")

    const getBelvoFullData = (link_id, institution) => {

        dispatchGetAccounts(link_id, environment, () => console.log("getting accounts..."), (error) => console.log(error)) // { setUpdateLink(link_id); setUpdate(true);
        dispatchGetBalances(link_id, environment, () => console.log("getting balances..."), (error) => console.log(error))
        dispatchGetTransactions(link_id, environment, () => console.log("getting transactions..."), (error) => console.log(error))

        dispatchGetOwners(
            link_id,
            environment,
            (response) => {
                dispatchCreateUser(
                    response[0].display_name,
                    response[0].email,
                    link_id,
                    institution,
                    environment,
                    () => history.push("/dashboard"),
                    (error) => console.log(error)
                )
            },
            (error) => console.log(error)
        )
    }

    function useScript(src) {

        useEffect(
            () => {
                const node = document.createElement('script')
                node.src = src
                node.type = 'text/javascript'
                node.async = true
                node.onload = createWidget
                document.body.appendChild(node)
            },
            [src, update]
        )
    }

    async function createWidget() {

        function getAccessToken() {

            if (!update) {
                return fetch(`https://belvo-task-api.herokuapp.com/v1/belvo/token/${environment}`, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then((data) => data)
                    .catch(error => console.error('Error:', error))
            } else {
                return fetch(`https://belvo-task-api.herokuapp.com/v1/belvo/update-link/${environment}/${updateLink}`, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then((data) => data)
                    .catch(error => console.error('Error:', error))
            }
        }


        const successCallbackFunction = (link, institution) => {
            getBelvoFullData(link, institution)
        }

        const onExitCallbackFunction = () => {
            history.push("/")
        }

        const onEventCallbackFunction = (data) => {
            if (data.eventName === "PAGE_LOAD" && data.meta_data?.from === "/token") {
                alert("The widget update flow is not fully implemented yet. Please try with an bank that don't require MFA token.")
                history.push("/")
            }
        }

        const config = {
            locale: 'en',
            country_codes: [country],
            institution_types: ['retail', 'business'],
            callback: (link, institution) => successCallbackFunction(link, institution),
            onExit: (data) => onExitCallbackFunction(data),
            onEvent: (data) => onEventCallbackFunction(data),
        }

        const { access } = await getAccessToken()

        window.belvoSDK.createWidget(access, config).build()
    }

    useScript('https://cdn.belvo.io/belvo-widget-1-stable.js')

    return (
        <div id="belvo" />
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchCreateUser: (name, email, link_id, institution, environment, onSuccess, onError) =>
        dispatch(createUser({ name, email, link_id, institution, environment }, onSuccess, onError)),
    dispatchGetOwners: (link_id, environment, onSuccess, onError) =>
        dispatch(getOwners({ link_id, environment }, onSuccess, onError)),
    dispatchGetAccounts: (link_id, environment, onSuccess, onError) =>
        dispatch(getAccounts({ link_id, environment }, onSuccess, onError)),
    dispatchGetBalances: (link_id, environment, onSuccess, onError) =>
        dispatch(getBalances({ link_id, environment }, onSuccess, onError)),
    dispatchGetTransactions: (link_id, environment, onSuccess, onError) =>
        dispatch(getTransactions({ link_id, environment }, onSuccess, onError))
})

export default connect(null, mapDispatchToProps)(BelvoWidget);