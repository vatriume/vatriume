import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ThemeSwitcher.css'


class ThemeSwitcher extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dark: true
        }

        this.store = typeof localStorage === 'undefined' ? null : localStorage
    }

    componentDidMount() {
        if (this.store) this.setState({ dark: this.store.getItem('ThemeSwitcher') || true })
        document.getElementsByTagName("body")[0].classList.add((this.state.dark) ? 'dark' : 'light')
    }

    componentDidUpdate() {
        if (this.store) this.store.setItem('ThemeSwitcher', this.state.dark)
    }

    toggle = () => {
        this.setState(prev => ({ dark: !prev.dark }))
        document.getElementsByTagName("body")[0].classList.replace((this.state.dark) ? 'dark' : 'light', (this.state.dark) ? 'light' : 'dark')
    }

    render() {
        return (
            <>
            <button
                className="ThemeSwitcher"
                onClick={this.toggle}
            >
                { this.state.dark ? 
                  <FontAwesomeIcon icon="moon" /> : 
                  <FontAwesomeIcon icon="sun" /> }
            </button>
            </>
        )
    }
}

export default ThemeSwitcher