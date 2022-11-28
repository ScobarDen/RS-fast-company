import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };
    return (
        <>
            {users
                ? (
                    <Users
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                        users={users}
                    />
                )
                : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border mt-5" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                )}
        </>
    );
}

export default App;
