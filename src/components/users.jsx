import api from "../api";
import {useState} from "react";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll);
    const handleDelete = id => setUsers(users.filter(user => user._id !== id));
    const renderPhrase = (number) => {
        if (number > 4 && number < 15) return "человек тусанет";
        const lastOne = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        return "человек тусанет";
    };
    return (<>
        <h2>
            <span className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}>
                {users.length > 0 ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня` : "Никто с тобой не тусанет"}
            </span>
        </h2>
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
            {users.map(user => (<tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities
                        .map(item => <span
                            className={"badge m-1 bg-" + item.color}
                            key={item._id}>{item.name}
                    </span>)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="btn btn-danger">Удалить
                        </button>
                    </td>
                </tr>))}
            </tbody>
        </table>}
    </>);
}

export default Users;