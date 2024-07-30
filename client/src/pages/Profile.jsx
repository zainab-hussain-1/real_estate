// fire base storage
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size<2*1024*1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError,setshowListingsError]=useState(false); 
  const [userListings,setUserListings]=useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              avatar: downloadURL,
            }));
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    setUpdateSuccess(false); // Reset success state

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage = data.message || "Something went wrong.";
        dispatch(updateUserFailure(errorMessage));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      const errorMessage = error.message || "Unknown error occurred.";
      dispatch(updateUserFailure(errorMessage));
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        const errorMessage = data.message || "Failed to delete user.";
        dispatch(deleteUserFailure(errorMessage));
        console.error("Delete failed:", errorMessage);
        return;
      }

      dispatch(deleteUserSuccess(data));
      window.location.href = "/sign-up"; 
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.error("Delete failed:", error.message);
    }
  };


const handleSignOutUser = async () => {
    dispatch(signOutUserStart());
    try {
      const res = await fetch("/api/auth/signout", {
        method: 'GET', // Ensure this matches the server route method
      });
  
      if (res.ok) {
        // Successfully signed out
        dispatch(signOutUserSuccess());
        window.location.href = "/sign-in"; // Redirect after successful sign out
      } else {
        // Handle the response from the server if it's not ok
        const data = await res.json();
        const errorMessage = data.message || 'Sign out failed.';
        dispatch(signOutUserFailure(errorMessage));
        console.error("Sign out failed:", errorMessage);
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      console.error("Sign out failed:", error.message);
    }
  };
  
const handleShowListings=async()=>{
  try{
    setshowListingsError(false);
const res = await fetch(`/api/user/listings/${currentUser._id}`);
const data=await res.json();
if(data.success===false){
  setshowListingsError(true);
  return;
}
setUserListings(data);
  }catch(error){
setshowListingsError(true);
  }
}
  
  const handleListingDelete=async (listingId)=>{
    try{
const res = await fetch(`/api/listing/delete/${listingId}`,{
  method:'DELETE',
});
const data=await res.json();
if(data.success === false){
  console.log(data.message);
  return;
}
setUserListings((prev)=>
  prev.filter((listing)=>listing._id !== listingId));

    }catch(error){

    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : filePerc > 0 ? (
            <span className="text-teal-700">Uploading: {filePerc}%</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacaity-95"
        to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOutUser} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      {/* Display the error if it exists */}
      {error && <p className="text-rose-700">{error}</p>}
      {/* Display the success message if updateSuccess is true */}
      {updateSuccess && (
        <p className="text-green-700 mt-5">User updated successfully!</p>
      )}
      <button  onClick={handleShowListings}
      className="text-green-700 w-full">Show listings</button>
      <p className="text-red-700 mt-5">{showListingsError ? 'Error showing listing' : ''}</p>
      
      
      {userListings && 
      userListings.length > 0 && 
      <div className="flex flex-col gap-4">
        <h1 className="text-center my-7 text-2xl font-semibold">Your Listings</h1>
      {userListings.map((listing)=>  <div key={listing._id}
      className=" border rounded-lg p-3  flex justify-between
      items-center gap-4"
        >
          <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing 
          cover"  className="h-16 w-16 object-contain "/>
          </Link>
          <Link  className=" text-slate-700   font-semibold  hover:underline truncate flex-1"
           to={`/listing/${listing._id}`}>
          <p > {listing.name}</p>
          </Link>
          <div className=" flex flex-col items-center">
<button onClick={()=>handleListingDelete(listing._id)}
className="text-red-700 uppercase">Delete</button>
<button className="text-green-700 uppercase">Edit</button>
          </div>
        </div>
      )}  
      </div>}
      
    </div>

  );
}

export default Profile;




