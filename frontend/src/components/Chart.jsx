import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Chart() {
  const expenseData = useSelector((state) => state.expenses?.expenses);

  // 월별 지출 합계를 계산하는 함수
  const calculateMonthlyExpenses = () => {
    const monthlyExpenses = {};

    expenseData
      .filter((expense) => expense.category === "Expense")
      .forEach((expense) => {
        const month = expense.date.split("-")[1];
        if (monthlyExpenses[month]) {
          monthlyExpenses[month] += expense.amount;
        } else {
          monthlyExpenses[month] = expense.amount;
        }
      });

    return Object.entries(monthlyExpenses).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  const monthlyExpenses = calculateMonthlyExpenses();

  return (
    <div className=" bg-slate-50 w-[85%] h-52 shadow-md rounded-md mt-3 ml-5 mr-0">
      <div className="font-semibold text-gray-700 text-sm">
        Monthly Expense Chart
      </div>
      <ResponsiveContainer width="90%" height="90%">
        <BarChart data={monthlyExpenses}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#FFB703" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
