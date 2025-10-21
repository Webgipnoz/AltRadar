import React, { useState } from "react";
import useSortableTable from "../../hooks/useSortableTable";
import FavoriteItem from "../../components/FavoriteItem";

interface StabilityProject {
  id: number;
  favorite: boolean;
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
    favorite: true,
  },
  {
    id: 2,
    project: "BetaDrop",
    stabilityValue: "Moderate",
    spreadBps: 30,
    Xdays: 60,
    favorite: false,
  },
  {
    id: 3,
    project: "GammaAir",
    stabilityValue: "Unstable",
    spreadBps: 15,
    Xdays: 120,
    favorite: true,
  },
];

const columns: Column[] = [
  { key: "favorite", label: "☆" },
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
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
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
                    {col.key === "favorite" ? (
                      <FavoriteItem
                        id={item.id}
                        isFavorite={item.favorite}
                        onToggleFavorite={toggleImportant}
                      />
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
