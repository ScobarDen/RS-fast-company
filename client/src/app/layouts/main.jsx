import React from "react";

const Main = () => {
    return (
        <div className="container mt-5">
            <h1> Main Page</h1>
            <br />
            <h2>README.md</h2>
            <code>
                <h3>Fast Company</h3>
                <hr />
                <h4>Client</h4>
                <hr />
                <p>Здесь находится фронтенд часть проекта</p>
                <p>
                    Стэк: <strong>react</strong>, <strong>redux</strong>,
                    <strong>bootstrap</strong>
                </p>
                <h4>Server</h4>
                <hr />
                <p>Здесь находится бэкенд часть проекта</p>
                <p>
                    Стэк: <strong>nodeJS</strong>, <strong>expressJS</strong>,
                    <strong>mongoDB</strong>
                </p>
                <h4>Dockerfile</h4>
                <hr />
                <p>Dockerfile для создания docker контейнеров</p>
            </code>
            <a
                href="https://github.com/ScobarDen/rs-fast-company"
                className="link-dark h1"
            >
                <i className="bi bi-github"></i>
            </a>
        </div>
    );
};

export default Main;
