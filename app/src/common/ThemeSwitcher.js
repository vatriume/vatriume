import React from 'react'

class ThemeSwitcher extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dark: true
        }
    }

    toggle = () => this.setState(prev => ({ dark: !prev.dark }))

    render() {
        return (
            <button onClick={this.toggle}>{this.state.dark ? 'On' : 'Off'}</button>
        )
    }
}

export default ThemeSwitcher