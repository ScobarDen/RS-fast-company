import React, { useRef } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";

const ProgrammableActionsExample = () => {
    const inputRef = useRef(null);
    const handleClick = () => {
        console.log(inputRef.current.value);
        inputRef.current.focus();
    };
    const handleClickWidth = () => {
        inputRef.current.style.width = "300px";
    };
    return (
        <CardWrapper>
            <SmallTitle className="card-title">
                Программируемые действия и свойства
            </SmallTitle>
            <Divider />
            <label htmlFor="email" className="form-label">
                Email:{" "}
            </label>
            <input
                ref={inputRef}
                type="email"
                className="form-control"
                id="email"
            />
            <button className="btn btn-primary mt-3" onClick={handleClick}>
                Фокус Email
            </button>
            <button
                className="btn btn-danger mt-3 mx-2"
                onClick={handleClickWidth}
            >
                Изменить ширину
            </button>
        </CardWrapper>
    );
};

export default ProgrammableActionsExample;
