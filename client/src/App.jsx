import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Update from "./pages/Update";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
       
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path='/search' element={<Search/>}/>
        <Route path="/listing/:listingId" element={<Listing />}></Route>
       
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:listingId" element={<Update/>}/>
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


