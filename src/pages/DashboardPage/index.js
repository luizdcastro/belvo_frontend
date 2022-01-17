import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import AccountTabs from '../../components/AccountTabs'
import { useHistory } from "react-router-dom"
import { Ellipsis } from 'react-css-spinners'
import { getAccounts, getBalances, getTransactions, getOwners, deleteLink } from '../../redux/actions/belvoActions'

import './styles.css'

const DashboardPage = ({
    user,
    owners,
    balances,
    transactions,
    accounts,
    dispatchGetAccounts,
    dispatchGetBalances,
    dispatchGetTransactions,
    dispatchGetOwners,
    dispatchDeleteLink
}) => {
    const [link_data, setLink_data] = useState({})
    const [selectedAccount, setSelectedAccount] = useState({})
    const [loading_update, setLoadingUpdate] = useState(false)
    const [loading_delete, setLoadingDelete] = useState(false)
    const history = useHistory()

    useMemo(() => {
        let filtered_data = []
        // eslint-disable-next-line no-unused-vars
        for (const [i, item] of Object.entries(accounts)) {
            const balance_account = Object.values(balances).filter(balance => balance.account.id === item.id)
            const transaction_account = Object.values(transactions).filter(transaction => transaction.account.id === item.id)

            filtered_data.push({
                account_id: item.id,
                type: item.type,
                name: item.name,
                institution: item.institution.name,
                account_number: item.number,
                currency: item.currency,
                current_balance: item.balance.current,
                collected_at: item.collected_at,
                balance: balance_account,
                transaction: transaction_account
            })
        }

        setLink_data({
            link_id: user.link_id,
            name: user.name,
            email: user.email,
            accounts: filtered_data
        })

    }, [user, balances, transactions, accounts])

    const handleUpdateData = (event) => {
        event.preventDefault();
        setLoadingUpdate(true)
        dispatchGetTransactions(user.link_id, user.environment, () => console.log('transactions updated'), (error) => console.log(error))
        dispatchGetAccounts(user.link_id, user.environment, () => console.log('accounts updated'), (error) => console.log(error))
        dispatchGetBalances(user.link_id, user.environment, () => console.log('balances updated'), (error) => console.log(error))
        dispatchGetOwners(user.link_id, user.environment, () => { console.log('owners updated'); setLoadingUpdate(false) }, (error) => console.log(error))
    }

    const handleDeleteLink = (event) => {
        event.preventDefault();
        setLoadingDelete(true)
        dispatchDeleteLink(
            user.link_id,
            user.id,
            () => {history.push("/"); setLoadingDelete(false) },
            (error) => console.log(error)
        )
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard – Belvo API</title>
            </Helmet>
            <div>
                <Header />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 30 }}>
                    <div>
                        <p style={{ fontSize: '0.8rem' }}>OWNER</p>
                        <p style={{ fontSize: '1.2rem' }}>{owners[0].display_name?.toUpperCase()}</p>
                        <p style={{ fontSize: '0.8rem' }}>{owners[0].document_id?.document_type}: {owners[0].document_id.document_number}</p>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button className='update_button' disabled={loading_update ? true : false} onClick={handleUpdateData}>
                            {
                                !loading_update ? 'Update Data' : <span> <Ellipsis color="#FFF" size={28} style={{ marginTop: 3 }} /></span>
                            }
                        </button>
                        <button className='reset_button' disabled={loading_delete ? true : false} onClick={handleDeleteLink}>
                            {
                                !loading_delete ? 'Delete Link' : <span> <Ellipsis color="#FFF" size={28} style={{ marginTop: 3 }} /></span>
                            }
                        </button>
                    </div>
                </div>
                <AccountTabs accounts={link_data.accounts} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    owners: state.owners,
    balances: state.balances,
    accounts: state.accounts,
    transactions: state.transactions,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAccounts: (link_id, environment, onSuccess, onError) =>
        dispatch(getAccounts({ link_id, environment }, onSuccess, onError)),
    dispatchGetBalances: (link_id, environment, onSuccess, onError) =>
        dispatch(getBalances({ link_id, environment }, onSuccess, onError)),
    dispatchGetTransactions: (link_id, environment, onSuccess, onError) =>
        dispatch(getTransactions({ link_id, environment }, onSuccess, onError)),
    dispatchGetOwners: (link_id, environment, onSuccess, onError) =>
        dispatch(getOwners({ link_id, environment }, onSuccess, onError)),
    dispatchDeleteLink: (link_id, user_id, environment, onSuccess, onError) =>
        dispatch(deleteLink({ link_id, user_id, environment }, onSuccess, onError)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)