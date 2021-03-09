import _ from "lodash";
import React, { useContext, useState } from "react";
import Card from "../common/card";
import ItemNav from "./itemNav";
import fakeData from "../http/fakeData";
import sortByColumn from "./../unit/sortLogic";
import CartContext from "./../context/cartContext";
import ItemContext from "./../context/itemDataContext";
import getUser from "../unit/userLogic";

const ItemLists = () => {
  const cartContext = useContext(CartContext);
  const itemContext = useContext(ItemContext);

  const {
    device,
    data: realData,
    query,
    queryData,
    currentSelect,
    onCurrentSelect,
    sort,
    onSort,
    currentType,
    onCurrentType,
  } = itemContext;

  const queriedData = query ? queryData : realData;

  //选择类型
  const itemSelect =
    currentType === "all"
      ? queriedData
      : queriedData.filter((item) => item.type === currentType);

  //排序
  const sorted = sort
    ? _.reverse(_.sortBy(itemSelect, currentSelect)) //从高到低
    : _.sortBy(itemSelect, currentSelect); //从低到高

  const column = device === "mobile" ? 2 : 5;
  //分列
  const dataToMap = sortByColumn(sorted, column);

  //是否有后端
  const backend = true;
  //无后端获取本地用户
  const user = getUser(backend);

  return (
    <div className="hot-item mt-2">
      <ItemNav
        currentSelect={currentSelect}
        sort={sort}
        currentType={currentType}
        onSelect={(selected) => onCurrentSelect(selected)}
        onSort={(sortChange) => onSort(sortChange)}
        onTypeChange={(type) => onCurrentType(type)}
      />
      <div className="item d-flex justify-content-center">
        {dataToMap.map((itmes) => (
          <div key={_.uniqueId()} className="d-flex flex-column w-100">
            {itmes.map((item) => (
              <Card
                user={user}
                cartContext={cartContext}
                key={item._id}
                img={item.img}
                product={item}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemLists;
