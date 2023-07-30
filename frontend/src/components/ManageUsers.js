import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    fname: "",
    lname: "",
    password: "",
    role: "Admin", // Default role as Admin, you can change it to SuperAdmin or NewsEntry as per your roles
  });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch the list of users from the backend API
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setFormData({
      username: userToEdit.username,
      fname: userToEdit.fname,
      lname: userToEdit.lname,
      role: userToEdit.role,
      password: "", // For editing, you can keep the password empty or remove this field from the form altogether.
    });
    setEditingUserId(userId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Update the user's role
        await axios.put(
          `http://localhost:3000/users/${editingUserId}`,
          formData
        );
      } else {
        // Create a new user on the backend
        await axios.post("http://localhost:3000/users", formData);
      }
      // Fetch updated list of users
      getUsers();
      // Clear form fields
      setFormData({
        username: "",
        fname: "",
        lname: "",
        password: "",
        role: "Admin",
      });
      // Reset editingUserId to null
      setEditingUserId(null);
    } catch (error) {
      console.error("Error creating/updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Delete user on the backend
      await axios.delete(`http://localhost:3000/users/${userId}`);
      // Fetch updated list of users
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>
      <div className="mb-3">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="SuperAdmin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="NewsEntry">News Entry</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary">
              {editingUserId ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>
                  {editingUserId === user._id ? (
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="SuperAdmin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="NewsEntry">News Entry</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <button className="btn btn-success" onClick={handleSubmit}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => handleEdit(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
