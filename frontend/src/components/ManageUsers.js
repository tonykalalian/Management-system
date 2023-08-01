import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    fname: "",
    lname: "",
    password: "",
    role: "Admin",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setFormData({
      username: userToEdit.username,
      fname: userToEdit.fname,
      lname: userToEdit.lname,
      role: userToEdit.role,
    });
    setEditingUserId(userId);
  };

  const handleSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const handleErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(
          `http://localhost:3000/users/${editingUserId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/users", formData);
      }
      getUsers();
      setFormData({
        username: "",
        fname: "",
        lname: "",
        password: "",
        role: "Admin",
      });
      setEditingUserId(null);

      const message = editingUserId
        ? "User updated successfully!"
        : "User added successfully!";
      handleSuccessToast(message);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      handleErrorToast("Error creating/updating user");
    }
  };

  const handleChangePassword = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/users/${userId}/change-password`, {
        password: newPassword,
      });
      getUsers();
      setNewPassword("");

      handleSuccessToast("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      handleErrorToast("Error changing password");
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      username: "",
      fname: "",
      lname: "",
      password: "",
      role: "Admin",
    });
    setEditingUserId(null);
  };

  const handleDelete = async (userId) => {
    setUserToDeleteId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${userToDeleteId}`);
      getUsers();
      setShowDeleteModal(false);

      // Show a success toast when the user is successfully deleted
      toast.error("User deleted successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      setShowDeleteModal(false);
    }
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
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
              <th>Password</th>
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
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      name="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  ) : (
                    "********"
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => handleChangePassword(editingUserId)}
                      >
                        Save Password
                      </button>
                    </>
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

      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="btn-close"
                onClick={cancelDelete}
              />
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
