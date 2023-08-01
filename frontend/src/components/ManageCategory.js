import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ code: "", title: "" });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (categoryId) => {
    const categoryToEdit = categories.find(
      (category) => category._id === categoryId
    );
    setFormData({ code: categoryToEdit.code, title: categoryToEdit.title });
    setEditingCategoryId(categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        await axios.put(
          `http://localhost:3000/categories/${editingCategoryId}`,
          formData
        );
        toast.info("Successfully updated!");
      } else {
        await axios.post("http://localhost:3000/categories", formData);
        toast.success("Successfully added!");
      }
      getCategories();
      setFormData({ code: "", title: "" });
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error creating/updating category:", error);
      toast.error("An error occurred while saving the category.");
    }
  };

  const handleDeleteClick = (categoryId) => {
    setDeletingCategoryId(categoryId);
  };

  const handleCancelDelete = () => {
    setDeletingCategoryId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/categories/${deletingCategoryId}`
      );
      getCategories();
      toast.error("Successfully deleted!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category.");
    } finally {
      setDeletingCategoryId(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Categories</h2>
      <div className="mb-3">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Category Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Category Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">
              {editingCategoryId ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Category Code</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.code}</td>
                <td>{category.title}</td>
                <td>
                  {editingCategoryId === category._id ? (
                    <button className="btn btn-success" onClick={handleSubmit}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => handleEdit(category._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(category._id)}
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
        className={`modal fade ${deletingCategoryId ? "show" : ""}`}
        id="confirmDeleteModal"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden={!deletingCategoryId}
        style={{ display: deletingCategoryId ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancelDelete}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this category?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ManageCategory;
