import React, { useState } from "react";
import Table from "../../components/Table";

interface StabilityProject {
  id: number;
  favorite: boolean;
  project: string;
  stabilityValue: string;
  spreadBps: number;
  Xdays: number;
}

interface Column {
  key: keyof StabilityProject;
  label: string;
}

const StabilityProjects: StabilityProject[] = [
  {
    id: 1,
    project: "AlphaAir",
    stabilityValue: "Stable",
    spreadBps: 15,
    Xdays: 120,
    favorite: true,
  },
  {
    id: 2,
    project: "BetaDrop",
    stabilityValue: "Moderate",
    spreadBps: 30,
    Xdays: 60,
    favorite: false,
  },
  {
    id: 3,
    project: "GammaAir",
    stabilityValue: "Unstable",
    spreadBps: 15,
    Xdays: 120,
    favorite: true,
  },
];

const columns: Column[] = [
  { key: "favorite", label: "☆" },
  { key: "project", label: "Project" },
  { key: "stabilityValue", label: "Stability" },
  { key: "spreadBps", label: "Spread BPS" },
  { key: "Xdays", label: "4X Days" },
];

const StabilityPage = () => {
  return (
    <div className="stabilityPage">
      <Table
        tableHeader="Stability Projects"
        columns={columns}
        dataTable={StabilityProjects}
      />
    </div>
  );
};

export default StabilityPage;
