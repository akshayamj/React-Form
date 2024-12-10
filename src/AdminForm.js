import React, { useState, useEffect } from "react";

function AdminForm() {
  //{ saveUser }
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    college: "",
    university: "",
    address: "",
  });

  const [submitData, setSubmitData] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dfgads", formData);
    setSubmitData(formData);
  };

  useEffect(() => {
    submitData &&
      fetch("http://localhost:3001/users/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      })
        .then((response) => response.json())
        .then(() =>
          setFormData({
            firstname: "",
            lastname: "",
            age: "",
            college: "",
            university: "",
            address: "",
          })
        );
  }, [submitData]);

  // const [submitData, setSubmitData] = useState(null);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitData(formData);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   saveUser(formData);
  //   setFormData({
  //     firstname: "",
  //     lastname: "",
  //     age: "",
  //     college: "",
  //     university: "",
  //     address: "",
  //   });
  //   alert("User added successfully!");
  // };

  // fetch('https://api.example.com/data')
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch("https://jsonplaceholder.typicode.com/posts", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       alert("Data saved successfully!");
  //       console.log(data);
  //     });
  // };

  return (
    <div>
      <h2>Admin Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>College:</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>University:</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AdminForm;
