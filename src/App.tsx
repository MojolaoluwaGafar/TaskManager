
import './App.css'
// import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router";
// import Home from "./Pages/Home";
// import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";
// import EditTask from "./Pages/Edit";
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
// import TaskDetails from "./Pages/TaskDetails"

function App() {

  return (
   <> 
   {/* <Navbar /> */}

      <div className="px-6 py-8">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/" element={<Tasks />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/task/:id" element={<TaskDetails />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
      
   </>
  )
}

export default App
