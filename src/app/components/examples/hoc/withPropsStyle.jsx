import React from "react";
import CardWrapper from "../../common/Card";

const withPropsStyle = (Component) => (props) => {
    return (
        <CardWrapper>
            <Component {...props} name={"Denis"}/>
        </CardWrapper>
    );
};

export default withPropsStyle;
