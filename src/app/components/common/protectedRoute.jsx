import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
    component: Component,
    children,
    computedMatch,
    ...rest
}) => {
    const { currentUser } = useAuth();
    const { edit, userId } = computedMatch.params;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                if (edit && userId !== currentUser._id) {
                    console.log("my");
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    computedMatch: PropTypes.object
};
