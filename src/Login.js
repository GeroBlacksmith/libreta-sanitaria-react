import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        if (props.error) {
            this.state = {
                failure: "wrong user password",
                errcount: 0,
                username: "",
                password: ""
            };
        } else {
            this.state = { errcount: 0 };
        }
    }
    saveToken = token => {
        window.localStorage["@mi-libreta-sanitaria"] = token;
    };
    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.errcount) {
            axios
                .post("http://localhost:3001/auth/login", {
                    username: this.state.username,
                    password: this.state.password
                })
                .then(
                    ({data}) => {
                        this.saveToken(data.access_token);
                    },
                    error => {
                        console.warn(error);
                    }
                );
        }
    };
    handlerError = (field, errmsg) => {
        if (!field) return;

        if (errmsg) {
            this.setState(prevState => ({
                failure: "",
                errcount: prevState.errcount + 1,
                errmsgs: { ...prevState.errmsgs, [field]: errmsg }
            }));
        } else {
            this.setState(prevState => ({
                failure: "",
                errcount: prevState.errcount === 1 ? 0 : prevState.errcount - 1,
                errmsgs: { ...prevState.errmsgs, [field]: "" }
            }));
        }
    };
    renderError = () => {
        if (this.state.errcount || this.state.failure) {
            const errmsg =
                this.state.failure ||
                Object.values(this.state.errmsgs).find(v => v);
            return <div className="error">{errmsg}</div>;
        }
    };
    setBody = (value, input) => {
        if (input === "username") {
            this.setState({ username: value });
        }
        if (input === "password") {
            this.setState({ password: value });
        }
    };
    render() {
        const inputs = this.props.inputs.map(
            ({ name, placeholder, type, value, className }, index) => (
                <Input
                    key={index}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    className={type === "submit" ? className : ""}
                    handleError={this.handlerError}
                    updateBody={this.setBody}
                />
            )
        );
        const error = this.renderError();
        const { handlerError, ...opts } = this.props;
        this.handlerError = handlerError;
        return (
            <form {...this.props} onSubmit={this.handleSubmit}>
                {inputs}
                {error}
            </form>
        );
    }
}
Login.propTypes = {
    name: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    inputs: PropTypes.array,
    error: PropTypes.string
};
export default Login;
