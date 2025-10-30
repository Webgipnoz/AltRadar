import { useState } from "react";
import FavoriteItem from "../../components/FavoriteItem";
import FilterPanel from "../../components/FilterPanel";

import useSortableTable from "../../hooks/useSortableTable";

import { Column, BaseRow } from "../../types/tables";

interface FiltersLogic<T extends Record<string, boolean>> {
  filters: T;
  searchQuery: string;
  onChangeFilters: (newFilters: T) => void;
  onChangeSearch: (newQuery: string) => void;
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
  filtersLogic?: FiltersLogic<any>;
}

const Table = <T extends BaseRow>({
  tableHeader,
  columns,
  dataTable,
  withFavorite,
  withFilters,
  favoriteLogic,
  filtersLogic,
}: TableProps<T>) => {
  const { sortedData, sortKey, sortOrder, toggleSort } = useSortableTable<T>({
    data: dataTable,
    initialSortKey: columns[0].key,
    initialSortOrder: "desc",
  });
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="projects-table-container">
      <h2>{tableHeader}</h2>
      <table className="projects-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={{ cursor: "pointer" }}>
                <>
                  <span onClick={() => toggleSort(col.key)}>
                    {col.label}
                    {sortKey === col.key && (sortOrder === "asc" ? " ▲" : " ▼")}
                  </span>

                  {withFilters && col.key === "name" && (
                    <span
                      onClick={() => {
                        setShowFilter((prev) => !prev);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      🔍
                    </span>
                  )}
                </>
                {withFilters &&
                  showFilter &&
                  col.key === "name" &&
                  filtersLogic && (
                    <div style={{ position: "absolute" }}>
                      <FilterPanel
                        filters={filtersLogic.filters}
                        searchQuery={filtersLogic.searchQuery}
                        onChangeFilters={filtersLogic.onChangeFilters}
                        onChangeSearch={filtersLogic.onChangeSearch}
                        onClose={() => setShowFilter(false)}
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
