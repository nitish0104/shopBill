import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
// import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import MobileNumberForm from './components/VerifyOTP/MobileNumber';
import VerifyOtpPage from './components/VerifyOTP/VerifyOtpPage';
import OTPVerification from './components/VerifyOTP/VerifyOtp';
import { Context } from './context/Context';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <Router>
        <Context>

        <Routes>
          {/* <Route path="/" element={<InitialPage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/mobileVerify" element={<MobileNumberForm />} />
          <Route path="/verify/mobileVerify" element={<MobileNumberForm />} />
          <Route path="/verify" element={<VerifyOtpPage />} />
          <Route path="/demoVerify" element={<OTPVerification />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        </Context>
      </Router>
    </>
  );
}

export default App;
