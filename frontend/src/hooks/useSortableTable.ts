import { useState } from "react";

type SortOrder = "asc" | "desc";

interface SortableTableProps<T> {
  data: T[];
  initialSortKey: keyof T;
  initialSortOrder: SortOrder;
}

const useSortableTable = <T>({
  data,
  initialSortKey,
  initialSortOrder,
}: SortableTableProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T>(initialSortKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);

  if (!data || data.length === 0) {
    return { sortedData: [], sortKey, sortOrder, toggleSort: () => {} };
  }
  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  const toggleSort = (key: keyof T) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  return { sortedData, sortKey, sortOrder, toggleSort };
};

export default useSortableTable;
