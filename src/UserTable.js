import React, { useEffect, useState } from "react";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/getAllUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/deleteUser/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditData(user);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/updateUser/${editingUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      alert("User updated successfully");
      fetchUsers();
      cancelEditing();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Information</h2>
      {users.length === 0 ? (
        <p>No users available. Please add some users.</p>
      ) : (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>College</th>
              <th>University</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              editingUserId === user._id ? (
                <tr key={user._id}>
                  <td>
                    <input
                      type="text"
                      name="firstname"
                      value={editData.firstname || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastname"
                      value={editData.lastname || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="age"
                      value={editData.age || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="college"
                      value={editData.college || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="university"
                      value={editData.university || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={editData.address || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.age}</td>
                  <td>{user.college}</td>
                  <td>{user.university}</td>
                  <td>{user.address}</td>
                  <td>
                    <button onClick={() => startEditing(user)}>Edit</button>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;

//
//

// import React, { useEffect, useState } from "react";

// function UserTable() {
//   const [users, setUsers] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editedUser, setEditedUser] = useState({});

//   // Fetch users
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/users/getAllUsers");
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Update user in backend
//   const updateUser = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/updateUser/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editedUser),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to update user");
//       }
//       alert("User updated successfully!");
//       setEditingUserId(null); // Exit edit mode
//       fetchUsers(); // Refresh users
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   // Delete user
//   const deleteUser = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/deleteUser/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to delete user");
//       }
//       alert("User deleted successfully");
//       fetchUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   // Handle input change for editing
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>User Information</h2>
//       {users.length === 0 ? (
//         <p>No users available. Please add some users.</p>
//       ) : (
//         <table border="1" style={{ width: "100%", textAlign: "left" }}>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Age</th>
//               <th>College</th>
//               <th>University</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 {editingUserId === user._id ? (
//                   <>
//                     <td>
//                       <input
//                         type="text"
//                         name="firstname"
//                         value={editedUser.firstname || user.firstname}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="lastname"
//                         value={editedUser.lastname || user.lastname}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         name="age"
//                         value={editedUser.age || user.age}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="college"
//                         value={editedUser.college || user.college}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="university"
//                         value={editedUser.university || user.university}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         name="address"
//                         value={editedUser.address || user.address}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <button onClick={() => updateUser(user._id)}>Save</button>
//                       <button onClick={() => setEditingUserId(null)}>
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{user.firstname}</td>
//                     <td>{user.lastname}</td>
//                     <td>{user.age}</td>
//                     <td>{user.college}</td>
//                     <td>{user.university}</td>
//                     <td>{user.address}</td>
//                     <td>
//                       <button
//                         onClick={() => {
//                           setEditingUserId(user._id);
//                           setEditedUser(user);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button onClick={() => deleteUser(user._id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default UserTable;

//
//

// import React, { useEffect, useState } from "react";

// function UserTable() {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/users/getAllUsers");
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/deleteUser/${id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to delete user");
//       }
//       alert("User deleted successfully");
//       fetchUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>User Information</h2>
//       {users.length === 0 ? (
//         <p>No users available. Please add some users.</p>
//       ) : (
//         <table border="1" style={{ width: "100%", textAlign: "left" }}>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Age</th>
//               <th>College</th>
//               <th>University</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.firstname}</td>
//                 <td>{user.lastname}</td>
//                 <td>{user.age}</td>
//                 <td>{user.college}</td>
//                 <td>{user.university}</td>
//                 <td>{user.address}</td>
//                 <td>
//                   <button onClick={() => alert(`Edit user: ${user.firstname}`)}>
//                     Edit
//                   </button>
//                   <button onClick={() => deleteUser(user._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default UserTable;
