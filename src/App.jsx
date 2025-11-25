// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/User_login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import InsertProduct from "./pages/InsertProduct";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManageRoom from "./pages/ManageRoom"; // ← import หน้า ManageRoom
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteEmployee from "./components/PrivateRouteEmployee";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้า Login Customer */}
        <Route path="/login" element={<Login />} />


        {/* หน้า Register */}
        <Route path="/register" element={<Register />} />

        {/* หน้า Main ของ customer ต้อง login ก่อน */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Navbar />
              <Main />
            </PrivateRoute>
          }
        />

        {/* หน้า InsertProduct ของ customer ต้อง login ก่อน */}
        <Route
          path="/insert-product"
          element={
            <PrivateRoute>
              <Navbar />
              <InsertProduct />
            </PrivateRoute>
          }
        />

        {/* หน้า Employee Dashboard ต้อง login ก่อน */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRouteEmployee>
              <EmployeeDashboard />
            </PrivateRouteEmployee>
          }
        />

        {/* หน้า Manage Room ของ Employee ต้อง login ก่อน */}
        <Route
          path="/manage-room"
          element={
            <PrivateRouteEmployee>
              <ManageRoom />
            </PrivateRouteEmployee>
          }
        />

        {/* redirect / ไป /main */}
        <Route path="/" element={<Navigate to="/main" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
