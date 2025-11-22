import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import InsertProduct from "./components/InsertProduct_botton";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/insert-product" element={<InsertProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
