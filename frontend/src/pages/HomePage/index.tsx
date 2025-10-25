import Table from "../../components/Table";

import { Column } from "../../types/tables";
import { Project } from "../../types/project";

import { projectsData } from "../../data/projectsData";

import "./HomePage.css";

const columns: Column<Project>[] = [
  { key: "name", label: "Project" },
  { key: "points", label: "Points" },
  { key: "amount", label: "Amount" },
  { key: "price", label: "Price" },
  { key: "time", label: "Time" },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <Table
        tableHeader="Today's Projects"
        columns={columns}
        dataTable={projectsData}
      />

      <Table
        tableHeader="Future Projects"
        columns={columns}
        dataTable={projectsData}
      />
    </div>
  );
};

export default HomePage;
