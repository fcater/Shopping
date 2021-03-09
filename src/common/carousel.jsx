import React from "react";
import imgs from "../img/imgApi";

const Carousel = () => {
  const { post1, post2, post3 } = imgs.post;
  return (
    <React.Fragment>
      <div
        id="AdBored"
        className="carousel slide w-100"
        data-ride="carousel"
        data-bs-interval="10000"
      >
        {/* 图片展示 */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={post1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={post2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={post3} className="d-block w-100" alt="..." />
          </div>
        </div>
        {/* 滑动控制条 */}
        <a
          className="carousel-control-prev"
          href="#AdBored"
          role="button"
          data-slide="prev"
          style={{ width: "1em" }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#AdBored"
          role="button"
          data-slide="next"
          style={{ width: "2em" }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
