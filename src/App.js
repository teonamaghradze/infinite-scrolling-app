import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails/UserDetails";
import Users from "./components/Users/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/user/:userId" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
