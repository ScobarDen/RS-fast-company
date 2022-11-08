import Button from "./button";
import Badge from "./badge";

const Table = ({users,handleDelete}) => {
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) =>{
                return(
                    <tr key={user._id}>
                        <td scope="row">{user.name}</td>
                        <td>{user.qualities
                            .map(quality => <Badge name={quality.name} color={quality.color} key = {quality._id}/>)}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}/5</td>
                        <td><Button id = {user._id} handleDelete = {handleDelete}/></td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default Table;