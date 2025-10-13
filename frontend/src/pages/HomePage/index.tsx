import useSortableTable from "../../hooks/useSortableTable";

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
  const {
    sortedData: sortedTodayData,
    sortKey: sortKeyToday,
    sortOrder: sortOrderToday,
    toggleSort: toggleSortToday,
  } = useSortableTable<Project>({
    data: testData,
    initialSortKey: "name",
    initialSortOrder: "asc",
  });

  const {
    sortedData: sortedFutureData,
    sortKey: sortKeyFuture,
    sortOrder: sortOrderFuture,
    toggleSort: toggleSortFuture,
  } = useSortableTable<Project>({
    data: futureData,
    initialSortKey: "name",
    initialSortOrder: "asc",
  });

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
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => toggleSortToday(column.key)}
                  style={{ cursor: "pointer" }}
                >
                  {column.label}
                  {sortKeyToday === column.key &&
                    (sortOrderToday === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedTodayData.map((item) => (
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
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => toggleSortFuture(column.key)}
                  style={{ cursor: "pointer" }}
                >
                  {column.label}
                  {sortKeyFuture === column.key &&
                    (sortOrderFuture === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFutureData.map((item) => (
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
