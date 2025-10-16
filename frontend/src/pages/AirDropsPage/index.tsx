import { useState } from "react";
import useSortableTable from "../../hooks/useSortableTable";

import "./AirDropsPage.css";

interface AirdropProject {
  id: number;
  project: string;
  points: number;
  amount: string;
  mc: string;
  date: string;
  important: boolean;
}

interface Column {
  key: keyof AirdropProject;
  label: string;
}

const columns: Column[] = [
  { key: "important", label: "☆" },
  { key: "project", label: "Project" },
  { key: "points", label: "Points" },
  { key: "amount", label: "Amount" },
  { key: "mc", label: "MC" },
  { key: "date", label: "Date" },
];

const airdropData: AirdropProject[] = [
  {
    id: 1,
    project: "AlphaAir",
    points: 120,
    amount: "5000",
    mc: "50k",
    date: "2025-10-01",
    important: false,
  },
  {
    id: 2,
    project: "BetaDrop",
    points: 95,
    amount: "3000",
    mc: "30k",
    date: "2025-10-03",
    important: true,
  },
  {
    id: 3,
    project: "GammaAir",
    points: 70,
    amount: "2000",
    mc: "20k",
    date: "2025-10-05",
    important: false,
  },
];

const AirDropsPage = () => {
  const [data, setData] = useState<AirdropProject[]>(airdropData);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleImportant = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, important: !item.important } : item
      )
    );
  };
  const { sortedData, sortKey, sortOrder, toggleSort } =
    useSortableTable<AirdropProject>({
      data: data,
      initialSortKey: "project",
      initialSortOrder: "asc",
    });

  return (
    <div className="homepage">
      <div className="projects-table-container">
        <h2>Airdrops</h2>
        <table className="projects-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={{ position: "relative" }}>
                  <div>
                    <span
                      onClick={() => toggleSort(col.key)}
                      style={{ cursor: "pointer" }}
                    >
                      {col.label}
                      {sortKey === col.key &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}
                    </span>

                    {col.key === "project" && (
                      <span
                        onClick={() => setShowFilter((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        🔍
                      </span>
                    )}
                  </div>

                  {col.key === "project" && showFilter && (
                    <div className="filter-panel">
                      <h4>Filter</h4>
                      <label>
                        <input type="checkbox" /> Active
                      </label>
                      <label>
                        <input type="checkbox" /> Completed
                      </label>
                      <label>
                        <input type="checkbox" /> Archived
                      </label>
                      <input
                        type="text"
                        placeholder="Search by name..."
                        className="filter-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id}>
                <td
                  onClick={() => toggleImportant(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.important ? "⭐" : "☆"}
                </td>
                <td>{item.project}</td>
                <td>{item.points}</td>
                <td>{item.amount}</td>
                <td>{item.mc}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AirDropsPage;
