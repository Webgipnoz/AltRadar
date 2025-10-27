import { useEffect, useRef } from "react";
import "./FilterPanel.css";

interface FilterPanelProps<T extends Record<string, boolean>> {
  filters: T;
  searchQuery: string;
  onChangeFilters: (newFilters: T) => void;
  onChangeSearch: (newQuery: string) => void;
  onClose: () => void;
}

function FilterPanel<T extends Record<string, boolean>>({
  filters,
  searchQuery,
  onChangeFilters,
  onChangeSearch,
  onClose,
}: FilterPanelProps<T>) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCheckboxChange = (key: keyof T) => {
    onChangeFilters({ ...filters, [key]: !filters[key] });
  };

  const formatLabel = (key: string): string => {
    return key
      .replace(/^is/, "")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <div ref={panelRef} className="filter-panel">
      <h4>Filter</h4>

      <input
        type="text"
        placeholder="Search by project..."
        value={searchQuery}
        onChange={(e) => onChangeSearch(e.target.value)}
      />

      <div className="checkbox-group">
        {Object.entries(filters).map(([key, value]) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleCheckboxChange(key as keyof T)}
            />
            {formatLabel(key)}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;
