import React from "react";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const inputs = [
    {
        name: "username",
        placeholder: "username",
        type: "text"
    },
    {
        name: "password",
        placeholder: "password",
        type: "password"
    },
    {
        type: "submit",
        value: "Submit",
        className: "btn"
    }
];

const propsLogin = {
    // name: "loginForm",
    // method: "POST",
    // action: "http://localhost:3001/auth/login",
    inputs: inputs
};

function App() {
    const getToken = () => window.localStorage["@mi-libreta-sanitaria"];
    const getuser = () => {
        if (
            getToken() &&
            JSON.parse(window.atob(getToken().split(".")[1])).exp > Date.now() / 1000
        ) {
            let payload = JSON.parse(window.atob(getToken().split(".")[1]));
            return Object.assign(
            {},
            {
                id: payload.id,
                username: payload.username
            }
            );
        } else {
            return false;
        }
    }
    const params = new URLSearchParams(window.location.search);
    console.log(getuser());
    return (
        <Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login {...propsLogin} error={params.get("error")} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
