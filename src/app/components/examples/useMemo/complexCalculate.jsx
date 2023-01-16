import React, { useEffect, useMemo, useState } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

function factorial(n) {
    console.log("factorial");
    return n ? n * factorial(n - 1) : 1;
}

const ComplexCalculateExample = () => {
    const [value, setValue] = useState(100);
    const [otherState, setOtherState] = useState(false);
    const fact = useMemo(() => factorial(value), [value]);
    const buttonColor = otherState ? "primary" : "dark";
    useEffect(() => console.log("render"));
    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <p>
                    {value}! = {fact}
                </p>
                <button
                    className="btn btn-primary ms-md-2"
                    onClick={() => setValue((prevState) => prevState + 10)}
                >
                    Increment
                </button>
                <button
                    className="btn btn-primary ms-md-2"
                    onClick={() => setValue((prevState) => prevState - 10)}
                >
                    Decrement
                </button>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <button
                    className={`btn btn-${buttonColor} ms-md-2`}
                    onClick={() => setOtherState((prevState) => !prevState)}
                >
                    Поменять цвет кнопки
                </button>
            </CardWrapper>
        </>
    );
};

export default ComplexCalculateExample;
