// UserList.js
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  const cellStyle = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd"
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if token is not found
        return;
      }
      try {
        const response = await fetch('https://reqres.in/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ marginLeft: "10%", marginTop: "70px" }}>
  <h2>User List</h2>
  <table>
    <thead>
      <tr>
        <th style={cellStyle}>ID</th>
        <th style={cellStyle}>Email</th>
        {/* Add more table headers as needed */}
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td style={cellStyle}>{user.id}</td>
          <td style={cellStyle}>{user.email}</td>
          {/* Add more table cells as needed */}
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default UserList;
