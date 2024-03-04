<p align="center">
  <img width="300" alt="tracker_main" src="https://github.com/inayoon/christmas_card_app/assets/100747899/9f252893-e5db-4bbd-abf4-975843529b98"><img width="300" alt="tracker_main2" src="https://github.com/inayoon/christmas_card_app/assets/100747899/65a8e16f-2eed-4746-aa4b-49da185a81db">
</p>


# Expense Tracker
> I've created an expense tracker application where users can input their income and expenses by choosing the date on the calendar. This application provides spending history for the past month with a chart.

<br/>

## Total Development Period
> 2024.01.12 ~ 2024.01.25
<br/>

## Project Goals
> - Develop asynchronous communication using Redux Thunk functions.
> - Manage user and expense state globally using Redux Toolkit.
> - Explore react-calendar and react-chart libraries.
<br/>

## Tech Stack
### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">  <img src="https://img.shields.io/badge/Redux toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Redux thunk-764ABC?style=for-the-badge&logo=Redux&logoColor=white">  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">

### Backend
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
### Database 
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> 

<br/>

## 💰 Main Screens and Features
|                                                             1.  Home                                                               |                                                         **2. Add History**                                                             |                                                         **3. Add History with Calendar**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  <img width="420" alt="tracker_home" src="https://github.com/inayoon/christmas_card_app/assets/100747899/60d5e460-cc2b-4d00-a3bf-8ccc74f93932">  |  <img width="420" alt="tracker_add" src="https://github.com/inayoon/christmas_card_app/assets/100747899/6e8c8677-d4d6-4e11-b751-06ad04377d99">  |  <img width="420" alt="tracker_add w cal" src="https://github.com/inayoon/christmas_card_app/assets/100747899/88723e37-7a17-4902-a013-a6aaef1e605b">  |

|                                                             **4.  Filter with Income**                                                                |                                                         **5. Filter with Expense**                                                             |                                                         **6. Display with a Chart**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  <img width="420" alt="tracker_filter" src="https://github.com/inayoon/christmas_card_app/assets/100747899/e2205b7a-5ef1-4b5e-9872-994ad7e7453c">  |  <img width="420" alt="tracker_filter2" src="https://github.com/inayoon/christmas_card_app/assets/100747899/78499b88-5037-4c4c-9c1b-4894537d0039">  |  <img width="420" alt="tracker_chart" src="https://github.com/inayoon/christmas_card_app/assets/100747899/04f28b6c-ce4a-45e1-8cc0-5872f55bcacb">  |
  
<br/>

---

> ### 1. Fetching Data from API endpoint with axios call using redux-thunk 

