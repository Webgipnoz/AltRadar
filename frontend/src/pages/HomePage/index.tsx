import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

interface Project {
  id: number;
  name: string;
  points: number;
  amount: number;
  price: string;
  time: string;
}

const testData: Project[] = [
  {
    id: 1,
    name: "AlphaCoin",
    points: 120,
    amount: 500,
    price: "0.05 USDT",
    time: "14:00",
  },
  {
    id: 2,
    name: "BetaToken",
    points: 95,
    amount: 500,
    price: "0.05 USDT",
    time: "14:00",
  },
  {
    id: 3,
    name: "Gamma",
    points: 70,
    amount: 500,
    price: "0.02 USDT",
    time: "09:15",
  },
];

const futureData: Project[] = [
  {
    id: 1,
    name: "AlphaCoin",
    points: 120,
    amount: 500,
    price: "0.05 USDT",
    time: "14:00",
  },
  {
    id: 2,
    name: "BetaToken",
    points: 95,
    amount: 500,
    price: "0.05 USDT",
    time: "14:00",
  },
  {
    id: 3,
    name: "Gamma",
    points: 70,
    amount: 500,
    price: "0.02 USDT",
    time: "09:15",
  },
];

const HomePage = () => {
  return (
    <div
      className="homepage"
      style={{ minHeight: "calc(100vh - 100px)", padding: "20px" }}
    >
      <div className="projects-table-container">
        <h2>Today's Airdrops</h2>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Points</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.points}</td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Future Projects</h2>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Points</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {futureData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.points}</td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
