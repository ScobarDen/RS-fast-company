import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
    return !isAuth ? (
        <button className="btn btn-success" onClick={onLogin}>
            Войти
        </button>
    ) : (
        <button className="btn btn-dark" onClick={onLogOut}>
            Выйти из системы
        </button>
    );
};

SimpleComponent.propTypes = {
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func,
    isAuth: PropTypes.bool
};

export default SimpleComponent;
