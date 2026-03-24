import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Profile from "./component/profile";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";


function App() {
  return (
    <>
    

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Routes>
      
      
    </>
  );
}

export default App;
