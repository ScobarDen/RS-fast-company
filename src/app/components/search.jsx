import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchValue, handleSearch }) => {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                Поиск по имени
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Брэд Питт"
                value={searchValue}
                onChange={handleSearch}
            />
        </div>
    );
};

Search.propTypes = {
    searchValue: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
};

export default Search;
