import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    date: "",
    addedBy: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState("");

  // Fetch the list of news, users, and categories on component mount
  useEffect(() => {
    fetchNews();
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:3000/news");
      setNewsList(response.data);
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/news/${currentNewsId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/news", formData);
      }
      setFormData({
        category: "",
        title: "",
        content: "",
        date: "",
        addedBy: "",
      });
      setIsEditing(false);
      setCurrentNewsId("");
      // Fetch the updated news entries
      fetchNews();
    } catch (error) {
      console.log("Error creating/updating news:", error);
    }
  };

  const handleEdit = (news) => {
    setFormData(news);
    setIsEditing(true);
    setCurrentNewsId(news._id);
  };

  const handleDelete = async (newsId) => {
    try {
      await axios.delete(`http://localhost:3000/news/${newsId}`);
      fetchNews();
    } catch (error) {
      console.log("Error deleting news:", error);
    }
  };

  // Function to get the full name of the user based on user ID
  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      return `${user.fname} ${user.lname} (${user.username})`;
    }
    return "Unknown User";
  };

  return (
    <div className="container mt-4">
      {/* Form for creating/updating news */}
      <h2>News Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="addedBy" className="form-label">
            Added By
          </label>
          <select
            className="form-control"
            id="addedBy"
            name="addedBy"
            value={formData.addedBy}
            onChange={handleChange}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fname} {user.lname} ({user.username})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>

      {/* Table to display the list of news */}
      <h3 className="mt-4">News List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
            <th scope="col">Added By</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news._id}>
              <td>
                {news.category ? news.category.title : "Unknown Category"}
              </td>
              <td>{news.title}</td>
              <td>{news.content}</td>
              <td>{new Date(news.date).toDateString()}</td>
              <td>{getUserName(news.addedBy)}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(news)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(news._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNews;
