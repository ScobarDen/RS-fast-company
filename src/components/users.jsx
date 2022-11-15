import User from "./user";
import SearchStatus from "./searchStatus";

const Users = (props) => {
    return (<>
        <SearchStatus users={props.users}/>
        {props.users.length > 0 && <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th/>
                <th/>
            </tr>
            </thead>
            <tbody>
            {props.users.map(user => <User
                onDelete={props.onDelete}
                onToggleBookmark={props.onToggleBookmark}
                {...user}
                key={user._id}
            />)}
            </tbody>
        </table>}
    </>);
}

export default Users;