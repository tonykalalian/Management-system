import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    images: [],
  });

  const [newsList, setNewsList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files),
    });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      description: data,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const newNews = {
      id: new Date().getTime(),
      ...formData,
    };

    setNewsList((prevNewsList) => [...prevNewsList, newNews]);

    setFormData({
      title: "",
      description: "",
      date: "",
      category: "",
      images: [],
    });
  };

  const handleUpdate = (id) => {
    const updatedNewsList = newsList.map((news) =>
      news.id === id ? { ...news, ...formData } : news
    );

    setNewsList(updatedNewsList);

    setFormData({
      title: "",
      description: "",
      date: "",
      category: "",
      images: [],
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news entry?")) {
      const updatedNewsList = newsList.filter((news) => news.id !== id);
      setNewsList(updatedNewsList);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add News</h2>
      <form>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.description}
            onChange={handleEditorChange}
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
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Images
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreate}
        >
          Create News
        </button>
      </form>
      <div className="mt-4">
        {newsList.map((news) => (
          <div key={news.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{news.title}</h5>
              {/* Use a <div> instead of <p> for the description */}
              <div
                className="card-text"
                dangerouslySetInnerHTML={{ __html: news.description }}
              />
              <p className="card-text">Date: {news.date}</p>
              <p className="card-text">Category: {news.category}</p>
              {news.images.length > 0 && (
                <div>
                  <p>Images:</p>
                  {news.images.map((image, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                      className="img-thumbnail"
                      style={{ width: "200px", height: "auto" }}
                    />
                  ))}
                </div>
              )}
              <button
                type="button"
                className="btn btn-info me-2"
                onClick={() => handleUpdate(news.id)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(news.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNews;
