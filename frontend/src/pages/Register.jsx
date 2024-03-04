import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/thunkFunctions";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  return (
    <section className="flex flex-col justify-center mt-20 max-w-md m-auto">
      <div className="p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-8 py-2 mt-2 bg-white rounded-md border-b-2 border-gray-300"
              {...register("username", userName)}
            />

            {errors?.username && (
              <div>
                <span className="text-gray-400">{errors.username.message}</span>
              </div>
            )}
          </div>

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

          <div className="mt-6 flex justify-center">
            <button className="w-2/3 bg-yellow text-gray-800 font-semibold px-4 py-3 rounded-md hover:bg-pointOrange">
              Sign Up
            </button>
          </div>
          <p className="mt-8 text-sm text-center text-gray-700">
            Have an account?{" "}
            <Link to="/login">
              <span className="font-medium hover:underline hover:text-pointOrange">
                Log-In
              </span>
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
