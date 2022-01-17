import React from 'react'
import { Helmet } from 'react-helmet'
import BelvoWidget from '../../components/BelvoWidget'
import Header from '../../components/Header'
import { useLocation } from 'react-router-dom'
import { MetroSpinner } from "react-spinners-kit"

const ConnectPage = () => {
    const { state } = useLocation()

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Auth – Belvo API</title>
            </Helmet>
            <div>
                <Header />
                <div style={{ display: 'flex', width: '100%', height: '90vh', alignItems: 'center', justifyContent: 'center' }}>
                    <MetroSpinner size={55} color='#7758e9' />
                    <BelvoWidget country={state.country} environment={state.environment} />
                </div>
            </div>
        </div>
    )
}

export default ConnectPage