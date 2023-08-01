import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import ApexCharts from "react-apexcharts";

const DashboardContainer = styled.div`
  display: flex;
`;

const DashboardContent = styled.div`
  padding: 20px;
  flex: 1;
`;

const CustomCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 15px;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const CardContent = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const AdminDashboard = () => {
  const userRole = localStorage.getItem("userRole");

  // Access control logic for AdminDashboard
  if (userRole !== "Admin") {
    return <div>You don't have access to this page.</div>;
  }

  const chartData = {
    options: {
      xaxis: {
        categories: ["U.S", "Europe", "Middle East", "Africa", "Asia"],
      },
    },
    series: [
      {
        name: "Obesity",
        data: [12, 19, 3, 5, 2],
      },
    ],
  };

  const pieChartData = {
    options: {
      labels: ["Carbs", "Protein", "Fibers", "Vitamins", "Fats"],
    },
    series: [30, 25, 20, 15, 10],
  };

  return (
    <DashboardContainer>
      <Sidebar userRole={userRole} />
      <DashboardContent>
        <Container fluid>
          <h1 className="mb-4">Welcome to the Admin Dashboard</h1>
          <Row>
            <Col md={6}>
              <CustomCard>
                <CardTitle>Admin Chart 1</CardTitle>
                <ApexCharts
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  height={300}
                />
              </CustomCard>
            </Col>
            <Col md={6}>
              <CustomCard>
                <CardTitle>Admin Chart 2</CardTitle>
                <ApexCharts
                  options={pieChartData.options}
                  series={pieChartData.series}
                  type="pie"
                  height={300}
                />
              </CustomCard>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomCard>
                <CardTitle>Our Nutritionist</CardTitle>
                <CardContent>Lydia Horkos</CardContent>
              </CustomCard>
            </Col>
            <Col md={6}>
              <CustomCard>
                <CardTitle>Our Trainer</CardTitle>
                <CardContent>Tony Kalalian</CardContent>
              </CustomCard>
            </Col>
          </Row>
        </Container>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
