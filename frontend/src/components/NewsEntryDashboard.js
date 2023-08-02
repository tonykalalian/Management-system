import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewsEntryDashboard.css";

const NewsEntryDashboard = () => {
  const userRole = localStorage.getItem("userRole");
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const newsResponse = await axios.get("http://localhost:3000/news");
        setNewsData(newsResponse.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    }

    async function fetchCategoriesData() {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchNewsData();
    fetchCategoriesData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Container fluid className="mt-5 crazy-container">
      <Row>
        <Sidebar userRole={userRole} />
        <Col md={9}>
          <h2 className="crazy-heading">📢 Wild News Dashboard 🤪</h2>
          <Row>
            <Col md={3}>
              <h4 className="crazy-category-heading">🌈 Categories</h4>
              <ListGroup>
                {categories.map((category) => (
                  <ListGroup.Item
                    key={category._id}
                    className={`crazy-list-item ${
                      selectedCategory === category._id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    {category.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={9}>
              {newsData
                .filter(
                  (newsItem) =>
                    !selectedCategory ||
                    newsItem.category._id === selectedCategory
                )
                .map((newsItem) => (
                  <Card className="mb-4 crazy-card" key={newsItem._id}>
                    <Card.Body>
                      <Card.Title className="crazy-card-title">
                        {newsItem.title}
                      </Card.Title>
                      <Card.Text
                        className="crazy-card-text"
                        dangerouslySetInnerHTML={{
                          __html: newsItem.content,
                        }}
                      />
                      <Card.Text className="crazy-card-date">
                        <small className="text-muted">
                          {new Date(newsItem.date).toDateString()}
                        </small>
                      </Card.Text>
                      <Card.Text className="crazy-card-category">
                        🏆 Category: {newsItem.category.title}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsEntryDashboard;