![thunk](https://github.com/inayoon/expense_tracker/assets/100747899/e39e71fa-3297-4275-b133-6be4be487ce3)
<details>
<summary><h3>Applying redux-thunk for asynchronous operation </h3></summary>
<br/>

- Utilized a thunk function to communicate asynchronously with the MongoDB database and update the slice accordingly. <br/>
- Configured reducer logic for asynchronous actions within the extraReducers of the slice.<br/>

```Javascript
/** thunkFunctions.js */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";


export const addHistory = createAsyncThunk(
  "transaction/addHistory",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/transactions/add", body);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const deleteHistory = createAsyncThunk(
  "transaction/deleteHistory",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/transactions/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

```

```Javascript
/** expenseSlice.js */
import { createSlice } from "@reduxjs/toolkit";
import { addHistory, deleteHistory } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  expenses: [],
  isLoading: false,
  error: "",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        const { _id, date, category, amount, description } = action.payload;
        const newExpense = {
          _id,
          date,
          category,
          amount,
          description,
        };

        state.expenses = [...state.expenses, newExpense];
        state.isLoading = false;
      })

      .addCase(addHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        const { deletedId } = action.payload;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== deletedId
        );
        state.isLoading = false;
        toast.success("Transaction deleted successfully.");
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        toast.error(`Error deleting transaction: ${action.error.message}`);
      });
  },
});

export default expenseSlice.reducer;

```
</details>

---

<br/>

> ### 2. Sign-Up & Sign-In (With react-hook-form)
|                                                             **Sign-Up**                                                                |                                                         **Sign-In**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  <img width="400" hight="300" alt="tracker_signup" src="https://github.com/inayoon/christmas_card_app/assets/100747899/a40e3d86-3d23-4dce-ba63-694400365ef2">  |  <img width="400" hight="300"  alt="tracker_signin" src="https://github.com/inayoon/christmas_card_app/assets/100747899/5051d493-c4fa-4d02-ad12-bf32ff3da51f">  |

<details>
<summary><h3>Registration Form using react-hook-form </h3></summary>
<br/>

Implemented signup & signin function with react-hook-form.<br/>

```Javascript
import { useForm } from "react-hook-form";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "Onchange" });

  const onSubmit = ({ email, password, username }) => {
    const body = {
      email,
      password,
      username,
    };
    dispatch(registerUser(body)).then(() => {
      navigate("/login");
    });
    reset();
  };
    /**  for validation */
  const userEmail = {
    required: "Email must be provided",
  };

  const userName = {
    required: "Name must be provided",
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Username must only contain letters",
    },
  };
  const userPassword = {
    required: "Password must be provided",
    minLength: {
      value: 6,
      message: "Min length must be 6",
    },
};
return(
    ...
    <div className="mb-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-8 py-2 mt-2 bg-white rounded-md border-b-2 border-gray-300"
                  {...register("email", userEmail)}
                />
                {errors?.email && (
                  <div>
                    <span className="text-gray-400">{errors.email.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-8 py-2 mt-2 bg-white rounded-md border-b-2 border-gray-300"
                  {...register("password", userPassword)}
                />
                {errors?.password && (
                  <div>
                    <span className="text-gray-400">{errors.password.message}</span>
                  </div>
                )}
              </div>
      ....
      )
    }


```
</details>

---

<br/>

> ### 3. Selecting a date with react-calendar 

![cal](https://github.com/inayoon/expense_tracker/assets/100747899/efd1dcfb-caae-4f03-82cf-1ad0952fe4ec)
<details>
<summary><h3>Applying react-calendar library </h3></summary>
<br/>

- Used a calendar icon as a toggle button to display the calendar.<br/>
- Utilized moment.js to format the date in a specific format.<br/>
- When a date is selected, it changes the point color to indicate the selection.<br/>

```Javascript
import moment from "moment";
import { IoCalendarNumber } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AddTransaction({ onModalChange }) {
  const [showCal, setShowCal] = useState(false);

  const handleCal = () => {
    setShowCal(!showCal);
  };

  const handleDateChange = (date) => {
    onChange(date);
    const formattedDate = moment(date).format("YYYY-MMM-DD");
    setHistory((prev) => ({
      ...prev,
      date: formattedDate,
    }));
    setShowCal(false);
  };

  return (
    <section>
      <div className="mt-6 ml-3">
        New Transaction
        <div className="w-[90%] my-[1%] border-[1px] border-lightGray/30"></div>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="font-semibold mt-2 ml-3 ">Date</label>
        <div className="flex items-center">
          <input
            className="bg-slate-100 w-[85%] h-10 shadow-md rounded-md my-3 ml-3 px-3"
            placeholder="Click the calendar"
            value={history.date || ""}
          />
          <div
            className="relative right-8 text-xl font-bold cursor-pointer"
            onClick={handleCal}
          >
            <IoCalendarNumber />
          </div>
        </div>
        <div className="w-[90%] ml-3">
          {showCal && (
            <Calendar
              onChange={handleDateChange}
              value={value}
              locale="en-US"
              tileClassName="custom-calendar-tile"
            />
          )}
        </div>
       ...
    </section>
  );
}

```
</details>

---

<br/>

> ### 4. Displaying monthly expenses with recharts.js 

![charts](https://github.com/inayoon/expense_tracker/assets/100747899/185826fb-d2bf-41ca-b9d5-65fcdb4b0f25)
<details>
<summary><h3>Applying rechart library </h3></summary>
<br/>

- To calculate the total monthly expenses, initially, the filter function is used to isolate Expense entries from both Income and Expense.<br/>
- For the monthly total, the date is parsed using the split function to extract relevant values.<br/>

```Javascript
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

```
</details>

---

<br/>

## Challenges Faced During the Project Development
 - Still struggling with breaking down components into smaller pieces to implement functionality, but putting effort into creating a visual draft and constructing components based on that.
 - Had doubts about the necessity of thunk functions while learning through YouTube, but applying them hands-on and **being able to dispatch functions clarified their purpose.**
<br/>

## Visual Draft Before Working on the Project
<img width="450" alt="tracker_draft" src="https://github.com/inayoon/expnese_tracker/assets/100747899/a3b06800-c64f-4079-a13e-808472951304">

---

<br/>

> ### Used Fonts
  - [Pretendard](https://github.com/orioncactus/pretendard)

<br/>

> ### Used Image
  - (https://www.freepik.com/icon/wallet_584026#fromView=keyword&term=Wallet&page=1&position=2&uuid=2bb1b8c6-dd7a-4392-b563-74600574f741)
