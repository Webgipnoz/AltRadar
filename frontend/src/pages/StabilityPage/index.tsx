import Table from "../../components/Table";
import { useFavorite } from "../../hooks/useFavorite";

import { Column } from "../../types/tables";
import { Project } from "../../types/project";

import { projectsData } from "../../data/projectsData";

const columns: Column<Project>[] = [
  { key: "favorite", label: "☆" },
  { key: "name", label: "Project" },
  { key: "stabilityValue", label: "Stability" },
  { key: "spreadBps", label: "Spread BPS" },
  { key: "Xdays", label: "4X Days" },
];

const StabilityPage = () => {
  const { data, toggleFavorite } = useFavorite(projectsData);

  return (
    <div className="stabilityPage">
      <Table
        tableHeader="Stability Projects"
        columns={columns}
        dataTable={data}
        withFavorite={true}
        favoriteLogic={{ data, toggleFavorite }}
      />
    </div>
  );
};

export default StabilityPage;
