import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-gray-200 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
          />
          <input
            type="passcode"
            placeholder="Passcode"
            className="border p-3 rounded-lg"
            id="passcode"
          />
         <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95
//     disabled:opacity-80">Sign Up</button>
        </form>

        <div className="flex justify-center mt-5">
          <p className="mr-2">Have an account?</p>
          <Link to={"/sign-in"} className="text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
