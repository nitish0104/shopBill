import React from "react";
import LayoutManin from "../components/layout/LayoutManin";
import MobileNumberForm from "../components/VerifyOTP/MobileNumber";

const OtpVerification = () => {
  return (
    <div>
      <LayoutManin>
        <MobileNumberForm></MobileNumberForm>
      </LayoutManin>
    </div>
  );
};

export default OtpVerification;
