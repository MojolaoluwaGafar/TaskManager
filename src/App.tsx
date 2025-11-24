
import './App.css'
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";
import EditTask from "./Pages/Edit";

function App() {

  return (
   <> <Navbar />

      <div className="px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </div>
      
   </>
  )
}

export default App
