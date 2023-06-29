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
import AddItems from './pages/AdminPages/AddItems';
import GeneratedBill from './pages/AdminPages/GeneratedBill';
import SendMessage from './pages/AdminPages/SendMessage';
import WhatsAppMessageButton from './raw/WhatsappTest';
import Date from './raw/DateTest';
import VerifyOTP from './pages/OtpVerification';
import ShowCustomerDetails from './pages/AdminPages/ShowCustomerDetails';


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
              <Route path="/verify" element={<VerifyOTP />} />
              <Route path="/demoVerify" element={<OTPVerification />} />
              <Route path="/profile" element={<ProfilePage1 />} />
              <Route path="/dashboard" element={<Main />} />
              <Route path="/add-customer" element={<AddCustomers />} />
              <Route path="/get-bill" element={<GetBills />} />
              <Route path="/darkmode" element={<Card />} />
              <Route path="/add-items" element={<AddItems />} />
              <Route path="/generated-bill" element={<GeneratedBill />} />
              <Route path="/send-message" element={<SendMessage />} />
              <Route path="/sendWhatsAppmessage" element={<WhatsAppMessageButton />} />
              <Route path="/datetest" element={<Date />} />
              <Route path="/customer-details" element={<ShowCustomerDetails />} />
            </Routes>
          </ThemeProvider>
        </Context>
      </Router>
    </>
  );
}

export default App;
