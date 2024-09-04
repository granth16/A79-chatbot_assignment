import React, { useState, useEffect, useCallback, useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import "./usersgrid.css";
import { ColDef, FilterModel } from "ag-grid-community";

const CountryFormatter = (props: any) => {
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
interface MessageContextPayload {
    'tabular_data'?: string;
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
  const defaultColDef = { flex: 1, filter: true };
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const gridApiRef = useRef<any>(null);

  useEffect(() => {
    fetchMockUsers().then((data) => setRowData(data));
  }, []);

  const onFilterChanged = useCallback((params: { api: any }) => {
    const filterModel: FilterModel = params.api.getFilterModel();
    const filtersArray = Object.keys(filterModel).map((field) => {
      // Display only "Filter by [Field Name]"
      const formattedField = field.charAt(0).toUpperCase() + field.slice(1);
      return `Filter by ${formattedField}`;
    });
    setAppliedFilters(filtersArray);
  }, []);

  // Function to remove a specific filter by field
  const removeFilter = (field: string) => {
    if (gridApiRef.current) {
      const api = gridApiRef.current.api;
      api.getFilterInstance(field, (filterInstance: any) => {
        filterInstance.setModel(null); // Clear the filter
        api.onFilterChanged(); // Refresh grid filters
      });
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ marginBottom: "10px" }}>
        {/* Display applied filters as chips */}
        {appliedFilters.map((filter, index) => {
          const field = filter.replace("Filter by ", "").toLowerCase();
          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                backgroundColor: "#16161e",
                padding: "5px 10px",
                borderRadius: "15px",
                marginRight: "5px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => removeFilter(field)}
            >
              {filter} <span style={{ marginLeft: "5px" }}>✕</span>
            </span>
          );
        })}
      </div>
      <div
        className='ag-theme-alpine-dark'
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          ref={gridApiRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onFilterChanged={onFilterChanged}
        />
      </div>
    </div>
  );
};

export default UsersGrid;