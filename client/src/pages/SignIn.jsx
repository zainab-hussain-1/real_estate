// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signInFailure, signInSuccess, signInStart } from "../redux/user/userSlice";
//  import OAuth from "../components/OAuth.jsx";

// function SignIn() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(signInStart());

//     try {
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         dispatch(signInSuccess(data));
//         navigate('/');
//       } else {
//         dispatch(signInFailure(data.message));
//       }
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="p-4 bg-gray-200 rounded-lg shadow-lg w-96">
//         <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-3 rounded-lg"
//             id="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-3 rounded-lg"
//             id="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//           >
//             {loading ? "Loading..." : "Sign In"}
//           </button>
//           <OAuth/>
//           {error && <p className="text-red-500 mt-2">{error}</p>}
        
//         </form>

//         <div className="flex justify-center mt-5">
//           <p className="mr-2">Don't have an account?</p>
//           <Link to="/sign-up" className="text-blue-700">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInSuccess, signInStart } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

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
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure("An unexpected error occurred."));
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
          <OAuth />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="flex justify-center mt-5">
          <p className="mr-2">Don't have an account?</p>
          <Link to="/sign-up" className="text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
