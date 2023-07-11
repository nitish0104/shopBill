import React from 'react';

const PDFSender = () => {
  const handleClick = () => {
    const pdfURL = 'https://www.africau.edu/images/default/sample.pdf';
    const phoneNumber = '+917972930804'; // Replace with the recipient's phone number

    const encodedMessage = encodeURIComponent(`Here is the PDF file: ${pdfURL}`);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL);
  };

  return (
    <button onClick={handleClick}>Send PDF via WhatsApp</button>
  );
};

export default PDFSender;
