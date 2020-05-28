import React from 'react'

import './Sidebar.css'
import ThemeSwitcher from './ThemeSwitcher'

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <ul className="navbar">
                    <li className="navbar-item active"><a href="/"><img className="logo" src={this.props.logo} alt="VA" /></a></li>
                    <li className="navbar-item"><a href="/"><img className="logo" src={this.props.logo} alt="VA" /></a></li>
                    <li className="navbar-item"><a href="/"><img className="logo" src={this.props.logo} alt="VA" /></a></li>
                    <li className="navbar-item"><a href="/"><img className="logo" src={this.props.logo} alt="VA" /></a></li>
                    <li className="navbar-item"><a href="/schedule"><img className="logo" src={this.props.logo} alt="VA" /></a></li>
                    <li className="navbar-item"><a href="/">VA</a></li>
                    <li className="navbar-item theme"><ThemeSwitcher /></li>
                </ul>
                
            </div>
        )
    }
}

export default Sidebar