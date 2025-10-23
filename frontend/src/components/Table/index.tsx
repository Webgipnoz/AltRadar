import React, { useState } from "react";
import FavoriteItem from "../FavoriteItem";
import FilterPanel from "../../components/FilterPanel";

import useSortableTable from "../../hooks/useSortableTable";
import { useFavorite } from "../../hooks/useFavorite";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface TableProps<T> {
  tableHeader: string;
  columns: Column<T>[];
  dataTable: T[];
  withFilters?: boolean;
  withFavorite?: boolean;
}

const Table = <
  T extends {
    id: number;
    favorite?: boolean;
  }
>({
  tableHeader,
  columns,
  dataTable,
}: TableProps<T>) => {
  const { data, toggleFavorite } = useFavorite<T>(dataTable);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { sortedData, sortKey, sortOrder, toggleSort } = useSortableTable<T>({
    data,
    initialSortKey: columns[0].key,
    initialSortOrder: "desc",
  });

  // const [filters, setFilters] = useState({
  //   isSpot: false,
  //   isFutures: false,
  //   isTge: false,
  // });

  // const filteredData = sortedData.filter((item) => {
  //   const matchesSearch = item.project
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());

  //   const matchesFilters =
  //     (!filters.isSpot && !filters.isFutures && !filters.isTge) ||
  //     (filters.isSpot && item.isSpot) ||
  //     (filters.isFutures && item.isFutures) ||
  //     (filters.isTge && item.isTge);

  //   return matchesSearch && matchesFilters;
  // });
  return (
    <div className="projects-table-container">
      <h2>{tableHeader}</h2>
      <table className="projects-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => toggleSort(col.key)}
                style={{ cursor: "pointer" }}
              >
                {col.label}
                {sortKey === col.key && (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.key === "favorite" ? (
                    <FavoriteItem
                      id={item.id}
                      isFavorite={!!item.favorite}
                      onToggleFavorite={toggleFavorite}
                    />
                  ) : (
                    String(item[col.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
