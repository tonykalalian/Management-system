import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch the list of categories from the backend API
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (categoryId) => {
    const categoryToEdit = categories.find(
      (category) => category._id === categoryId
    );
    setFormData({
      code: categoryToEdit.code,
      title: categoryToEdit.title,
    });
    setEditingCategoryId(categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        // Update the category
        await axios.put(
          `http://localhost:3000/categories/${editingCategoryId}`,
          formData
        );
      } else {
        // Create a new category on the backend
        await axios.post("http://localhost:3000/categories", formData);
      }
      // Fetch updated list of categories
      getCategories();
      // Clear form fields
      setFormData({
        code: "",
        title: "",
      });
      // Reset editingCategoryId to null
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error creating/updating category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      // Delete category on the backend
      await axios.delete(`http://localhost:3000/categories/${categoryId}`);
      // Fetch updated list of categories
      getCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
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
                        onClick={() => handleDelete(category._id)}
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

export default ManageCategory;
