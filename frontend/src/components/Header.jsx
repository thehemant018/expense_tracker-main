import React, { useState } from "react";
import Chart from "./Chart";

export default function Header({ filters, filter, onFilterChange }) {
  const [showChart, setShowChart] = useState(false);
  const handleChart = () => {
    setShowChart((prev) => !prev);
  };
  return (
    <div className="">
      <ul className="flex gap-5 mt-6">
        {filters.map((value) => (
          <li key={value} className="ml-3">
            <button
              className={filter === value ? "font-semibold" : "font-light"}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
        <button
          className="ml-24 font-light hover:text-pointOrange"
          onClick={handleChart}
        >
          chart
        </button>
      </ul>

      <div className="w-[90%] my-[1%] border-[1px] border-lightGray/30 ml-3"></div>
      {showChart && <Chart />}
    </div>
  );
}
