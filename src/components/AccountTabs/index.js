import React, { useEffect } from 'react'
import AccountDetails from '../AccountDetails'
import CategoriesChart from '../CategoriesChart'
import TransactionsTable from '../TransactionsTable'
import './styles.css'

const AccountTabs = ({ accounts, selectedAccount, setSelectedAccount }) => {

    useEffect(() => {
        setSelectedAccount(accounts[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ margin: 30 }}>
            <ul className="tabs_header">
                {accounts.map((account) =>
                    <li
                        className={selectedAccount.account_id === account.account_id ? 'tabs_title_active' : 'tabs_title'}
                        key={account.account_id}
                        onClick={() => setSelectedAccount(account)}>
                        {account.name?.toUpperCase()}
                    </li>
                )}
            </ul>
            <AccountDetails selectedAccount={selectedAccount} />
            <div style={{ display: 'flex', marginTop:30 }}>                
                <TransactionsTable selectedAccount={selectedAccount} />
                <CategoriesChart selectedAccount={selectedAccount} />
            </div>
        </div>
    )
}

export default AccountTabs