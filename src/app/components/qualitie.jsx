/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from "react";
const Qualitie = ({ color, name }) => {
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

export default Qualitie;
