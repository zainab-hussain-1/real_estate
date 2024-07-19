import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { signInFailure,signInSuccess,signInStart } from "../redux/user/userSlice";


function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Signin successful:", data);
        setFormData({
          email: "",
          password: "",
        });
        setError(null);
        navigate("/");
      } else {
        throw new Error(data.message || "Signin failed.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message || "Error signing in. Please try again.");
    } finally {
      setLoading(false);
      dispatch(signInFailure(data.message))
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-gray-200 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="flex justify-center mt-5">
          <p className="mr-2">Don't have an account?</p>
          <Link to={"/sign-up"} className="text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
