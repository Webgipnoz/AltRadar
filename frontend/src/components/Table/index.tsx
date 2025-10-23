import React from "react";
import FavoriteItem from "../FavoriteItem";
import FilterPanel from "../../components/FilterPanel";

import useSortableTable from "../../hooks/useSortableTable";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface BaseRow {
  id: number;
  favorite?: boolean;
}

interface TableProps<T extends BaseRow> {
  tableHeader: string;
  columns: Column<T>[];
  dataTable: T[];
  withFilters?: boolean;
  withFavorite?: boolean;
  favoriteLogic?: {
    data: any[];
    toggleFavorite: (id: number) => void;
  };
}

const Table = <T extends BaseRow>({
  tableHeader,
  columns,
  dataTable,
  withFavorite,
  withFilters,
  favoriteLogic,
}: TableProps<T>) => {
  const { sortedData, sortKey, sortOrder, toggleSort } = useSortableTable<T>({
    data: withFavorite && favoriteLogic ? favoriteLogic.data : dataTable,
    initialSortKey: columns[0].key,
    initialSortOrder: "desc",
  });

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
                  {withFavorite && col.key === "favorite" ? (
                    <FavoriteItem
                      id={item.id}
                      isFavorite={!!item.favorite}
                      onToggleFavorite={favoriteLogic?.toggleFavorite!}
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
