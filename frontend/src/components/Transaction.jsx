import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusCircleDotted } from "react-icons/bs";
import moment from "moment";
import { deleteHistory } from "../store/thunkFunctions";
//import { deleteExpense } from "./yourReduxActions"; 

export default function Transaction({ filter, onModalChange }) {
  const [hoverStates, setHoverStates] = useState({});
  const [deleteTextVisible, setDeleteTextVisible] = useState(null);
  const expenseData = useSelector((state) => state.expenses?.expenses);
  const dispatch = useDispatch();

  const handleAmount = (price, category) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const formattedAmount =
      category === "Income" ? `+$${formattedPrice}` : `-$${formattedPrice}`;
    return formattedAmount;
  };

  const handleDelete = (id) => {
    dispatch(deleteHistory(id));
  };

  const filtered = getfilteredItems(filter);
  function getfilteredItems(filter) {
    if (filter === "all") return expenseData;
    else if (filter === "Income") {
      return expenseData.filter((data) => data.category === "Income");
    } else if (filter === "Expense") {
      return expenseData.filter((data) => data.category === "Expense");
    }
  }

  const handleHistoryMouse = (id, isHovered) => {
    setHoverStates((prev) => ({ ...prev, [id]: isHovered }));
    setDeleteTextVisible(isHovered ? id : null);
  };

  return (
    <div>
      <div className="flex flex-col">
        <ul className="">
          {filtered.map((data) => (
            <div className="flex relative" key={data._id}>
              <div
                className={`bg-slate-50 w-[85%] h-14 shadow-md rounded-md mt-3 ml-5 mr-0 px-4 transition ease-in-out ${
                  hoverStates[data._id]
                    ? "hover:-translate-x-5 cursor-pointer"
                    : ""
                }`}
                key={data.date}
                onMouseEnter={() => handleHistoryMouse(data._id, true)}
                onMouseLeave={() => handleHistoryMouse(data._id, false)}
                onClick={() => handleDelete(data._id)}
              >
                <div className="text-sm text-gray-600 pt-1">
                  {moment(data.date).format("YYYY-MMM-DD")}
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="text-gray-800 text-md font-semibold">
                    {data.description}
                  </div>
                  <div
                    className={
                      data.category === "Income"
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {handleAmount(data.amount, data.category)}
                  </div>
                </div>
              </div>
              {hoverStates[data._id] && (
                <div className="absolute top-3 right-4 w-12 h-14 bg-red-500 flex items-center justify-center">
                  <div className="text-white text-sm cursor-pointer">
                    Delete
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div
        className="flex flex-col justify-center bg-slate-100 shadow-md rounded-md w-[85%] h-[90px] mt-4 mx-5 cursor-pointer"
        onClick={onModalChange}
      >
        <div className="self-center text-4xl">
          <BsPlusCircleDotted />
        </div>
        <div className="text-sm font-light text-center">
          Add your transaction
        </div>
      </div>
    </div>
  );
}
