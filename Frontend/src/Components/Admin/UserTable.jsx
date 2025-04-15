import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-green-700">👤 Registered Users</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id} className="border-b pb-1">
            <span className="font-medium">{user.username}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTable;
