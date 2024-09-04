import React, { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import "./usersgrid.css";
import { ColDef } from "ag-grid-community";

const CountryFormatter = (props: CustomCellRendererProps) => {
  return (
    <span>
      <i className={`fi fi-${props.value.flag}`} style={{ margin: "5px" }}></i>{" "}
      {props.value.name}
    </span>
  );
};

export interface UserInterface {
  id: number;
  name: string;
  language: string;
  country: { name: string; flag: string };
  games: string;
}

// Mock function to simulate API response
const fetchMockUsers = (): Promise<UserInterface[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Mark Ross",
          language: "Portuguese",
          country: { name: "Portugal", flag: "pt" },
          games: "FIFA",
        },
        {
          id: 2,
          name: "Concepcion King",
          language: "Turkish",
          country: { name: "Turkey", flag: "tr" },
          games: "League of Legends",
        },
        {
          id: 3,
          name: "Vanecia Green",
          language: "Dutch",
          country: { name: "Netherlands", flag: "nl" },
          games: "Minecraft",
        },
        {
          id: 4,
          name: "Samara Anderson",
          language: "Mandarin Chinese",
          country: { name: "China", flag: "cn" },
          games: "Honor of Kings",
        },
        {
          id: 5,
          name: "Maxine Hamilton",
          language: "German",
          country: { name: "Austria", flag: "at" },
          games: "Dota 2",
        },
        {
          id: 6,
          name: "Dan Lee",
          language: "Hebrew",
          country: { name: "Israel", flag: "il" },
          games: "Overwatch",
        },
        {
          id: 7,
          name: "Paul Long",
          language: "Portuguese",
          country: { name: "Brazil", flag: "br" },
          games: "Free Fire",
        },
        {
          id: 8,
          name: "Madonna Snyder",
          language: "Spanish",
          country: { name: "Spain", flag: "es" },
          games: "Clash Royale",
        },
        {
          id: 9,
          name: "Oriole Perkins",
          language: "Japanese",
          country: { name: "Japan", flag: "jp" },
          games: "Pokémon",
        },
        {
          id: 10,
          name: "Ernest Jordan",
          language: "German",
          country: { name: "Germany", flag: "de" },
          games: "Counter-Strike: Global Offensive",
        },
        {
          id: 11,
          name: "Ernest Jordan",
          language: "German",
          country: { name: "Germany", flag: "de" },
          games: "Counter-Strike: Global Offensive",
        },
        {
          id: 12,
          name: "Ernest Jordan",
          language: "German",
          country: { name: "Germany", flag: "de" },
          games: "Counter-Strike: Global Offensive",
        },
        {
          id: 13,
          name: "Ernest Jordan",
          language: "German",
          country: { name: "Germany", flag: "de" },
          games: "Counter-Strike: Global Offensive",
        },
        {
          id: 14,
          name: "Ernest Jordan",
          language: "German",
          country: { name: "Germany", flag: "de" },
          games: "Counter-Strike: Global Offensive",
        },
        {
          id: 15,
          name: "Ernest Jordan",
          language: "German",
          country: { name: "Germany", flag: "de" },
          games: "Counter-Strike: Global Offensive",
        },
      ]);
    }, 1000); // Simulate network delay
  });
};

const UsersGrid: React.FC = () => {
  const [rowData, setRowData] = useState<UserInterface[]>([]);
  const [colDefs] = useState<ColDef<UserInterface>[]>([
    { field: "name", filter: true },
    {
      field: "country",
      cellRenderer: CountryFormatter,
      cellDataType: false,
      comparator: (a, b) => (a.name < b.name ? -1 : 1),
      filter: true,
      filterParams: {
        filterOptions: ["contains"],
        textMatcher: (props: any) => {
          return props.data.country.name
            .toLowerCase()
            .includes(props.filterText);
        },
      },
    },
    { field: "language", filter: true },
    { field: "games", filter: true },
  ]);
  const defaultColDef = {
    flex: 1,
  };

  useEffect(() => {
    // Use the mock function instead of fetching from API
    fetchMockUsers().then((data) => setRowData(data));
  }, []);

  return (
    <div
      className='ag-theme-alpine-dark'
      style={{ height: "100%", width: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default UsersGrid;