import React, { Fragment } from "react";
import "../css/PageNotFound.css";

const PageNotFound = () => {
    return (
        <Fragment>
            <div className="pageNotFoundBg">
                <p className="errorMessage">Error 404: Hello sir, we couldn't find your virus.</p>
                <p className="linkMessage">Instead you could go back to our &nbsp;<a href="/">Home page </a></p>
            </div>
        </Fragment>
    );
};

export default PageNotFound;
