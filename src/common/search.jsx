import React, { useContext, useState } from "react";
import NavBar from "../components/navBar";
import ItemContext from "./../context/itemDataContext";

const Search = () => {
  const [currentTyped, setCurrentTyped] = useState("");
  const itemContext = useContext(ItemContext);
  const { device, query, onQuery } = itemContext;

  const handleQueryChange = (e) => {
    const currentTyped = e.currentTarget.value;
    setCurrentTyped(currentTyped);
  };

  const handleSearch = () => {
    onQuery(currentTyped);
  };
  return (
    <div className="input-group sticky-top w-100 bg-light">
      <div
        className="d-flex justify-content-start border border-primary rounded-pill w-100 bg-white m-1"
        style={{ height: "2em" }}
      >
        <i className="fa fa-search fa-1x text-dark m-1 mt-2"></i>
        <input
          className="flex-fill"
          type="text"
          placeholder="搜索..."
          aria-describedby="addon-wrapping"
          style={{ border: "none", outline: "none" }}
          onChange={handleQueryChange}
        />
        <button
          onClick={handleSearch}
          type="button"
          className="btn btn-primary  rounded-pill"
        >
          搜索
        </button>
      </div>
    </div>
  );
};

export default Search;
