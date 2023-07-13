import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import MobileNumberForm from './components/VerifyOTP/MobileNumber';
import VerifyOtpPage from './components/VerifyOTP/VerifyOtpPage';
import OTPVerification from './components/VerifyOTP/VerifyOtp';
import { Context } from './context/Context';
import Main from './pages/AdminPages/Main';
import AddCustomers from './pages/AdminPages/AddCustomers';
import GetBills from './pages/AdminPages/GetBills';
import Card from '../src/theme/DarkMode';
import { ThemeProvider } from './context/ThemeContext';
import AddItems from './pages/AdminPages/AddItems';

import VerifyOTP from './pages/OtpVerification';
import ShowCustomerDetails from './pages/AdminPages/ShowCustomerDetails';

import ShowSingleBill from './pages/AdminPages/ShowSingleBill';
import PDFSender from './Raw/WhatsappSendPdfTest';
import Mydate from './Raw/DateTest';
import DateTest from './Raw/DateTest';

function App() {
  return (
    <>
      <Router>
        <Context>
          <ThemeProvider>


            <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<VerifyOTP />} />
              <Route path="/dashboard" element={<Main />} />
              <Route path="/add-customer" element={<AddCustomers />} />
              <Route path="/get-bill" element={<GetBills />} />
              <Route path="/darkmode" element={<Card />} />
              <Route path="/add-items" element={<AddItems />} />
              <Route path="/invoice/:id" element={<ShowSingleBill />} />
              <Route path="/customer-details/:id" element={<ShowCustomerDetails />} />
              <Route path='/sendbill' element={<PDFSender />} />
              <Route path='/date' element={<Mydate />} />
              <Route path='/date-test' element={<DateTest />} />
            </Routes>
          </ThemeProvider>
        </Context>
      </Router>
    </>
  );
}

export default App;
