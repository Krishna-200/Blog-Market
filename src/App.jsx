import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/userContext";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/allposts" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
      {/* <Footer /> */}
    </UserContextProvider>
  );
};

export default App;
