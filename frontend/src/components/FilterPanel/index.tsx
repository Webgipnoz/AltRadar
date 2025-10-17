import { useEffect, useRef } from "react";
import "./FilterPanel.css";

interface FilterPanelProps {
  filters: { isSpot: boolean; isFutures: boolean; isTge: boolean };
  searchQuery: string;
  onChangeFilters: (newFilters: any) => void;
  onChangeSearch: (newQuery: string) => void;
  onClose: () => void;
}

const FilterPanel = (props: FilterPanelProps) => {
  const { filters, searchQuery, onChangeFilters, onChangeSearch, onClose } =
    props;
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

  const handleCheckboxChange = (key: keyof typeof filters) => {
    onChangeFilters({ ...filters, [key]: !filters[key] });
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
        <label>
          <input
            type="checkbox"
            checked={filters.isSpot}
            onChange={() => handleCheckboxChange("isSpot")}
          />
          Spot
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.isFutures}
            onChange={() => handleCheckboxChange("isFutures")}
          />
          Futures
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.isTge}
            onChange={() => handleCheckboxChange("isTge")}
          />
          TGE
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
