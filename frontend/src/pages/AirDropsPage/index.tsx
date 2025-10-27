import { useState } from "react";
import Table from "../../components/Table";

import { useFilteredData } from "../../hooks/useFilteredData";
import { useFavorite } from "../../hooks/useFavorite";

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
  const { data, toggleFavorite } = useFavorite(projectsData);
  const [isOpen, setIsOpen] = useState(true);

  const { filteredData, filters, setFilters, searchQuery, setSearchQuery } =
    useFilteredData<Project>(data, {
      isSpot: false,
      isFutures: false,
      isTge: false,
    });

  const onChangeFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const onChangeSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  const onClose = () => setIsOpen(false);

  return (
    <div className="homepage">
      <Table
        tableHeader="Airdrop Projects"
        columns={columns}
        dataTable={filteredData}
        withFilters={true}
        filtersLogic={{
          filters,
          searchQuery,
          onChangeFilters,
          onChangeSearch,
          onClose,
          isOpen,
        }}
        withFavorite={true}
        favoriteLogic={{ data, toggleFavorite }}
      />
    </div>
  );
};

export default AirDropsPage;
