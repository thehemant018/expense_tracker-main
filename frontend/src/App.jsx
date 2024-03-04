import { useState, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotAuthRoutes from "./components/NotAuthRoutes";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import { authUser } from "./store/thunkFunctions";
import TransactionsList from "./pages/TransactionsList";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation;
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <div>
      {/* ToastContainer */}
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
        <Route exact path="/trans" element={<TransactionsList />} /> 
        </Route>
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        
        </Route>
        {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/trans" element={<TransactionsList />} /> */}
      </Routes>
    </div>
  );
}

export default App;
