import React, { Component } from 'react';
import ReactToggleButton from 'react-toggle-button'


class ToggleButton extends Component {
    render() {

        var {onToggle, name, ...props} = this.props

        return (
            <div className="switch-button-container">
                <ReactToggleButton onToggle={this.onToggle} {...props}/>
            </div>
        );
    }

    onToggle = (v) => {
       return this.props.onToggle(!v, this.props.name)
    }
    
}

export default ToggleButton;