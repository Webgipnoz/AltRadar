import Table from "../../components/Table";

import "./HomePage.css";

interface Project {
  id: number;
  name: string;
  points: number;
  amount: number;
  price: string;
  time: string;
}

interface Column {
  key: keyof Project;
  label: string;
}

const columns: Column[] = [
  { key: "name", label: "Project" },
  { key: "points", label: "Points" },
  { key: "amount", label: "Amount" },
  { key: "price", label: "Price" },
  { key: "time", label: "Time" },
];

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
      <Table
        tableHeader="Today's Projects"
        columns={columns}
        dataTable={testData}
      />

      <Table
        tableHeader="Future Projects"
        columns={columns}
        dataTable={futureData}
      />
    </div>
  );
};

export default HomePage;
