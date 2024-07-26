// // fire base storage
// // service firebase.storage {
// //   match /b/{bucket}/o {
// //     match /{allPaths=**} {
// //       allow read;
// //       allow write: if
// //       request.resource.size<2*1024*1024 &&
// //       request.resource.contentType.matches('image/.*')
// //     }
// //   }
// // }



import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null); // Initialize with null
  const [filePerc, setFilePerc] = useState(0); // Percentage of upload progress
  const [fileUploadError, setFileUploadError] = useState(false); // Error state
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file); // Pass file as argument
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name; // Create unique file name
    const storageRef = ref(storage, fileName); // Reference for the file in storage
    const uploadTask = uploadBytesResumable(storageRef, file); // Use file directly

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calculate progress
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error("Upload failed:", error); // Log upload error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL); // Log the download URL
            setFormData((prevFormData) => ({
              ...prevFormData,
              avatar: downloadURL,
            }));
          })
          .catch((error) => {
            console.error("Error getting download URL:", error); // Log errors in URL retrieval
          });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar } // Fallback to default avatar
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
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
