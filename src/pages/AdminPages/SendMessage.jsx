import React, { useState } from "react";
import UseWhatsapp from "whatsapp-react-component";

const SendMessage = () => {
  // const handleSendMessage = () => {
  // 	const phoneNumber = '+9987274285';
  // 	const message = encodeURIComponent('Hello, how can I help you?');
  // 	const url = `https://wa.me/${phoneNumber}?text=${message}`;

  // 	window.location.href = url;
  //   };
  const [formData, setFormData] = useState({
    message: "",
    mobileNumber: "",
  });

  const { message, mobileNumber } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit function
  const onSubmit = () => {
    // Pass the values to the component
    UseWhatsapp(mobileNumber, message);
  };
  return (
    <>
      {/* 
      <div>
Your other component content 
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      */}
      <form onSubmit={onSubmit}>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobileNumber}
            onChange={onChange}
            name="mobileNumber"
          />
        </label>
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={onChange}
            name="message"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default SendMessage;
