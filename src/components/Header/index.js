import React from 'react'
import BelgoLogo from '../../assets/belvo.png'
import './styles.css'

const Header = () => {
    return (
        <div className="header">
            <nav className="header_nav">
                <div>
                    <img src={BelgoLogo} alt="Belvo" className='header_logo'/>
                </div>
            </nav>
        </div>
    )
}

export default Header