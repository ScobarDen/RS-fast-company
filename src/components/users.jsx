import API from "../api";

const Users = () => {
  console.log(API.users.fetchAll());
  return <h1>Users</h1>;
}

export default Users;