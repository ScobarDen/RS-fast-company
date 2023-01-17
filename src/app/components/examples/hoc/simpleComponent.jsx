import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({ onLogin, onLogout, isAuth }) => {
    return !isAuth ? (
        <button className="btn btn-success" onClick={onLogin}>
            Войти
        </button>
    ) : (
        <button className="btn btn-dark" onClick={onLogout}>
            Выйти из системы
        </button>
    );
};

SimpleComponent.propTypes = {
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    isAuth: PropTypes.bool
};

export default SimpleComponent;
