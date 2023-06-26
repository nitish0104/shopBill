import React from "react";
import WhatsAppButton from "react-whatsapp-button";

const WhatsAppMessageButton = () => {
  const phoneNumber = "9819094281"; // Replace with your phone number
  const message = "Hello, how can I help you?"; // Replace with your desired message

  const handleButtonClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center">
      <WhatsAppButton
        phoneNumber={phoneNumber}
        message={message}
        onClick={handleButtonClick}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Send Message on WhatsApp
      </WhatsAppButton>
    </div>
  );
};

export default WhatsAppMessageButton;
