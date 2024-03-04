import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function LandingPage() {
  const isAuth = useSelector((state) => state.user?.isAuth);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" max-w-3xl relative">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-employee-savings-plan-illustration_23-2150961549.jpg?w=826&t=st=1705052809~exp=1705053409~hmac=a8b218d3419ef8207b727fe329d3709aa80db14b60dcc73fef2ce2b4f6bfebe3"
          alt="main_pic"
          className="mx-auto"
        />
        <Link to={isAuth ? "/home" : "/login"}>
          <button className="bg-blue text-white font-semibold  px-6 py-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md hover:scale-105">
            Start Tracking💰
          </button>
        </Link>
      </div>
    </div>
  );
}
