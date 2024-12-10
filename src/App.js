import React, { useState, useEffect } from "react";
import "./App.css";
import UserTable from "./UserTable.js";
import AdminForm from "./AdminForm.js";

function App() {
  const [view, setView] = useState("user");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/users/getAllUsers");
    const data = await response.json();
    setUsers(data);
  };

  const saveUser = async (user) => {
    await fetch("http://localhost:3001/users/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    alert("User added successfully!");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:3001/users/deleteUser/${id}`, {
      method: "DELETE",
    });
    alert("User deleted successfully!");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <h1>Header</h1>
          <div className="buttons">
            <button onClick={() => setView("user")}>User</button>
            <button onClick={() => setView("admin")}>Admin</button>
          </div>
        </div>
      </header>

      <main>
        {view === "user" ? (
          <UserTable users={users} deleteUser={deleteUser} />
        ) : (
          <AdminForm saveUser={saveUser} />
        )}
      </main>

      <footer>
        <p>Footer Content</p>
      </footer>
    </div>
  );
}

export default App;

// import logo from "./logo.svg";
// import React, { useState } from "react";
// import "./App.css";
// import UserTable from "./UserTable.js";
// import AdminForm from "./AdminForm.js";

// function App() {
//   const [view, setView] = useState("user");
//   const [users, setUsers] = useState([]);

//   const saveUser = (user) => {
//     setUsers((prevUsers) => [...prevUsers, user]);
//   };

//   const deleteUser = (index) => {
//     setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="App">
//       <header>
//         <div className="header-content">
//           <h1>Header</h1>
//           <div className="buttons">
//             <button onClick={() => setView("user")}>User</button>
//             <button onClick={() => setView("admin")}>Admin</button>
//           </div>
//         </div>
//       </header>

//       <main>
//         {view === "user" ? (
//           <UserTable users={users} deleteUser={deleteUser} />
//         ) : (
//           <AdminForm saveUser={saveUser} />
//         )}
//       </main>

//       <footer>
//         <p>Footer Content</p>
//       </footer>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <div style={{ textAlign: "center", padding: "20px" }}>
//         <h2>Welcome to User Info</h2>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
