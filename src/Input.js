import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: props.value? props.value : '',
            className: props.className? props.className : '',
            error: false
        }
    }
    inputChange = (event) => {
        this.setState({value:event.target.value});
        this.sendData(event.target.value, event.target.name);
        // May be call for search result
    }
    sendData=(value, name)=>{
        this.props.updateBody(value,name)
    }
    render () {
        const {handleError, ...opts} = this.props
        this.handleError = handleError
        return (
            <input {...opts} value={this.state.value}
            onChange={this.inputChange}  className={this.state.className} /> 
        )
    }
}

Input.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    handleError: PropTypes.func,
    updateBody: PropTypes.func
}

export default Input