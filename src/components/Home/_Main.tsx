import React, { useState } from "react";
import Rate from "./_Rate";
import Converter from "./_Converter";
import History from "./_History";
import { NAVBAR_LIST } from "../../configs/constants";

const Main = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dataList = [Rate, Converter, History];

  return (
    <div className="home-main">
      <div className="home-main-navbar">
        <nav>
          <ul>
            {NAVBAR_LIST.map((text: string, index: number) => (
              <li
                key={index}
                onClick={() => setActiveIndex(index)}
                className={activeIndex === index ? "navbar-active" : "navbar"}
              >
                {text}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="home-main-content">
        {dataList.map((Component, index) =>
          index === activeIndex ? <Component key={index} /> : null
        )}
      </div>
    </div>
  );
};

export default Main;
