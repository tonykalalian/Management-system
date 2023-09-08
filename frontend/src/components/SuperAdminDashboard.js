import React from "react";
import Sidebar from "./Sidebar";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
`;

const DashboardContent = styled.div`
  padding: 20px;
  flex: 1;
`;

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  font-size: 14px;
  margin-top: 0;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
`;

const SuperAdminDashboard = () => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "SuperAdmin") {
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
        name: "Programming",
        data: [12, 19, 3, 5, 2],
      },
    ],
  };

  const pieChartData = {
    options: {
      labels: ["Java", "C#", "C++", "Javascript", "Python"],
    },
    series: [30, 25, 20, 15, 10],
  };

  return (
    <DashboardContainer>
      <Sidebar userRole={userRole} />
      <DashboardContent>
        <h1>Welcome to the SuperAdmin Dashboard</h1>
        <ChartContainer>
          <div className="row">
            <div className="col-md-6">
              <Card>
                <CardTitle>Programming Chart</CardTitle>
                <ApexCharts
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  height={300}
                />
              </Card>
            </div>
            <div className="col-md-6">
              <Card>
                <CardTitle>Programming Language Chart</CardTitle>
                <ApexCharts
                  options={pieChartData.options}
                  series={pieChartData.series}
                  type="pie"
                  height={300}
                />
              </Card>
            </div>
          </div>
        </ChartContainer>
        <div className="row">
          <div className="col-md-4">
            <Card>
              <CardTitle>Python Developer</CardTitle>
              <CardContent>Taha Al Assaad</CardContent>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <CardTitle>Full Stack Engineer</CardTitle>
              <CardContent>Tony Kalalian</CardContent>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <CardTitle>Database Administrator</CardTitle>
              <CardContent>Mohamad El Hassan</CardContent>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardTitle>Additional Information</CardTitle>
              <CardContent>
                This is the SuperAdminDashboard for my TMT company
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default SuperAdminDashboard;
