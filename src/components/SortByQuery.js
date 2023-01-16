import { CheckBox, Select } from "grommet";
import { useState } from "react";

function SortByQuery({ setSearchParams, searchParams }) {
  const [orderToggle, setOrderToggle] = useState(false);
  const [value, setValue] = useState("Date");

  const handleQueryChange = (option) => {
    setValue(option);
    const values = {
      Date: "created_at",
      "Comment count": "comment_count",
      Votes: "votes",
      Author: "author",
      Title: "title",
    };

    const selected_query = values[option];
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
      <p className="SortByQuery_dropdown">Sort by:</p>
      <Select
        options={["Date", "Comment count", "Votes", "Author", "Title"]}
        value={value}
        onChange={({ option }) => handleQueryChange(option)}
      />
      <CheckBox
        label={orderToggle ? "ascending" : "descending"}
        onChange={handleOrderChange}
        toggle
      />
    </div>
  );
}

export default SortByQuery;
