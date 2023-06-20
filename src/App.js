import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import MobileNumberForm from './components/VerifyOTP/MobileNumber';
import VerifyOtpPage from './components/VerifyOTP/VerifyOtpPage';
import OTPVerification from './components/VerifyOTP/VerifyOtp';
import { Context } from './context/Context';
import ProfilePage1 from './pages/ProfilePage/ProfilePage1';
import Main from './pages/AdminPages/Main';
import AddCustomers from './pages/AdminPages/AddCustomers';
import GetBills from './pages/AdminPages/GetBills';
import Card from '../src/theme/DarkMode';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <>
      <Router>
        <Context>
          <ThemeProvider>


            <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mobileVerify" element={<MobileNumberForm />} />
              <Route path="/verify/mobileVerify" element={<MobileNumberForm />} />
              <Route path="/verify" element={<VerifyOtpPage />} />
              <Route path="/demoVerify" element={<OTPVerification />} />
              <Route path="/profile" element={<ProfilePage1 />} />
              <Route path="/dashboard" element={<Main />} />
              <Route path="/add-customer" element={<AddCustomers />} />
              <Route path="/get-bill" element={<GetBills />} />
              <Route path="/darkmode" element={<Card />} />
            </Routes>
          </ThemeProvider>
        </Context>
      </Router>
    </>
  );
}

export default App;
