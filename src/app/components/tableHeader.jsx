import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort((prevState) => {
                return {
                    ...prevState,
                    order: prevState.order === "asc" ? "desc" : "asc"
                };
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderArrow = (item) => {
        if (item === selectedSort.path) {
            return <i className={`bi bi-caret-${selectedSort.order === "desc" ? "down" : "up"}-fill`}></i>;
        }
        return null;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => {
                                    handleSort(columns[column].path);
                                }
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].path && "button" }}>
                        {columns[column].name}
                        {columns[column].path && renderArrow(columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
