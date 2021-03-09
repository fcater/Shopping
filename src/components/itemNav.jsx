import React from "react";

const ItemNav = ({ currentSelect, sort, onSelect, onSort, onTypeChange }) => {
  return (
    <div className="select">
      <ul className="nav justify-content-around bg-secondary">
        <li
          className="nav-item"
          onClick={() => {
            onSelect("name");
            onSort(!sort);
          }}
        >
          <p
            className={
              currentSelect === "name" ? "nav-link text-warning" : "nav-link"
            }
          >
            名称
            {currentSelect === "name" &&
              (currentSelect === "name" && sort ? (
                <i className="fa fa-arrow-up text-danger" />
              ) : (
                <i className="fa fa-arrow-down" />
              ))}
          </p>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            onSelect("sales");
            onSort(!sort);
          }}
        >
          <p
            className={
              currentSelect === "sales" ? "nav-link text-warning" : "nav-link"
            }
          >
            销量
            {currentSelect === "sales" &&
              (currentSelect === "sales" && sort ? (
                <i className="fa fa-arrow-up text-danger" />
              ) : (
                <i className="fa fa-arrow-down" />
              ))}
          </p>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            onSelect("price");
            onSort(!sort);
          }}
        >
          <p
            className={
              currentSelect === "price" ? "nav-link text-warning" : "nav-link"
            }
          >
            价格
            {currentSelect === "price" &&
              (currentSelect === "price" && sort ? (
                <i className="fa fa-arrow-up text-danger" />
              ) : (
                <i className="fa fa-arrow-down" />
              ))}
          </p>
        </li>
        <li className="nav-link dropdown">
          <a
            className="nav-link nav-item dropdown-toggle p-0"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            类型
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <p className="dropdown-item" onClick={() => onTypeChange("hat")}>
              帽子
            </p>
            <p className="dropdown-item" onClick={() => onTypeChange("clothe")}>
              上衣
            </p>
            <p className="dropdown-item" onClick={() => onTypeChange("pants")}>
              裤子
            </p>
            <p className="dropdown-item" onClick={() => onTypeChange("shoe")}>
              鞋
            </p>
            <p className="dropdown-item" onClick={() => onTypeChange("tool")}>
              工具
            </p>
            <div className="dropdown-divider"></div>
            <p className="dropdown-item" onClick={() => onTypeChange("all")}>
              全部
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ItemNav;
