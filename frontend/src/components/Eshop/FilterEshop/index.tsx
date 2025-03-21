import { useState, useEffect } from "react";
import { FilterEshopProps } from "./types";
import "./style.scss";
import DialogBox from "../DialogBox";

function FilterEshop({
  onFilterChange,
  data,
  type,
  filtroTitle,
}: FilterEshopProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const values = Array.from(new Set(data.map((item) =>  item?.eshop[type])));
      setFilterList(values);
    }
  }, [data, type]);

  const handleFilterSelect = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((v) => v !== value)
      : [...selectedFilters, value];

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div style={{ margin: "1rem" }}>
      {filtroTitle}
      {"  > "}
      <button
        className="filter_eshop"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        {type}
        {isDialogOpen && (
          <DialogBox
            filterList={filterList}
            selectedFilters={selectedFilters}
            handleFilterSelect={handleFilterSelect}
          />
        )}
      </button>
    </div>
  );
}

export default FilterEshop;
