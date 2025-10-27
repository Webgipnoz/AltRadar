import { useState, useMemo } from "react";

type Filters<T> = Partial<Record<keyof T, boolean>>;

export const useFilteredData = <
  T extends Record<string, any> & { name?: string }
>(
  initialData: T[],
  initialFilters: Filters<T> = {}
) => {
  const [filters, setFilters] = useState<Filters<T>>(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchesSearch = item.name
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

      const activeFilters = Object.entries(filters).filter(
        ([, isActive]) => isActive
      );

      if (activeFilters.length === 0) return matchesSearch;

      const matchesFilters = activeFilters.some(([key]) => item[key]);

      return matchesSearch && matchesFilters;
    });
  }, [initialData, filters, searchQuery]);

  return {
    filteredData,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
  };
};
