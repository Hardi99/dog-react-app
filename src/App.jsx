import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import DogSearch from "./pages/DogSearch";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/search" element={<DogSearch />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
