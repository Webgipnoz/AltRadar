import { useState } from "react";

import FilterPanel from "../../components/FilterPanel";
import FavoriteItem from "../../components/FavoriteItem";

import useSortableTable from "../../hooks/useSortableTable";

import { Column } from "../../types/tables";
import { Project } from "../../types/project";

import { projectsData } from "../../data/projectsData";

const columns: Column<Project>[] = [
  { key: "favorite", label: "☆" },
  { key: "name", label: "Projects" },
  { key: "points", label: "Points" },
  { key: "amount", label: "Amount" },
  { key: "mc", label: "MC" },
  { key: "date", label: "Date" },
];

const AirDropsPage = () => {
  const [data, setData] = useState<Project[]>(projectsData);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    isSpot: false,
    isFutures: false,
    isTge: false,
  });

  const toggleImportant = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const { sortedData, sortKey, sortOrder, toggleSort } =
    useSortableTable<Project>({
      data: data,
      initialSortKey: "name",
      initialSortOrder: "asc",
    });

  const filteredData = sortedData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilters =
      (!filters.isSpot && !filters.isFutures && !filters.isTge) ||
      (filters.isSpot && item.isSpot) ||
      (filters.isFutures && item.isFutures) ||
      (filters.isTge && item.isTge);

    return matchesSearch && matchesFilters;
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

                    {col.key === "name" && (
                      <span
                        onClick={() => setShowFilter((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        🔍
                      </span>
                    )}
                  </div>

                  {col.key === "name" && showFilter && (
                    <FilterPanel
                      filters={filters}
                      searchQuery={searchQuery}
                      onChangeFilters={setFilters}
                      onChangeSearch={setSearchQuery}
                      onClose={() => setShowFilter(false)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
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

export default AirDropsPage;
