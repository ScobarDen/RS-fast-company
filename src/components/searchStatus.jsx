const SearchStatus = ({users}) => {
    const renderPhrase = (number) => {
        if (number > 4 && number < 15) return "человек тусанет";
        const lastOne = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        return "человек тусанет";
    };

    return (
        <h2>
            <span className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}>
                {users.length > 0 ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня` : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

export default SearchStatus;