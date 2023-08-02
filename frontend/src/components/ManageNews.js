import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    pictures: [],
    pictureUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDeleteId, setNewsToDeleteId] = useState("");

  useEffect(() => {
    fetchNews();
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/news?populate=category"
      );
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
      const categoriesData = response.data;
      setCategories(categoriesData);
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

  const handleAddPictureUrl = () => {
    if (formData.pictureUrl.trim() !== "") {
      setFormData({
        ...formData,
        pictures: [...formData.pictures, formData.pictureUrl],
        pictureUrl: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newsData = {
        category: formData.category,
        title: formData.title,
        content: formData.content,
        date: formData.date,
        addedBy: formData.addedBy,
        pictures: formData.pictures,
      };

      if (isEditing) {
        await axios.put(
          `http://localhost:3000/news/${currentNewsId}`,
          newsData
        );
        toast.success("News successfully updated.");
      } else {
        await axios.post("http://localhost:3000/news", newsData);
        toast.success("News successfully added.");
      }

      setFormData({
        category: "",
        title: "",
        content: "",
        date: "",
        addedBy: "",
        pictures: [],
        pictureUrl: "",
      });
      setIsEditing(false);
      setCurrentNewsId("");
      fetchNews();
    } catch (error) {
      console.log("Error creating/updating news:", error);
    }
  };

  const handleEdit = (news) => {
    setFormData({
      category: news.category._id,
      title: news.title,
      content: news.content,
      date: news.date,
      addedBy: news.addedBy._id,
      pictures: news.pictures,
      pictureUrl: "",
    });
    setIsEditing(true);
    setCurrentNewsId(news._id);
    toast.info("Editing news entry.");
  };

  const handleDelete = async (newsId) => {
    setNewsToDeleteId(newsId);
    setShowDeleteModal(true);
  };

  const hideDeleteConfirmationModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/news/${newsToDeleteId}`);
      toast.error("News successfully deleted.");
      fetchNews();
      hideDeleteConfirmationModal();
    } catch (error) {
      console.log("Error deleting news:", error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      return `${user.fname} ${user.lname} (${user.username})`;
    }
    return "Unknown User";
  };

  return (
    <div className="container mt-4">
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
          <CKEditor
            editor={ClassicEditor}
            data={formData.content}
            onChange={(event, editor) => {
              const content = editor.getData();
              setFormData({ ...formData, content });
            }}
            required
          />
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
                {user.fname} {user.lname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="pictureUrl" className="form-label">
            Picture URL
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="pictureUrl"
              name="pictureUrl"
              value={formData.pictureUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddPictureUrl}
            >
              Add Picture
            </button>
          </div>
        </div>
        <div>
          {formData.pictures.map((pictureUrl) => (
            <img
              key={pictureUrl}
              src={pictureUrl}
              alt="News"
              className="img-thumbnail"
              style={{ maxWidth: "100px", marginRight: "10px" }}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="mt-4">News List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
            <th scope="col">Added By</th>
            <th scope="col">Picture</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news._id}>
              <td>
                {news.category && news.category.title
                  ? news.category.title
                  : "Unknown Category"}
              </td>
              <td>{news.title}</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
              </td>
              <td>{new Date(news.date).toDateString()}</td>
              <td>{getUserName(news.addedBy)}</td>
              <td>
                {news.pictures.map((pictureUrl) => (
                  <img
                    key={pictureUrl}
                    src={pictureUrl}
                    alt="News"
                    className="img-thumbnail"
                    style={{ maxWidth: "100px", marginRight: "10px" }}
                  />
                ))}
              </td>
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

      <div
        className={`modal fade ${showDeleteModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteConfirmationModal"
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmationModal">
                Delete News
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideDeleteConfirmationModal}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this news entry?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={hideDeleteConfirmationModal}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageNews;
