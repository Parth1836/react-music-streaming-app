import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import ContactUs from "./common-components/ContactUs";
import { useEffect } from "react";
import { ARTIST_LIST, USER_DETAILS } from "./mock-data/loginCredentials";

function MainRoutes() {
  useEffect(() => {
    const userCredentials = localStorage.getItem("userTable");
    if (!userCredentials) {
      localStorage.setItem("userTable", JSON.stringify(USER_DETAILS));
    }

    const artistList = localStorage.getItem("artistList");
    if (!artistList) {
      localStorage.setItem("artistList", JSON.stringify(ARTIST_LIST));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
