




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";

// function SignUp() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation logic
//     if (!formData.username || !formData.email || !formData.password) {
//       setError("All fields are required.");
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       // if (!res.ok) {
//       //   throw new Error(HTTP error! Status: ${res.status})
//       // }

//       const data = await res.json();
//       if (data.success === false) {
//         setError(data.message);
//       } else {
//         console.log("Signup successful:", data);
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//         });
//         setError(null);
//         navigate('/sign-in');
//       }
//     } catch (error) {
//       console.error("Error signing up:", error);
//       setError("Error signing up. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="p-4 bg-gray-200 rounded-lg shadow-lg w-96">
//         <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="border p-3 rounded-lg"
//             id="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
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
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//           <OAuth/>
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </form>

//         <div className="flex justify-center mt-5">
//           <p className="mr-2">Have an account?</p>
//           <Link to={"/sign-in"} className="text-blue-700">
//             Sign in
//           </Link>
//         </div>
        
//       </div>
//       {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
//     </div>
//   );
// }

// export default SignUp;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        console.log("Signup successful:", data);
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        setError(null);
        navigate('/sign-in');
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-gray-200 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="flex justify-center mt-5">
          <p className="mr-2">Have an account?</p>
          <Link to="/sign-in" className="text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
