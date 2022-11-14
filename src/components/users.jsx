import api from "../api";
import {useState} from "react";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll);
    const handleDelete = id => setUsers(users.filter(user => user._id !== id));
    return (<>
        <SearchStatus users={users}/>
        {users.length > 0 && <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {users.map(user => <User
                onDelete={handleDelete}
                {...user}
                key={user._id}
            />)}
            </tbody>
        </table>}
    </>);
}

export default Users;