import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import AddTransaction from "../components/AddTransaction";
import { Link } from "react-router-dom";

export default function Home() {
  const filters = ["all", "Income", "Expense"];
  const [filter, setFilter] = useState(filters[0]);
  const [showForm, setShowForm] = useState(false);
  const name = useSelector((state) => state.user?.userData.username);
  const history = useSelector((state) => state.expenses?.expenses);
  const handleModal = () => {
    setShowForm(!showForm);
  };
  const getTotalIncome = () => {
    const total = history.reduce((sum, data) => {
      return data.category === "Income" ? sum + data.amount : sum - data.amount;
    }, 0);
    return total.toFixed(2);
  };
  const getTotal = (category) => {
    const categoryItems = history.filter((data) => data.category === category);
    const totalAmount = categoryItems.reduce(
      (sum, data) => sum + data.amount,
      0
    );

    return totalAmount.toFixed(2);
  };
  useEffect(() => {
    getTotalIncome();
  }, [history]);

  

  return (
    <section className="flex flex-col justify-center mt-6 max-w-md mx-auto">
      <div className="p-6 bg-white rounded-md shadow-lg">
        <div className="flex flex-col max-w-[160px] mx-auto">
          <img src="../../public/wallet.png" alt="wallet" />
        </div>

        <h2 className="mt-4 text-center text-gray-800 text-2xl">
          Hello <span className="bg-highlight font-semibold">{name}</span>!
        </h2>
        <p className="text-center text-gray-700">
          Review the spending history for the past month{" "}
        </p>
        <div className="text-4xl text-center mt-4 font-semibold text-gray-700">
          ${getTotalIncome()}
        </div>
        <div className="bg-slate-50 w-[85%] h-20 shadow-lg rounded-md my-3 mx-5 px-4 flex justify-evenly items-center border-[1px] border-lightGray/30">
          <div className="flex flex-col items-center mt-1">
            Income
            <div className="text-emerald-600 font-semibold hover:scale-110">
              +{getTotal("Income")}
            </div>
          </div>
          <div className="w-[1px] h-[80%] mx-[1%] border-[1px] border-lightGray/30 mt-2" />

          <div className="flex flex-col items-center mt-1">
            Expenses
            <div className="text-red-600 font-semibold hover:scale-110">
              -{getTotal("Expense")}
            </div>
          </div>
        </div>


        <Header filters={filters} filter={filter} onFilterChange={setFilter} />
        <Transaction filter={filter} onModalChange={handleModal} />
        {showForm && <AddTransaction onModalChange={handleModal} />}
      </div>
      <Link to='/trans'>click</Link>
    </section>
  );
}
