import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Link } from 'react-router-dom'

import './styles.css'

const HomePage = () => {
    const [country, setCountry] = useState('')
    const [environment, setEnvironment] = useState('')

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home – Belvo API</title>
            </Helmet>
            <div>
                <Header />
                <div className="home_hero">
                    <h1 className="home_title">Welcome to Belvo solutions engineer challenge</h1>
                    <h2 className="home_subtitle">Explore the demo integration and discover how users can connect their accounts to your app in seconds.</h2>
                </div>
                <div className="home_section">
                    <Box sx={{ width: 350 }}>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginRight: 10 }}>Country</InputLabel>
                            <Select
                                value={country}
                                label="Country"
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <MenuItem value={"BR"}>Brazil</MenuItem>
                                <MenuItem value={"CO"}>Colombia</MenuItem>
                                <MenuItem value={"MX"}>Mexico</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth style={{ marginTop: 15 }}>
                            <InputLabel style={{ marginRight: 10 }}>Environment</InputLabel>
                            <Select
                                value={environment}
                                label="Envireoment"
                                onChange={(e) => setEnvironment(e.target.value)}
                            >
                                <MenuItem value={"development"}>Development (Real Data)</MenuItem>
                                <MenuItem value={"sandbox"}>Sandbox (Demo Data)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {!!country && !!environment ?
                        <Link className='home_button' to={{ pathname: "/connect", state: { country: country, environment: environment } }} >
                            Get Started
                        </Link>
                        : <div className='home_button_disabled'>
                            Get Started
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default HomePage