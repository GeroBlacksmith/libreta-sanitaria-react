import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Home extends Component {
    constructor() {
        super();
        //Set default message
        this.state = {
            message: "Loading..."
        };
    }
    componentDidMount() {
        //GET message from server using fetch api
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}
