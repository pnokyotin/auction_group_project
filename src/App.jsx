import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import InsertProduct from "./pages/InsertProduct";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen w-full animated-gradient">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/insert-product" element={<InsertProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
