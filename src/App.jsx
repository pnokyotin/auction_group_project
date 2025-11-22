import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import InsertProduct from "./pages/InsertProduct";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* หน้า Login */}
        <Route path="/login" element={<Login />} />

        {/* หน้า Register */}
        <Route path="/register" element={<Register />} />

        {/* หน้า Main ต้อง login ก่อน */}
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Navbar />
              <Main />
            </PrivateRoute>
          }
        />

        {/* หน้า InsertProduct ต้อง login ก่อน */}
        <Route
          path="/insert-product"
          element={
            <PrivateRoute>
              <Navbar />
              <InsertProduct />
            </PrivateRoute>
          }
        />

        {/* redirect / ไป /main */}
        <Route path="/" element={<Navigate to="/main" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
