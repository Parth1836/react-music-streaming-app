import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import ContactUs from "./common-components/ContactUs";

function MainRoutes () {
    return (
            <BrowserRouter>
            <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
            </BrowserRouter>
    )
}

export default MainRoutes;