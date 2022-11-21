/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from "react";

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

export default BookMark;
