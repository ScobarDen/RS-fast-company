import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const LogOutButton = ({ onLogOut }) => {
    useEffect(() => console.log("render button"));
    return (
        <button className="btn btn-primary" onClick={onLogOut}>
            Выйти из системы
        </button>
    );
};

LogOutButton.propTypes = {
    onLogOut: PropTypes.func
};

function areEqual(prevState, nextState) {
    return prevState.onLogOut === nextState.onLogOut;
}

const MemoizedLogOutButton = React.memo(LogOutButton, areEqual);

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false);
    const handleLogOut = useCallback(() => {
        localStorage.removeItem("auth");
    }, []);
    return (
        <>
            <MemoizedLogOutButton onLogOut={handleLogOut} />
            <button
                className="btn btn-dark mx-1"
                onClick={() => setState(!state)}
            >
                Set State
            </button>
        </>
    );
};

export default MemoWithUseCallbackExample;
