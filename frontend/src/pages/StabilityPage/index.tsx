import React from "react";

interface StabilityProject {
  id: number;
  name: string;
  stabilityValue: string;
  date: string;
  Xdays: number;
  important: boolean;
  spreadBps: number;
}

interface Column {
  key: keyof StabilityProject;
  label: string;
}

const columns: Column[] = [
  { key: "important", label: "☆" },
  { key: "name", label: "Project" },
  { key: "stabilityValue", label: "Stability" },
  { key: "date", label: "Date" },
  { key: "Xdays", label: "X Days" },
];

const StabilityPage = () => {
  return (
    <div>
      <h2>Stability Page</h2>
      <p>Welcome to the Stability Page!</p>
    </div>
  );
};

export default StabilityPage;
