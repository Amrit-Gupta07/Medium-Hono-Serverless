import { SignupInput } from "@amrit07/medium-common";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../config.ts";
const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequest() {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
        console.log(response)
        const jwt = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
        
    } catch (error) {
        alert("Error while signing up");
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className="text-slate-500">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="text-slate-500 underline"
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Amrit Gupta"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Email"
              type="email"
              placeholder="amrit@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="*********"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />

            <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full bg-gray-800 text-white hover:bg-gray-900 rounded-lg focus:outline-none font-medium px-5 py-2.5 mb-2 me-2 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className=""> {label}</label>
      <input
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        type={type || "text"}
      />
    </div>
  );
}

export default Auth;
