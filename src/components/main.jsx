import React from "react";
import Search from "./../common/search";
import BigScreen from "./bigScreen";
import ItemLists from "./itemsLists";

const Main = () => {
  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-center w-100">
        <BigScreen />
        <Search />
        <ItemLists />
      </div>
    </React.Fragment>
  );
};

export default Main;
