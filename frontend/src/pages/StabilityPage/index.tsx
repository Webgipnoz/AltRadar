import React, { useState } from "react";
import useSortableTable from "../../hooks/useSortableTable";

interface StabilityProject {
  id: number;
  important: boolean;
  project: string;
  stabilityValue: string;
  spreadBps: number;
  Xdays: number;
}

interface Column {
  key: keyof StabilityProject;
  label: string;
}

const StabilityProject: StabilityProject[] = [
  {
    id: 1,
    project: "AlphaAir",
    stabilityValue: "Stable",
    spreadBps: 15,
    Xdays: 120,
    important: true,
  },
  {
    id: 2,
    project: "BetaDrop",
    stabilityValue: "Moderate",
    spreadBps: 30,
    Xdays: 60,
    important: false,
  },
  {
    id: 3,
    project: "GammaAir",
    stabilityValue: "Unstable",
    spreadBps: 15,
    Xdays: 120,
    important: true,
  },
];

const columns: Column[] = [
  { key: "important", label: "☆" },
  { key: "project", label: "Project" },
  { key: "stabilityValue", label: "Stability" },
  { key: "spreadBps", label: "Spread BPS" },
  { key: "Xdays", label: "4X Days" },
];

const StabilityPage = () => {
  const [data, setData] = useState<StabilityProject[]>(StabilityProject);

  const { sortedData, sortKey, sortOrder, toggleSort } =
    useSortableTable<StabilityProject>({
      data: data,
      initialSortKey: "project",
      initialSortOrder: "asc",
    });

  const toggleImportant = (id: number) => {
    setData((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, important: !item.important } : item
      );
    });
  };

  return (
    <div className="stabilityPage">
      <div className="projects-table-container">
        <h2>Stability Page</h2>
        <table className="projects-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  <div>
                    <span
                      onClick={() => toggleSort(col.key)}
                      style={{ cursor: "pointer" }}
                    >
                      {col.label}
                      {sortKey === col.key &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "important" ? (
                      <span
                        onClick={() => toggleImportant(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.important ? "⭐" : "☆"}
                      </span>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StabilityPage;
