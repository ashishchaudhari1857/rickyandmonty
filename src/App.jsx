import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Profile from "./Components/profile/Profile";
import NavEpisode from "./Components/NavEpisode/NavEpisode";
import Navbar from "./Components/Navigation/Navbar";
import NavLocation from "./Components/NavLocatioin/NavLocation";
import "./App.css";

function App() {
  return (
    <div className="app_container">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/characters" element={<Home />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="episode/:id" element={<NavEpisode />} />
        <Route path="/locations" element={<NavLocation />} /> 
      </Routes>
    </div>
  );
}

export default App;
