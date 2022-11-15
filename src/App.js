import Users from "./components/users";
import {useState} from "react";
import api from "./api";


const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll);
  const handleDelete = id => setUsers(users.filter(user => user._id !== id));
  const handleToggleBookmark = id => {
    setUsers(prev => prev.map(user => {
      if (user._id === id) {
        return {...user, isFavorite: !user.isFavorite};
      }
      return user;
    }));
  };

  return(
      <Users
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
          users={users}
      />
  );
};

export default App;