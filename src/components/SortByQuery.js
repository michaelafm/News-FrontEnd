import { CheckBox } from "grommet";
import { useState } from "react";


function SortByQuery({ setSearchParams, searchParams }) {
  const [orderToggle, setOrderToggle] = useState(false);

  const handleQueryChange = (e) => {
    e.preventDefault();
    const selected_query = e.target.value;
    if (selected_query === "sort_by") {
      setSearchParams({});
    } else {
      function serializeSortBy(query) {
        if (!searchParams.get("order")) {
          return {
            sort_by: query,
          };
        } else {
          return {
            sort_by: query,
            order: searchParams.get("order"),
          };
        }
      }
      let sortByParams = serializeSortBy(selected_query);
      setSearchParams(sortByParams);
    }
  };

  const handleOrderChange = (e) => {
    let checked = e.target.checked;
    setOrderToggle(checked);
    let selected_order = checked ? "ASC" : "DESC";
    function serializeOrder(query) {
      if (!searchParams.get("sort_by")) {
        return {
          order: query,
        };
      } else {
        return {
          sort_by: searchParams.get("sort_by"),
          order: query,
        };
      }
    }
    let orderParams = serializeOrder(selected_order);
    setSearchParams(orderParams);
  };

  return (
    <div>
      <label className="SortByQuery_dropdown">Sort by:
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
