import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Components/Pages/Home";
import SignUp from "./Components/Pages/SignUp";
import Booking from "./Components/Pages/Booking";
import AboutUs from "./Components/Pages/AboutUs";
import LogIn from "./Components/Pages/LogIn";
import Error from "./Components/Pages/Error";
import Treatment from "./Components/Pages/Treatment";
import Success from "./Components/Pages/Success";
import AccountDetail from "./AccountDetail";
function App() {
  const login = window.sessionStorage.getItem("cust_id");
  const appointmentSuccess = {
    title : "Appointment booked success",
    children : "A message will be send through whatsapp before appointment as a reminder"
  }

  return (
    <>
      <div className="App_container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/aboutus" index element={<AboutUs />} />
            <Route path="/treatment" element={<Treatment />} />
            {login ? (
              <>
                <Route path="/account" element={<AccountDetail />} />
                <Route path="/booking" element={<Booking />} />
              </>
            ) : (
              <>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
              </>
            )}
            <Route path="/success" element={<Success />} />
            <Route path="/success/appointment" element={<Success {...appointmentSuccess}/>} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
