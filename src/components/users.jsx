import API from "../api";
import Badge from "./badge";
import Table from "./table";
import {useState} from "react";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (id) => {
        setUsers(usersPrev => usersPrev.filter(user => user._id !== id));
    };

    const renderPhrase = (number) => {
        const endings = ['2', '3', '4'];
        const ending = number.toString()[number.toString().length - 1];
        const name = number
            ? `${number} человек${endings.includes(ending) ? 'а' : ''} тусанет с тобой сегодня`
            : 'никто с тобой не тусанет'
        return <Badge name={name} color={number ? 'primary' : 'danger'} size="fs-3"/>;
    };


    return (
        <>
            {renderPhrase(users.length)}
            {users.length !== 0 && <Table users={users} handleDelete={handleDelete}/>}
        </>

    );
}

export default Users;