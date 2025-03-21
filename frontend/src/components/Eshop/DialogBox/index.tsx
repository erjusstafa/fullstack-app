import "./style.scss";

function DialogBox({
  filterList,
  selectedFilters,
  handleFilterSelect,
}: {
  filterList: string[];
  selectedFilters: string[];
  handleFilterSelect: (marka: string) => void;
}) {
  return (
    <div className="filter_eshop_dialog">
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filterList.map((marka) => (
          <li key={marka} style={{ margin: "1rem", textAlign: "left" }}>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes(marka)}
                onChange={() => handleFilterSelect(marka)}
              />
              {marka}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DialogBox;
