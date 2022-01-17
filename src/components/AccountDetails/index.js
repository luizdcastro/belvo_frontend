import React from 'react'
import { connect } from 'react-redux'
import './styles.css'

const AccountDetails = ({ selectedAccount, owners }) => {
    let moment = require('moment')

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                <p style={{ fontSize: '0.8rem' }}>{selectedAccount?.institution?.toUpperCase()}</p>
                <p style={{ fontSize: '0.8rem' }}>Nº {selectedAccount?.account_number} | {selectedAccount?.name?.toUpperCase()} </p>
                <p style={{ fontSize: '0.8rem', marginTop: 20 }}>TOTAL BALANCE</p>
                <p className="account_details_balance">{selectedAccount?.current_balance} <span className="account_details_currency">{selectedAccount?.currency}</span></p>
            </div>
            <div style={{marginTop: 30}}>
                <p  style={{ fontSize: '0.8rem' }}>LAST UPDATE</p>
                <p  style={{ fontSize: '0.8rem' }}>{moment(owners[0]?.created_at).format('DD/MM/YYYY hh:mm')}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    owners: state.owners,
})
export default connect(mapStateToProps, null)(AccountDetails)
