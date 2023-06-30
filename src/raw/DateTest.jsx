// import React, { useState } from "react";
// import Modal from "react-modal";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Date = () => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleModalClose = () => {
//     setModalIsOpen(false);
//   };

//   const handleSelectDate = () => {
//     setModalIsOpen(true);
//   };

//   const handleDateSubmit = () => {
//     console.log(selectedDate);
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="container mx-auto">
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={handleSelectDate}
//       >
//         Select Date
//       </button>
//       <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
//         <h2>Select Date</h2>
//         <DatePicker
//           selected={selectedDate}
//           onChange={handleDateSelect}
//           dateFormat="yyyy-MM-dd"
//         />
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
//           onClick={handleDateSubmit}
//         >
//           Submit
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default Date;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CardComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const cards = [
    { id: 1, date: new Date(2023, 5, 15), title: "Card 1" },
    { id: 2, date: new Date(2023, 5, 18), title: "Card 2" },
    { id: 3, date: new Date(2023, 5, 20), title: "Card 3" },
    // Add more cards with different dates
  ];

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filteredCards = cards.filter((card) => {
    if (startDate && endDate) {
      const cardDate = card.date;
      return cardDate >= startDate && cardDate <= endDate;
    }
    return true;
  });

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          placeholderText="Select date range"
          className="p-2 rounded border-gray-300 border focus:outline-none"
        />
      </div>

      {filteredCards.map((card) => (
        <div key={card.id} className="bg-white rounded shadow p-4 mb-4">
          <p>{card.title}</p>
          <p>
            {card.date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
