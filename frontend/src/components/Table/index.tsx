import React from "react";
import FavoriteItem from "../FavoriteItem";
import useSortableTable from "../../hooks/useSortableTable";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface TableProps<T> {
  tableHeader: string;
  columns: Column<T>[];
  dataTable: T[];
}

const Table = <T extends { id: number; favorite?: boolean }>({
  tableHeader,
  columns,
  dataTable,
}: TableProps<T>) => {
  const [data, setData] = React.useState<T[]>(dataTable);

  const { sortedData, sortKey, sortOrder, toggleSort } = useSortableTable<T>({
    data,
    initialSortKey: columns[0].key,
    initialSortOrder: "desc",
  });

  const toggleImportant = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

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
                      onToggleFavorite={toggleImportant}
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
