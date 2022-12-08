import { CheckBox } from "grommet";
import { useState } from "react";

function SortByQuery({ setSearchParams, searchParams }) {
  const [orderToggle, setOrderToggle] = useState(false);

  const handleQueryChange = (e) => {
    e.preventDefault();
    const selected_query = e.target.value;
    searchParams.set("sort_by", selected_query);
    setSearchParams(searchParams);
  };

  const handleOrderChange = (e) => {
    let checked = e.target.checked;
    setOrderToggle(checked);
    let selected_order = checked ? "ASC" : "DESC";
    searchParams.set("order", selected_order);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <label className="SortByQuery_dropdown">
        Sort by:
        <select className="SortByQuery_queries" onChange={handleQueryChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
          <option value="author">Author</option>
          <option value="title">Title</option>
        </select>
      </label>
      <CheckBox
        label={orderToggle ? "ascending" : "descending"}
        onChange={handleOrderChange}
        toggle
      />
    </div>
  );
}

export default SortByQuery;
