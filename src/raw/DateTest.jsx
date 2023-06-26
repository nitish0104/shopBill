import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleSelectDate = () => {
    setModalIsOpen(true);
  };

  const handleDateSubmit = () => {
    console.log(selectedDate);
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSelectDate}
      >
        Select Date
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
        <h2>Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          dateFormat="yyyy-MM-dd"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          onClick={handleDateSubmit}
        >
          Submit
        </button>
      </Modal>
    </div>
  );
};

export default Date;
