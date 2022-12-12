import React from "react";
import Users from "./components/layout/users";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/layout/main";
import Login from "./components/layout/login";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
