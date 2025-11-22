import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <div>
      {/* Temporary basic navbar */}
      <Navbar />

      {/* App routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/checkout/:id" element={<Checkout />}/>
      </Routes>
    </div>
  );
}
